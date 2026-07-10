<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\District;
use App\Models\MhpSite;
use App\Models\Views\MhpProgressLatest;
use App\Services\MhpReportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MhpDashboardController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', MhpSite::class);

        $district = $request->input('district');

        $sites = MhpSite::query()
            ->with(['cbo', 'adminApproval', 'completion', 'emeInfo', 'tAndDWorks'])
            ->forUser(Auth::user())
            ->when($district, fn ($q) => $q->whereHas('cbo', fn ($cq) => $cq->where('district', $district)))
            ->get();

        return Inertia::render('MHP/Dashboard', [
            'districts' => District::orderBy('name')->pluck('name'),
            'filters' => ['district' => $district],
            'stats' => [
                'pipeline' => $this->buildPipelineStats($sites),
                'beneficiaries' => $this->buildBeneficiaryStats($sites),
                'cbo' => $this->buildCboStats($sites),
            ],
            'chart_mobilization' => $this->buildMobilizationChart($sites),
            'chart_type_breakdown' => $this->buildTypeBreakdownChart($sites),
            'chart_progress' => $this->buildProgressChart($sites),
            'chart_beneficiaries' => $this->buildBeneficiaryChart($sites),
            'scheme_log' => $this->buildSchemeLog($sites),
            'cbo_log' => $this->buildCboLog($sites),
            'stalled' => $this->buildStalledList($sites),
        ]);
    }

    private function buildPipelineStats($sites): array
    {
        $prioritized = $sites;
        $designDone = $sites->filter(fn (MhpSite $s) => $s->layout_initiation_date !== null);
        $approved = $sites->filter(fn (MhpSite $s) => $s->adminApproval?->eu_approval_date !== null);
        $civilInitiated = $sites->filter(fn (MhpSite $s) => $s->civil_work_initiation_date !== null);
        $completed = $sites->filter(fn (MhpSite $s) => $s->completion?->handover_date !== null);

        return [
            ['label' => 'Prioritized', 'count' => $prioritized->count(), 'capacity_kw' => (float) $prioritized->sum('planned_capacity_kw')],
            ['label' => 'Detailed Design Done', 'count' => $designDone->count(), 'capacity_kw' => (float) $designDone->sum('planned_capacity_kw')],
            ['label' => 'Approved by EU/OPM', 'count' => $approved->count(), 'capacity_kw' => (float) $approved->sum('planned_capacity_kw')],
            ['label' => 'Civil Works Initiated', 'count' => $civilInitiated->count(), 'capacity_kw' => (float) $civilInitiated->sum('planned_capacity_kw')],
            ['label' => 'Completed', 'count' => $completed->count(), 'capacity_kw' => (float) $completed->sum('planned_capacity_kw')],
        ];
    }

    private function buildBeneficiaryStats($sites): array
    {
        $detailed = $sites->filter(fn (MhpSite $s) => $s->layout_initiation_date !== null);

        return [
            'total_hh_and_commercial' => (int) ($sites->sum('total_hh') + $sites->sum('commercial_units')),
            'avg_hh_per_hpp' => $sites->count() > 0 ? round($sites->avg('total_hh'), 2) : 0.0,
            'detailed_capacity_kw' => (float) $detailed->sum('planned_capacity_kw'),
            'detailed_total_hh' => (int) $detailed->sum('total_hh'),
        ];
    }

    private function buildCboStats($sites): array
    {
        $cboIds = $sites->pluck('cbo_id')->filter()->unique();
        $cbos = Cbo::query()->whereIn('id', $cboIds)->withCount(['trainings'])->get();

        $membersTrained = 0;
        foreach ($cbos as $cbo) {
            $membersTrained += $cbo->trainings->sum('total_participants');
        }

        return [
            'cbos_formed' => $cbos->count(),
            'districts_covered' => $cbos->pluck('district')->filter()->unique()->count(),
            'total_members' => (int) $cbos->sum('total_members'),
            'members_trained' => (int) $membersTrained,
        ];
    }

    private function buildMobilizationChart($sites): array
    {
        $grouped = $sites->groupBy(fn (MhpSite $s) => $s->cbo?->district ?? 'Unassigned');

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

    private function buildTypeBreakdownChart($sites): array
    {
        $detailed = $sites->filter(fn (MhpSite $s) => $s->layout_initiation_date !== null);
        $grouped = $detailed->groupBy('status')->sortKeys();

        $labels = $grouped->keys()->values()->all();
        $counts = $grouped->map->count()->values()->all();
        $table = $grouped->map(fn ($group, $type) => ['type' => $type, 'count' => $group->count()])->values()->all();

        return ['labels' => $labels, 'counts' => $counts, 'table' => $table];
    }

    private function buildProgressChart($sites): array
    {
        $financialBySite = MhpProgressLatest::query()
            ->whereIn('mhp_id', $sites->pluck('id'))
            ->pluck('fin_overall_latest_pct', 'mhp_id');

        $labels = [];
        $physical = [];
        $financial = [];
        $table = [];

        foreach ($sites->sortBy('id') as $site) {
            $name = $site->cbo?->cbo_name ?? "Scheme #{$site->id}";
            $physicalProgress = (new MhpReportService($site))->getCombinedCivilProgress();
            $financialProgress = (float) ($financialBySite[$site->id] ?? 0.0);

            $labels[] = $name;
            $physical[] = $physicalProgress;
            $financial[] = $financialProgress;
            $table[] = ['scheme' => $name, 'physical' => $physicalProgress, 'financial' => $financialProgress];
        }

        return ['labels' => $labels, 'physical' => $physical, 'financial' => $financial, 'table' => $table];
    }

    private function buildBeneficiaryChart($sites): array
    {
        $surveyed = $sites->filter(fn (MhpSite $s) => $s->adminApproval?->technical_survey_date !== null);
        $grouped = $surveyed->groupBy(fn (MhpSite $s) => $s->cbo?->district ?? 'Unassigned')->sortKeys();

        $labels = [];
        $totalHh = [];
        $commercialUnits = [];
        $table = [];

        foreach ($grouped as $district => $group) {
            $hh = (int) $group->sum('total_hh');
            $units = (int) $group->sum('commercial_units');
            $labels[] = $district;
            $totalHh[] = $hh;
            $commercialUnits[] = $units;
            $table[] = ['district' => $district, 'total_hh' => $hh, 'commercial_units' => $units];
        }

        return ['labels' => $labels, 'total_hh' => $totalHh, 'commercial_units' => $commercialUnits, 'table' => $table];
    }

    private function buildSchemeLog($sites): array
    {
        return $sites->sortBy('id')->map(function (MhpSite $site) {
            return [
                'id' => $site->id,
                'district' => $site->cbo?->district,
                'village' => $site->cbo?->village,
                'type' => $site->status,
                'capacity_kw' => (float) $site->planned_capacity_kw,
                'total_hh' => (int) $site->total_hh,
                'approved_eu' => optional($site->adminApproval?->eu_approval_date)->format('Y-m-d'),
                'initiated' => optional($site->civil_work_initiation_date)->format('Y-m-d'),
                'progress' => (new MhpReportService($site))->getCombinedCivilProgress(),
            ];
        })->values()->all();
    }

    private function buildCboLog($sites): array
    {
        $cboIds = $sites->pluck('cbo_id')->filter()->unique();

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
                    'dialogues' => $cbo->dialogues->count(),
                    'members_trained' => (int) $cbo->trainings->sum('total_participants'),
                ];
            })->values()->all();
    }

    private function buildStalledList($sites): array
    {
        $threshold = now()->subDays(90);

        return $sites
            ->filter(function (MhpSite $s) use ($threshold) {
                $approvedDate = $s->adminApproval?->eu_approval_date;
                return $approvedDate !== null
                    && $approvedDate->lt($threshold)
                    && $s->civil_work_initiation_date === null;
            })
            ->map(function (MhpSite $s) {
                $approvedDate = $s->adminApproval->eu_approval_date;
                return [
                    'id' => $s->id,
                    'district' => $s->cbo?->district,
                    'cbo_name' => $s->cbo?->cbo_name,
                    'stalled_since' => $approvedDate->format('Y-m-d'),
                    'days_stalled' => (int) $approvedDate->diffInDays(now()),
                ];
            })
            ->sortByDesc('days_stalled')
            ->values()
            ->all();
    }

    public function exportSchemes(Request $request)
    {
        $this->authorize('viewAny', MhpSite::class);

        $district = $request->input('district');
        $sites = MhpSite::query()
            ->with(['cbo', 'adminApproval', 'emeInfo', 'tAndDWorks'])
            ->forUser(Auth::user())
            ->when($district, fn ($q) => $q->whereHas('cbo', fn ($cq) => $cq->where('district', $district)))
            ->get();

        $rows = $this->buildSchemeLog($sites);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="mhp_scheme_log_' . now()->format('Ymd_His') . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = static function () use ($rows) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['#', 'District', 'Village', 'Type', 'Capacity (kW)', 'Total HH', 'Approved (EU)', 'Initiated', 'Progress']);
            foreach ($rows as $index => $row) {
                fputcsv($out, [
                    $index + 1,
                    $row['district'],
                    $row['village'],
                    $row['type'],
                    $row['capacity_kw'],
                    $row['total_hh'],
                    $row['approved_eu'],
                    $row['initiated'],
                    $row['progress'],
                ]);
            }
            fclose($out);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function exportCbos(Request $request)
    {
        $this->authorize('viewAny', MhpSite::class);

        $district = $request->input('district');
        $sites = MhpSite::query()
            ->forUser(Auth::user())
            ->when($district, fn ($q) => $q->whereHas('cbo', fn ($cq) => $cq->where('district', $district)))
            ->get();

        $rows = $this->buildCboLog($sites);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="mhp_cbo_log_' . now()->format('Ymd_His') . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = static function () use ($rows) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['#', 'District', 'Village', 'CBO Name', 'Formed', 'Members', 'Dialogues', 'Members Trained']);
            foreach ($rows as $index => $row) {
                fputcsv($out, [
                    $index + 1,
                    $row['district'],
                    $row['village'],
                    $row['cbo_name'],
                    $row['formed'],
                    $row['members'],
                    $row['dialogues'],
                    $row['members_trained'],
                ]);
            }
            fclose($out);
        };

        return response()->stream($callback, 200, $headers);
    }
}
