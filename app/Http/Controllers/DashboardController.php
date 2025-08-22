<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\MhpSite;
use App\Models\IrrigationScheme;
use App\Models\LrmCommittee;
use App\Models\CboDialogue;
use App\Models\CboTraining;
use App\Models\ProjectFinancialInstallment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $isDistrictUser = $user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT']);
        $districtName = $isDistrictUser ? $user->district->name : null;

        // Fetch metrics, applying district scope if necessary
        $stats = [
            'total_mhps_approved' => MhpSite::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->whereHas('adminApproval')->count(),
            'total_mhps_completed' => MhpSite::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->whereHas('completion')->count(),
            'total_initiated_mhps' => MhpSite::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->where('status', 'New')->count(),
            'total_capacity_installed' => MhpSite::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->sum('planned_capacity_kw'),
            'total_cbo_dialogues' => CboDialogue::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->count(),
            'total_cbos_formed' => Cbo::when($isDistrictUser, fn($q) => $q->where('district', $districtName))
                ->count(),
            'total_om_training' => CboTraining::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->where('training_type', 'O&M Training')->count(),
            'total_safe_use_training' => CboTraining::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->where('training_type', 'Electrical Appliance')->count(),
            'total_operational_cost' => ProjectFinancialInstallment::when($isDistrictUser, fn($q) => $q->whereHas('projectable.cbo', fn($cq) => $cq->where('district', $districtName)))
                ->sum('installment_amount'),
            'total_net_revenue' => null, // Placeholder for future complex calculation
        ];

        return Inertia::render('MHP/Dashboard', ['stats' => $stats]);
    }
}
