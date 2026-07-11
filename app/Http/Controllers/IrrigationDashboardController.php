<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\District;
use App\Models\IrrigationScheme;
use App\Models\Views\IrrigationProgressLatest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IrrigationDashboardController extends Controller
{
    private const CHANNEL_LENGTH_CAP_KM = 100.0;

    public function index(Request $request)
    {
        $this->authorize('viewAny', IrrigationScheme::class);

        $district = $request->input('district');
        $schemes = $this->loadSchemes($district);

        return Inertia::render('Irrigation/Dashboard', [
            'districts' => District::orderBy('name')->pluck('name'),
            'filters' => ['district' => $district],
            'stats' => [
                'infrastructure' => $this->buildInfrastructureStats($schemes),
                'cbo' => $this->buildCboStats($schemes),
            ],
            'chart_implementation_status' => $this->buildImplementationStatusChart($schemes),
            'chart_district_alignment' => $this->buildDistrictAlignmentChart($schemes),
            'chart_progress' => $this->buildProgressChart($schemes),
            'chart_direct_beneficiaries' => $this->buildBeneficiaryChart($schemes, 'direct_household_beneficiary'),
            'chart_indirect_beneficiaries' => $this->buildBeneficiaryChart($schemes, 'indirect_household_beneficiary'),
            'chart_cbo_formation' => $this->buildCboFormationChart($schemes),
            'chart_land_channel_coverage' => $this->buildLandChannelChart($schemes),
            'scheme_log' => $this->buildSchemeLog($schemes),
            'cbo_log' => $this->buildCboLog($schemes),
        ]);
    }

    private function loadSchemes(?string $district)
    {
        return IrrigationScheme::query()
            ->with(['cbo', 'profile'])
            ->forUser(Auth::user())
            ->when($district, fn ($q) => $q->whereHas('cbo', fn ($cq) => $cq->where('district', $district)))
            ->get();
    }

    private function deriveStatus(IrrigationScheme $scheme): string
    {
        $profile = $scheme->profile;

        if ($profile?->work_completed_date !== null) {
            return 'Completed';
        }
        if ($profile?->work_initiated_date !== null) {
            return 'Ongoing';
        }
        if ($profile?->ho_approval_date !== null) {
            return 'Approved';
        }

        return 'Not Yet Approved';
    }

    private function buildInfrastructureStats($schemes): array
    {
        $ongoing = $schemes->filter(fn (IrrigationScheme $s) => $this->deriveStatus($s) === 'Ongoing');
        $completed = $schemes->filter(fn (IrrigationScheme $s) => $this->deriveStatus($s) === 'Completed');

        $channelValues = $schemes->map(fn (IrrigationScheme $s) => (float) ($s->profile?->channel_length_km ?? 0));
        $validChannelSum = $channelValues->filter(fn ($km) => $km <= self::CHANNEL_LENGTH_CAP_KM)->sum();
        $excludedCount = $channelValues->filter(fn ($km) => $km > self::CHANNEL_LENGTH_CAP_KM)->count();

        $hectares = (float) $schemes->sum(fn (IrrigationScheme $s) => (float) ($s->profile?->land_area_hectares ?? 0));

        return [
            'total_schemes' => $schemes->count(),
            'schemes_ongoing' => $ongoing->count(),
            'schemes_completed' => $completed->count(),
            'beneficiary_households' => (int) $schemes->sum(fn (IrrigationScheme $s) => (int) ($s->profile?->beneficiary_hhs ?? 0)),
            'acres_irrigated' => round($hectares * 2.47105, 2),
            'km_of_channel' => round($validChannelSum, 2),
            'channel_excluded_count' => $excludedCount,
        ];
    }

    private function buildCboStats($schemes): array
    {
        $cboIds = $schemes->pluck('cbo_id')->filter()->unique();
        $cbos = Cbo::query()->whereIn('id', $cboIds)->with(['trainings'])->get();

        $membersTrained = 0;
        foreach ($cbos as $cbo) {
            $membersTrained += $cbo->trainings->sum('total_participants');
        }

        return [
            'cbos_formed' => $cbos->count(),
            'districts_covered' => $cbos->pluck('district')->filter()->unique()->count(),
            'total_members' => (int) $cbos->sum('total_members'),
            'members_trained' => (int) $membersTrained,
            'female_led_cbos' => $cbos->where('gender', 'Female')->count(),
        ];
    }

    private function buildImplementationStatusChart($schemes): array
    {
        $order = ['Not Yet Approved', 'Approved', 'Ongoing', 'Completed'];
        $grouped = $schemes->groupBy(fn (IrrigationScheme $s) => $this->deriveStatus($s));

        $labels = [];
        $counts = [];
        $table = [];

        foreach ($order as $status) {
            $count = $grouped->get($status, collect())->count();
            $labels[] = $status;
            $counts[] = $count;
            $table[] = ['status' => $status, 'count' => $count];
        }

        return ['labels' => $labels, 'counts' => $counts, 'table' => $table];
    }

    private function buildDistrictAlignmentChart($schemes): array
    {
        $grouped = $schemes->groupBy(fn (IrrigationScheme $s) => $s->cbo?->district ?? 'Unassigned');

        $labels = [];
        $schemeCounts = [];
        $cboCounts = [];
        $table = [];

        foreach ($grouped->sortKeys() as $district => $group) {
            $labels[] = $district;
            $schemeCounts[] = $group->count();
            $cboCount = $group->pluck('cbo_id')->filter()->unique()->count();
            $cboCounts[] = $cboCount;
            $table[] = ['district' => $district, 'schemes' => $group->count(), 'cbos' => $cboCount];
        }

        return [
            'labels' => $labels,
            'scheme_counts' => $schemeCounts,
            'cbo_counts' => $cboCounts,
            'table' => $table,
        ];
    }

    private function buildProgressChart($schemes): array
    {
        $progressBySite = IrrigationProgressLatest::query()
            ->whereIn('irrigation_id', $schemes->pluck('id'))
            ->get()
            ->keyBy('irrigation_id');

        $labels = [];
        $physical = [];
        $financial = [];
        $table = [];

        foreach ($schemes->sortBy('id') as $scheme) {
            $name = $scheme->cbo?->cbo_name ?? "Scheme #{$scheme->id}";
            $progress = $progressBySite->get($scheme->id);
            $physicalPct = (float) ($progress?->phys_overall_latest ?? 0.0);
            $financialPct = (float) ($progress?->fin_overall_latest_pct ?? 0.0);

            $labels[] = $name;
            $physical[] = $physicalPct;
            $financial[] = $financialPct;
            $table[] = ['scheme' => $name, 'physical' => $physicalPct, 'financial' => $financialPct];
        }

        return ['labels' => $labels, 'physical' => $physical, 'financial' => $financial, 'table' => $table];
    }

    private function buildBeneficiaryChart($schemes, string $field): array
    {
        $labels = [];
        $counts = [];
        $table = [];

        foreach ($schemes->sortBy('id') as $scheme) {
            $name = $scheme->cbo?->cbo_name ?? "Scheme #{$scheme->id}";
            $value = (int) ($scheme->{$field} ?? 0);

            $labels[] = $name;
            $counts[] = $value;
            $table[] = ['scheme' => $name, 'beneficiaries' => $value];
        }

        return ['labels' => $labels, 'counts' => $counts, 'table' => $table];
    }

    private function buildCboFormationChart($schemes): array
    {
        $cboIds = $schemes->pluck('cbo_id')->filter()->unique();
        $cbos = Cbo::query()
            ->whereIn('id', $cboIds)
            ->whereNotNull('date_of_formation')
            ->get(['id', 'district', 'date_of_formation']);

        $months = $cbos->map(fn (Cbo $c) => $c->date_of_formation->format('Y-m'))->unique()->sort()->values();
        $districts = $cbos->pluck('district')->filter()->unique()->sort()->values();

        $series = [];
        $table = [];

        foreach ($districts as $district) {
            $counts = [];
            foreach ($months as $month) {
                $count = $cbos->filter(fn (Cbo $c) => $c->district === $district && $c->date_of_formation->format('Y-m') === $month)->count();
                $counts[] = $count;
                if ($count > 0) {
                    $table[] = ['month' => $month, 'district' => $district, 'cbos_formed' => $count];
                }
            }
            $series[] = ['district' => $district, 'counts' => $counts];
        }

        return ['labels' => $months->all(), 'series' => $series, 'table' => $table];
    }

    private function buildLandChannelChart($schemes): array
    {
        $grouped = $schemes->groupBy(fn (IrrigationScheme $s) => $s->cbo?->district ?? 'Unassigned');

        $labels = [];
        $acres = [];
        $channelKm = [];
        $table = [];

        foreach ($grouped->sortKeys() as $district => $group) {
            $hectares = (float) $group->sum(fn (IrrigationScheme $s) => (float) ($s->profile?->land_area_hectares ?? 0));
            $acresValue = round($hectares * 2.47105, 2);

            $channelSum = (float) $group->sum(function (IrrigationScheme $s) {
                $km = (float) ($s->profile?->channel_length_km ?? 0);
                return $km <= self::CHANNEL_LENGTH_CAP_KM ? $km : 0;
            });

            $labels[] = $district;
            $acres[] = $acresValue;
            $channelKm[] = round($channelSum, 2);
            $table[] = ['district' => $district, 'acres' => $acresValue, 'channel_km' => round($channelSum, 2)];
        }

        return ['labels' => $labels, 'acres' => $acres, 'channel_km' => $channelKm, 'table' => $table];
    }

    private function buildSchemeLog($schemes): array
    {
        $progressBySite = IrrigationProgressLatest::query()
            ->whereIn('irrigation_id', $schemes->pluck('id'))
            ->get()
            ->keyBy('irrigation_id');

        return $schemes->sortBy('id')->map(function (IrrigationScheme $scheme) use ($progressBySite) {
            $hectares = (float) ($scheme->profile?->land_area_hectares ?? 0);

            return [
                'id' => $scheme->id,
                'district' => $scheme->cbo?->district,
                'village' => $scheme->cbo?->village,
                'type' => $scheme->status,
                'status' => $this->deriveStatus($scheme),
                'beneficiary_hh' => (int) ($scheme->profile?->beneficiary_hhs ?? 0),
                'acres' => round($hectares * 2.47105, 2),
                'channel_km' => (float) ($scheme->profile?->channel_length_km ?? 0),
                'progress' => (float) ($progressBySite->get($scheme->id)?->phys_overall_latest ?? 0.0),
            ];
        })->values()->all();
    }

    private function buildCboLog($schemes): array
    {
        $cboIds = $schemes->pluck('cbo_id')->filter()->unique();

        return Cbo::query()
            ->whereIn('id', $cboIds)
            ->with(['dialogues', 'trainings'])
            ->orderBy('district')
            ->get()
            ->map(function (Cbo $cbo) {
                return [
                    'id' => $cbo->id,
                    'district' => $cbo->district,
                    'village' => $cbo->village,
                    'cbo_name' => $cbo->cbo_name,
                    'formed' => optional($cbo->date_of_formation)->format('Y-m-d'),
                    'members' => (int) $cbo->total_members,
                    'gender' => $cbo->gender,
                    'dialogues' => $cbo->dialogues->count(),
                    'members_trained' => (int) $cbo->trainings->sum('total_participants'),
                ];
            })->values()->all();
    }

    public function exportSchemes(Request $request)
    {
        $this->authorize('viewAny', IrrigationScheme::class);

        $schemes = $this->loadSchemes($request->input('district'));
        $rows = $this->buildSchemeLog($schemes);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="irrigation_scheme_log_' . now()->format('Ymd_His') . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = static function () use ($rows) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['#', 'District', 'Village', 'Type', 'Status', 'Beneficiary HH', 'Acres', 'Channel (Km)', 'Progress']);
            foreach ($rows as $index => $row) {
                fputcsv($out, [
                    $index + 1,
                    $row['district'],
                    $row['village'],
                    $row['type'],
                    $row['status'],
                    $row['beneficiary_hh'],
                    $row['acres'],
                    $row['channel_km'],
                    $row['progress'],
                ]);
            }
            fclose($out);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function exportCbos(Request $request)
    {
        $this->authorize('viewAny', IrrigationScheme::class);

        $schemes = $this->loadSchemes($request->input('district'));
        $rows = $this->buildCboLog($schemes);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="irrigation_cbo_log_' . now()->format('Ymd_His') . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = static function () use ($rows) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['#', 'District', 'Village', 'CBO Name', 'Formed', 'Members', 'Gender', 'Dialogues', 'Members Trained']);
            foreach ($rows as $index => $row) {
                fputcsv($out, [
                    $index + 1,
                    $row['district'],
                    $row['village'],
                    $row['cbo_name'],
                    $row['formed'],
                    $row['members'],
                    $row['gender'],
                    $row['dialogues'],
                    $row['members_trained'],
                ]);
            }
            fclose($out);
        };

        return response()->stream($callback, 200, $headers);
    }
}
