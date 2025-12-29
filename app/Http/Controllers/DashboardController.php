<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\MhpSite;
use App\Models\IrrigationScheme;
use App\Models\LrmCommittee;
use App\Models\CboDialogue;
use App\Models\CboTraining;
use App\Models\ProjectFinancialInstallment;
use App\Models\ProjectPhysicalProgress;
use App\Models\MhpEmeFinancialProgress;
use App\Models\MhpEmePhysicalProgress;
use App\Models\Views\IrrigationProgressLatest;
use App\Models\Views\MhpProgressLatest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Services\ProgressService as PC;
class DashboardController extends Controller
{
    public function home(Request $request)
    {
        $user = Auth::user();
        if ($user && $user->hasAnyRole(['Admin', 'Root'])) {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('mhp.dashboard');
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        $isDistrictUser = $user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT']);
        $districtName = $isDistrictUser ? $user->district->name : null;

        // --- Summary metrics (same as yours) ---
        $stats = [
            'total_mhps_approved' => MhpSite::when($isDistrictUser, fn($q) => $q
                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->whereHas('adminApproval')->count(),

            'total_mhps_completed' => MhpSite::when($isDistrictUser, fn($q) => $q
                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->whereHas('completion')->count(),

            'total_irrigation_systems_approved' => IrrigationScheme::when($isDistrictUser, fn($q) => $q
                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->whereHas('adminApproval')->count(),

            'total_irrigation_systems_completed' => IrrigationScheme::when($isDistrictUser, fn($q) => $q
                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->whereHas('irrigation_completion')->count(),

//            'total_lrm_interventions_approved' => LrmCommittee::when($isDistrictUser, fn($q) => $q
//                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
//                ->whereHas('adminApproval')->count(),
//
//            'total_lrm_interventions_completed' => LrmCommittee::when($isDistrictUser, fn($q) => $q
//                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
//                ->whereHas('completion')->count(),

            'total_cbo_dialogues' => CboDialogue::when($isDistrictUser, fn($q) => $q
                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->count(),

            'total_cbos_formed' => Cbo::when($isDistrictUser, fn($q) => $q
                ->where('district', $districtName))
                ->count(),

            'total_om_training' => CboTraining::when($isDistrictUser, fn($q) => $q
                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->where('training_type', 'O&M Training')->count(),

            'total_safe_use_training' => CboTraining::when($isDistrictUser, fn($q) => $q
                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->where('training_type', 'Electrical Appliance')->count(),

            'total_capacity_installed' => MhpSite::when($isDistrictUser, fn($q) => $q
                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->sum('planned_capacity_kw'),

            'total_operational_cost' => ProjectFinancialInstallment::when(
                $isDistrictUser,
                fn($q) => $q->whereHasMorph(
                    'projectable',
                    [MhpSite::class, IrrigationScheme::class, LrmCommittee::class],
                    fn($pq) => $pq->whereHas('cbo', fn($cq) => $cq->where('district', $districtName))
                )
            )->sum('installment_amount'),

            'total_initiated_mhps' => MhpSite::when($isDistrictUser, fn($q) => $q
                ->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->where('status', 'New')->count(),
        ];

       $user = Auth::user();
        $isDistrictUser = $user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT']);
        $districtName = $isDistrictUser ? $user->district->name : null;

        // ... your existing $stats array ...

        // -------- MHP projects (from view) --------
        $mhpQuery = MhpProgressLatest::with('cbo');
        if ($isDistrictUser) {
            $mhpQuery->whereHas('cbo', fn($q) => $q->where('district', $districtName));
        }

        $mhp_projects = $mhpQuery->get()->map(function ($v) {
            // Blend completion as average of phys latest + fin latest (adjust if you prefer weights)
            $signals = array_filter([
                (float) ($v->phys_overall_latest ?? 0),
                (float) ($v->fin_overall_latest_pct ?? 0),
            ], fn($x) => $x > 0);

            $completion = $signals ? array_sum($signals)/count($signals) : 0;

            return [
                'id' => $v->mhp_id,
                'name' => $v->cbo_reference_code ?? ($v->cbo->reference_code ?? ('MHP-' . $v->mhp_id)),
                'completion_percentage' => round($completion, 2),
                'metrics' => [
                    'physical' => [
                        'overall' => (float) $v->phys_overall_latest,
                        'mhp'     => (float) $v->phys_mhp_latest,
                        'eme'     => (float) $v->phys_eme_latest,
                        'tnd'     => (float) $v->phys_tnd_latest,
                    ],
                    'financial' => [
                        'overall' => (float) $v->fin_overall_latest_pct,
                        'mhp'     => (float) $v->fin_mhp_latest_pct,
                        'eme'     => (float) $v->fin_eme_latest_pct,
                        'tnd'     => (float) $v->fin_tnd_latest_pct,
                    ],
                ],
            ];
        });

        // -------- Irrigation projects (from view) --------
        $irrQuery = IrrigationProgressLatest::with('cbo');
        if ($isDistrictUser) {
            $irrQuery->whereHas('cbo', fn($q) => $q->where('district', $districtName));
        }

        $irrigation_projects = $irrQuery->get()->map(function ($v) {
            $signals = array_filter([
                (float) ($v->phys_overall_latest ?? 0),
                (float) ($v->fin_overall_latest_pct ?? 0),
            ], fn($x) => $x > 0);

            $completion = $signals ? array_sum($signals)/count($signals) : 0;

            return [
                'id' => $v->irrigation_id,
                'name' => $v->cbo_reference_code ?? ($v->cbo->reference_code ?? ('Irrigation-' . $v->irrigation_id)),
                'completion_percentage' => round($completion, 2),
                'metrics' => [
                    'physical'  => (float) $v->phys_overall_latest,
                    'financial' => (float) $v->fin_overall_latest_pct,
                ],
            ];
        });

        return Inertia::render('Dashboard', [
            'stats'               => $stats,
            'mhp_projects'        => $mhp_projects,
            'irrigation_projects' => $irrigation_projects,
        ]);

    }



}
