<?php

namespace App\Http\Controllers;

use App\Models\IrrigationScheme;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class IrrigationReportController extends Controller
{
    public function index(Request $request)
    {
        if ($request->query('export') === 'xlsx') {
            return $this->export($request);
        }

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

                $additionalAreaKanal = $profile?->additional_area_covered 
                    ? round($profile->additional_area_covered * 19.768, 2) 
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

    public function export(Request $request): StreamedResponse
    {
        $rows = IrrigationScheme::query()
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
            ->get()
            ->map(function ($scheme, $idx) {
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

                $additionalAreaKanal = $profile?->additional_area_covered 
                    ? round($profile->additional_area_covered * 19.768, 2) 
                    : null;

                $omTrainings = $cbo?->trainings?->where('training_type', 'O&M Training')->count() ?? 0;

                return [
                    'S. No' => $idx + 1,
                    'District' => $cbo?->district,
                    'Tehsil' => $cbo?->tehsil,
                    'VC/NC' => $cbo?->village_council,
                    'Village' => $cbo?->village,
                    'CBO Name' => $cbo?->cbo_name,
                    'CBO Members' => $cbo?->num_cbo_members ?? $cbo?->total_members,
                    'Type of Scheme' => $scheme->scheme_type ?? $scheme->status,
                    'Duration of the Project' => $durationDays,
                    'Dialogue With Community' => $cbo?->dialogues_count ?? 0,
                    'CBO Formation Date' => optional($cbo?->date_of_formation)->format('Y-m-d'),
                    'Social Assessmnent' => optional($admin?->date_validation_visit_psu)->format('Y-m-d'),
                    'Detailed Technical Survey' => optional($profile?->date_technical_surveys ?? $admin?->date_technical_surveys)->format('Y-m-d'),
                    'Detail Design Finalized' => optional($admin?->date_design_estimates_submission_psu)->format('Y-m-d'),
                    'Initiated Date' => optional($initiatedDate)->format('Y-m-d'),
                    'Completion Date' => optional($completionDate)->format('Y-m-d'),
                    'O&M trainings' => $omTrainings,
                    'Handed Over Date' => optional($completion?->handing_over_to_community_date)->format('Y-m-d'),
                    'Beneificiery HHs' => $beneficiaryHhs,
                    'Beneficiary  (Farmers)' => $beneficiaryFarmers,
                    'Total Command Area (Kanal)' => $commandAreaKanal,
                    'Length of Irrigation Channel (Km)' => $channelLengthKm,
                    'Additional Area covered before/ after rehabilitation' => $additionalAreaKanal,
                    'Channel Running Feet REHAB' => null,
                    'Channel Running Feet NEW' => null,
                    'Total Channel Running Feet' => null,
                    'Protection Running Feet' => null,
                    'Intake Length Running Feet' => null,
                    'Per Household cost' => $perHouseholdCost,
                    'Scheme Cost' => $schemeCost,
                ];
            });

        $headers = array_keys($rows->first() ?? []);

        $callback = function () use ($rows, $headers) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $headers);
            foreach ($rows as $row) {
                fputcsv($file, $row);
            }
            fclose($file);
        };

        $fileName = 'irrigation_scheme_report_' . now()->format('Ymd_His') . '.csv';

        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$fileName}\"",
        ]);
    }
}
