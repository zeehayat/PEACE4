<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\District;
use App\Models\MhpSite;
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
}
