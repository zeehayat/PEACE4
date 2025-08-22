<?php

namespace App\Http\Controllers;

use App\Models\CboTraining;
use App\Models\IrrigationScheme;
use App\Models\CboDialogue;
use App\Models\Cbo;
use App\Models\LrmCommittee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class IrrigationDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $isDistrictUser = $user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT']);
        $districtName = $isDistrictUser ? $user->district->name : null;

        $stats = [
            'total_dialogues_conducted' => CboDialogue::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))->count(),
            'total_cbos_formed' => Cbo::when($isDistrictUser, fn($q) => $q->where('district', $districtName))->count(),
            'total_sub_committees_formed' => 0, // Placeholder
            'total_om_sessions' => CboTraining::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->where('training_type', 'O&M Training')->count(),
            'total_irrigation_systems_approved' => IrrigationScheme::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))->whereHas('adminApproval')->count(),
            'total_irrigation_systems_initiated' => IrrigationScheme::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))->where('status', 'New')->count(),
            'total_irrigation_systems_completed' => IrrigationScheme::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))->whereHas('irrigation_completion')->count(),
            'total_beneficiary_households' => 0, // Placeholder
            'total_beneficiary_population' => 0, // Placeholder

            // FIX: Correctly sum fields from the nested profile relationship
            'total_channel_length_km' => IrrigationScheme::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->whereHas('profile')->sum('channel_length_km'),
            'total_land_covered_hectares' => IrrigationScheme::when($isDistrictUser, fn($q) => $q->whereHas('cbo', fn($cq) => $cq->where('district', $districtName)))
                ->whereHas('profile')->sum('land_area_hectares'),
        ];

        return Inertia::render('Irrigation/Dashboard', ['stats' => $stats]);
    }
}
