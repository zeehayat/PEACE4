<?php

namespace App\Http\Controllers;

use App\Models\IrrigationScheme;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IrrigationReportController extends Controller
{
    public function index(Request $request)
    {
        $schemes = IrrigationScheme::query()
            ->forUser($request->user())
            ->with([
                'profile',
                'adminApproval',
                'irrigation_completion',
                'irrigationSchemeContract',
                'cbo' => function ($q) {
                    $q->select('id', 'reference_code', 'district', 'tehsil', 'village_council', 'village', 'date_of_formation', 'total_members', 'num_cbo_members', 'cbo_name')
                        ->withCount('dialogues')
                        ->with(['trainings']);
                },
            ])
            ->orderByDesc('id')
            ->paginate(50)
            ->through(function ($scheme) {
                $cbo = $scheme->cbo;
                $profile = $scheme->profile;
                $admin = $scheme->adminApproval;
                $completion = $scheme->irrigation_completion;
                $contract = $scheme->irrigationSchemeContract;

                $beneficiaryHhs = $completion?->number_of_beneficiary_farmers ?? $profile?->beneficiary_farmers;
                $beneficiaryFarmers = $beneficiaryHhs;

                $commandAreaHectares = $completion?->area_of_land_covered_hectares ?? $profile?->land_area_hectares;
                $commandAreaKanal = $commandAreaHectares ? round($commandAreaHectares * 19.768, 2) : null;

                $channelLengthKm = $completion?->length_of_irrigation_channels_km ?? $profile?->channel_length_km;

                $schemeCost = $contract?->agreement_cost ?? $admin?->approved_cost;
                $perHouseholdCost = ($schemeCost && $beneficiaryHhs)
                    ? round($schemeCost / max($beneficiaryHhs, 1), 2)
                    : null;

                $initiatedDate = $contract?->date_of_physical_start;
                $completionDate = $completion?->handing_over_to_community_date ?? null;
                $durationDays = ($initiatedDate && $completionDate)
                    ? Carbon::parse($initiatedDate)->diffInDays(Carbon::parse($completionDate))
                    : null;

                $baseArea = $profile?->land_area_hectares;
                $rehabArea = $completion?->area_of_land_covered_hectares;
                $additionalAreaKanal = ($baseArea !== null && $rehabArea !== null)
                    ? round(($rehabArea - $baseArea) * 19.768, 2)
                    : null;

                $omTrainings = $cbo?->trainings?->where('training_type', 'O&M Training')->count() ?? 0;

                return [
                    'id' => $scheme->id,
                    'district' => $cbo?->district,
                    'tehsil' => $cbo?->tehsil,
                    'village_council' => $cbo?->village_council,
                    'village' => $cbo?->village,
                    'cbo_name' => $cbo?->cbo_name,
                    'cbo_members' => $cbo?->num_cbo_members ?? $cbo?->total_members,
                    'scheme_type' => $scheme->scheme_type ?? $scheme->status,
                    'duration_days' => $durationDays,
                    'dialogues' => $cbo?->dialogues_count ?? 0,
                    'cbo_formation_date' => $cbo?->date_of_formation,
                    'social_assessment' => $admin?->date_validation_visit_psu,
                    'technical_survey_date' => $profile?->date_technical_surveys ?? $admin?->date_technical_surveys,
                    'design_finalized_date' => $admin?->date_design_estimates_submission_psu,
                    'initiated_date' => $initiatedDate,
                    'completion_date' => $completionDate,
                    'om_trainings' => $omTrainings,
                    'handed_over_date' => $completion?->handing_over_to_community_date,
                    'beneficiary_hhs' => $beneficiaryHhs,
                    'beneficiary_farmers' => $beneficiaryFarmers,
                    'command_area_kanal' => $commandAreaKanal,
                    'channel_length_km' => $channelLengthKm,
                    'additional_area_kanal' => $additionalAreaKanal,
                    'channel_running_feet_rehab' => null,
                    'channel_running_feet_new' => null,
                    'total_channel_running_feet' => null,
                    'protection_running_feet' => null,
                    'intake_length_running_feet' => null,
                    'per_household_cost' => $perHouseholdCost,
                    'scheme_cost' => $schemeCost,
                ];
            })
            ->withQueryString();

        return Inertia::render('Irrigation/IrrigationReport', [
            'schemes' => $schemes,
        ]);
    }
}
