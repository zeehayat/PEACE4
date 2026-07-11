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
}
