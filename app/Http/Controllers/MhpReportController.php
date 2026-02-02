<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\MhpSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class MhpReportController extends Controller
{
    /**
     * Display the MHP Report dashboard with filtering capabilities.
     */
    public function index(Request $request)
    {
        // 1. Authorization check
        $this->authorize('viewAny', MhpSite::class);

        // Assuming District model is available
        $districts = District::orderBy('name')->pluck('name');

        // Note: The financial component column name is assumed to be 'category' based on previous debugging.
        $financialComponentColumn = 'project_financial_installments.category';

        $query = MhpSite::query()
            ->select([
                'mhp_sites.id',
                'mhp_sites.id AS project_identifier',
                'mhp_sites.status',
                'cbos.cbo_name AS site_name', // <-- MHP Site Name is the CBO Name
                'mhp_sites.planned_capacity_kw',

                'cbos.cbo_name AS cbo_name', // <-- CBO Name itself
                'cbos.reference_code AS cbo_reference',
                'cbos.district AS district',
                DB::raw('SUM(CASE WHEN project_physical_progresses.payment_for = "Civil Works" THEN project_physical_progresses.progress_percentage ELSE 0 END) AS civil_progress_sum'),
                DB::raw('SUM(CASE WHEN project_physical_progresses.payment_for = "E&M Works" THEN project_physical_progresses.progress_percentage ELSE 0 END) AS eme_progress_sum'),

                DB::raw("SUM(CASE WHEN {$financialComponentColumn} = 'MHP' THEN project_financial_installments.installment_amount ELSE 0 END) AS total_financial_mhp"),
                DB::raw("SUM(CASE WHEN {$financialComponentColumn} = 'T&D' THEN project_financial_installments.installment_amount ELSE 0 END) AS total_financial_tandd"),
            ])
            ->join('cbos', 'mhp_sites.cbo_id', '=', 'cbos.id')

            // LEFT JOINs omitted for brevity
            ->leftJoin('project_physical_progresses', function ($join) {
                $join->on('project_physical_progresses.projectable_id', '=', 'mhp_sites.id')
                    ->where('project_physical_progresses.projectable_type', '=', MhpSite::class);
            })

            ->leftJoin('project_financial_installments', function ($join) {
                $join->on('project_financial_installments.projectable_id', '=', 'mhp_sites.id')
                    ->where('project_financial_installments.projectable_type', '=', MhpSite::class);
            })

            // Apply Scope for District Users
            ->forUser(Auth::user());

        // 2. Apply Filters (omitted for brevity)

        // 3. Group and Paginate Results
        $mhpSites = $query
            // Group by the columns used in SELECT (excluding aggregate functions)
            ->groupBy('mhp_sites.id', 'project_identifier', 'mhp_sites.status', 'cbos.cbo_name', 'mhp_sites.planned_capacity_kw', 'cbos.reference_code', 'cbos.district')
            ->orderBy('mhp_sites.id', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('MHP/MhpReport', [
            'mhpSites' => $mhpSites,
            'districts' => $districts,
            'filters' => $request->only('district', 'status'),
        ]);
    }



    /**
     * Dedicated method for generating and streaming the Excel/CSV file.
     * This method will accept the same filters as index().
     */
    public function export(Request $request)
    {
        // Placeholder logic: You would use Laravel Excel (Maatwebsite) here.
        // Example: return (new MhpReportExport($request->all()))->download('mhp_progress_report.xlsx');

        return response()->json(['message' => 'Export functionality pending Laravel Excel implementation.'], 501);
    }

    /**
     * District-wise snapshot for MHP-linked CBO work (dialogues, trainings, exposure visits).
     */
    public function districtReport(Request $request)
    {
        $this->authorize('viewAny', MhpSite::class);

        $districts = District::orderBy('name')->pluck('name');
        $filters = $request->only('district');

        $rows = $this->buildDistrictDataset($request);

        return Inertia::render('MHP/MhpDistrictReport', [
            'districts' => $districts,
            'filters' => $filters,
            'rows' => $rows,
        ]);
    }

    /**
     * CSV export for district-wise MHP metrics (headers mirror the shared progress sheet style).
     */
    public function exportDistrictReport(Request $request)
    {
        $this->authorize('viewAny', MhpSite::class);

        $rows = $this->buildDistrictDataset($request);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="mhp_district_report_' . now()->format('Ymd_His') . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = static function () use ($rows) {
            $out = fopen('php://output', 'w');

            fputcsv($out, [
                'S. No',
                'District',
                'No. of CBOs formed',
                'Total members',
                'No. of exposure visits',
                'Exposure visit participants',
                'No. of O&M trainings',
                'O&M training participants',
                'Sessions on electrical appliances (women)',
                'Electrical appliance participants (women)',
            ]);

            foreach ($rows as $index => $row) {
                fputcsv($out, [
                    $index + 1,
                    $row['district'],
                    $row['cbos_formed'],
                    $row['total_members'],
                    $row['exposure_visits'],
                    $row['exposure_participants'],
                    $row['om_trainings'],
                    $row['om_training_participants'],
                    $row['appliance_sessions_women'],
                    $row['appliance_participants_women'],
                ]);
            }

            fclose($out);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Simpler instructions.txt-aligned view (counts only).
     */
    public function instructionReport(Request $request)
    {
        $this->authorize('viewAny', MhpSite::class);

        $districts = District::orderBy('name')->pluck('name');
        $filters = $request->only('district');
        $rows = $this->buildInstructionDataset($request);

        return Inertia::render('MHP/MhpInstructionReport', [
            'districts' => $districts,
            'filters' => $filters,
            'rows' => $rows,
        ]);
    }

    /**
     * CSV export for the instructions.txt-aligned report (counts only).
     */
    public function exportInstructionReport(Request $request)
    {
        $this->authorize('viewAny', MhpSite::class);

        $rows = $this->buildInstructionDataset($request);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="mhp_district_instructions_' . now()->format('Ymd_His') . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $headerRow = [
            'S. No',
            'District',
            'Tehsil',
            'VC/NC',
            'Village',
            'CBO Name',
            'Type of MHP',
            'Dialogue With Community Date',
            'Social Assessment',
            'Detailed Technical Survey Date',
            'Existing Capacity (KW)',
            'Total Capacity kW',
            'Net Head ft',
            'Discharge cusecs',
            'Length of Channel ft',
            'Turbine Type',
            'No of Turbines required',
            'HT Line Length (Km)',
            'LT Line Length (Km)',
            'No. of Transformer',
            'Total households',
            'Commercial Consumers',
            'Total Connections',
            'Total Population',
            'Total Cost (PKR)',
            'Per Kw Cost (PKR)',
            'Per HH+Commercial Cost (PKR)',
            'Per Beneficiary Cost (PKR)',
            'Presented to Management Committee',
            'Shared With OPM/EU for Review',
            'Review Meeting with OPM',
            'OPM Visit to Site Date',
            'Date of T&D work Initiation Layout/Ground Breaking',
            'Total Amount for Civil Works PKR',
            'Financial Progress Civil %',
            'Amount Disbursed Civil',
            'Remaining Civil',
            'Physical Progress Civil',
            'Progress Description Civil',
            'Date of Physical Work completion Civil',
            'Date of T&D work Initiation',
            'Total Amount for T&D Works PKR',
            'Amount Disbursed T&D',
            'Financial Progress T&D %',
            'Remaining Amount T&D',
            'Physical Progress T&D',
            'Progress Description T&D',
            'Date of Physical Work completion T&D',
            'Date of EME work Initiation',
            'Total Amount for EME Works PKR',
            'Amount Disbursed EME',
            'Financial EME Progress %',
            'Remaining EME',
            'Physical EME Progress',
            'Progress EME Description',
            'Date of Physical Work completion EME',
            'Physical (Civil+EME+T&D) %',
            'Description Progress Overall',
            'Amount Disbursed PKR Overall',
            'Remaining Amount Overall',
            'Financial Progress % Overall',
        ];

        $dataRows = [];
        foreach ($rows as $index => $row) {
            $dataRows[] = [
                $index + 1,
                $row['district'],
                $row['tehsil'],
                $row['vc_nc'],
                $row['village'],
                $row['cbo_name'],
                $row['type'],
                $row['dialogue_date'],
                $row['social_assessment'],
                $row['technical_survey_date'],
                $row['existing_capacity_kw'],
                $row['total_capacity_kw'],
                $row['net_head_ft'],
                $row['discharge_cusecs'],
                $row['channel_length_ft'],
                $row['turbine_type'],
                $row['turbine_count'],
                $row['ht_length_km'],
                $row['lt_length_km'],
                $row['transformer_count'],
                $row['total_households'],
                $row['commercial_consumers'],
                $row['total_connections'],
                $row['population'],
                $row['total_cost'],
                $row['per_kw_cost'],
                $row['per_hh_cost'],
                $row['per_beneficiary_cost'],
                $row['presented_mc'],
                $row['shared_opm'],
                $row['review_meeting_opm'],
                $row['opm_visit_date'],
                $row['tnd_initiation_layout'],
                $row['civil_total'],
                $row['civil_financial_progress'],
                $row['civil_disbursed'],
                $row['civil_remaining'],
                $row['civil_physical_progress'],
                $row['civil_progress_description'],
                $row['civil_completion_date'],
                $row['tnd_initiation_date'],
                $row['tnd_total'],
                $row['tnd_disbursed'],
                $row['tnd_financial_progress'],
                $row['tnd_remaining'],
                $row['tnd_physical_progress'],
                $row['tnd_progress_description'],
                $row['tnd_completion_date'],
                $row['eme_initiation_date'],
                $row['eme_total'],
                $row['eme_disbursed'],
                $row['eme_financial_progress'],
                $row['eme_remaining'],
                $row['eme_physical_progress'],
                $row['eme_progress_description'],
                $row['eme_completion_date'],
                $row['overall_physical_progress'],
                $row['overall_progress_description'],
                $row['overall_disbursed'],
                $row['overall_remaining'],
                $row['overall_financial_progress'],
            ];
        }

        $xlsxBinary = $this->generateSimpleXlsx(array_merge([$headerRow], $dataRows));

        return response($xlsxBinary, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="mhp_district_instructions_' . now()->format('Ymd_His') . '.xlsx"',
        ]);
    }

    /**
     * Assemble district-level metrics for MHP CBOs, keeping filters/policy scopes aligned between view and export.
     */
    private function buildDistrictDataset(Request $request): Collection
    {
        $user = Auth::user();

        $mhpCboIds = MhpSite::query()
            ->forUser($user)
            ->when($request->filled('district'), function ($query) use ($request) {
                $query->whereHas('cbo', fn($cboQuery) => $cboQuery->where('district', $request->district));
            })
            ->pluck('cbo_id')
            ->unique();

        if ($mhpCboIds->isEmpty()) {
            return collect();
        }

        $cboMetrics = DB::table('cbos')
            ->select([
                'cbos.id',
                'cbos.district',
                'cbos.total_members',
            ])
            ->whereIn('cbos.id', $mhpCboIds)
            ->when($request->filled('district'), fn($q) => $q->where('cbos.district', $request->district))
            ->selectSub('select count(*) from cbo_exposure_visits where cbo_exposure_visits.cbo_id = cbos.id', 'exposure_visits')
            ->selectSub('select coalesce(sum(participants),0) from cbo_exposure_visits where cbo_exposure_visits.cbo_id = cbos.id', 'exposure_participants')
            ->selectSub("select count(*) from cbo_trainings where cbo_trainings.cbo_id = cbos.id and cbo_trainings.training_type = 'O&M Training'", 'om_trainings')
            ->selectSub("select coalesce(sum(total_participants),0) from cbo_trainings where cbo_trainings.cbo_id = cbos.id and cbo_trainings.training_type = 'O&M Training'", 'om_training_participants')
            ->selectSub("select count(*) from cbo_trainings where cbo_trainings.cbo_id = cbos.id and cbo_trainings.training_type = 'Electrical Appliance'", 'appliance_sessions')
            ->selectSub("select count(*) from cbo_trainings where cbo_trainings.cbo_id = cbos.id and cbo_trainings.training_type = 'Electrical Appliance' and cbo_trainings.training_gender = 'Female'", 'appliance_sessions_women')
            ->selectSub("select coalesce(sum(total_participants),0) from cbo_trainings where cbo_trainings.cbo_id = cbos.id and cbo_trainings.training_type = 'Electrical Appliance' and cbo_trainings.training_gender = 'Female'", 'appliance_participants_women')
            ->get();

        return $cboMetrics
            ->groupBy('district')
            ->map(function ($group) {
                return [
                    'district' => $group->first()->district,
                    'cbos_formed' => $group->count(),
                    'total_members' => (int) $group->sum('total_members'),
                    'exposure_visits' => (int) $group->sum('exposure_visits'),
                    'exposure_participants' => (int) $group->sum('exposure_participants'),
                    'om_trainings' => (int) $group->sum('om_trainings'),
                    'om_training_participants' => (int) $group->sum('om_training_participants'),
                    'appliance_sessions' => (int) $group->sum('appliance_sessions'),
                    'appliance_sessions_women' => (int) $group->sum('appliance_sessions_women'),
                    'appliance_participants_women' => (int) $group->sum('appliance_participants_women'),
                ];
            })
            ->sortBy('district')
            ->values();
    }


    /**
     * Build the dataset for the Detailed Report.
     */
    private function buildDetailedDataset(Request $request): Collection
    {
        $user = Auth::user();

        $query = MhpSite::query()
            ->with([
                'cbo.dialogues',
                'adminApproval',
                'emeInfo',
                'tAndDWorks' => fn ($q) => $q->latest('date_of_initiation'),
                'physicalProgresses',
                'financialInstallments',
            ])
            ->forUser($user);

        // Apply Filters
        if ($request->filled('district')) {
            $query->whereHas('cbo', fn ($q) => $q->where('district', $request->district));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                 $q->whereHas('cbo', function($cboQ) use ($search) {
                     $cboQ->where('cbo_name', 'like', "%{$search}%")
                          ->orWhere('reference_code', 'like', "%{$search}%");
                 });
            });
        }

        $sites = $query->get();

        return $sites->map(function (MhpSite $site) {
            $service = new \App\Services\MhpReportService($site);

            return [
                'district' => $site->cbo?->district,
                'tehsil' => $site->cbo?->tehsil,
                'vc_nc' => $site->cbo?->village_council,
                'village' => $site->cbo?->village,
                'cbo_name' => $site->cbo?->cbo_name,
                'type' => $site->status,
                'dialogue_date' => $service->getDialogueDate(),
                'social_assessment' => $service->getSocialAssessmentDate(),
                'technical_survey_date' => $service->getTechnicalSurveyDate(),
                'existing_capacity_kw' => $site->existing_capacity_kw,
                'total_capacity_kw' => $site->planned_capacity_kw,
                'net_head_ft' => $site->head_ft,
                'discharge_cusecs' => $site->design_discharge_cusecs,
                'channel_length_ft' => $service->getChannelLengthFt(),
                'turbine_type' => $site->turbine_type ?? $site->emeInfo?->turbine_type,
                'turbine_count' => $site->emeInfo?->turbine_no,
                'ht_length_km' => $service->getHtConductorLengthKm(),
                'lt_length_km' => $service->getLtConductorLengthKm(),
                'transformer_count' => $service->getTotalTransformersCount(),
                'total_households' => $site->total_hh,
                'commercial_consumers' => $site->commercial_units,
                'total_connections' => $service->getTotalConnections(),
                'population' => $site->population,
                'total_cost' => $service->getTotalCost(),
                'per_kw_cost' => $service->getPerKwCost(),
                'per_hh_cost' => $service->getPerHhCost(),
                'per_beneficiary_cost' => $service->getPerBeneficiaryCost(),
                'presented_mc' => $service->getPresentationToMcStatus(),
                'shared_opm' => $service->getSharedWithOpmStatus(),
                'review_meeting_opm' => $service->getOpmReviewStatus(),
                'opm_visit_date' => $service->getOpmVisitDate(),
                'eu_final_review' => optional($site->eu_approval_meeting_date)->format('Y-m-d'),
                'eu_approval' => optional($service->getApprovalFromEu())->format('Y-m-d'),
                
                // Civil Procurement
                'civil_advertisement' => optional($site->civil_advertisement_date)->format('Y-m-d'),
                'civil_pre_bid' => optional($site->civil_pre_bid_meeting_date)->format('Y-m-d'),
                'civil_tech_bid' => optional($site->civil_technical_bid_opening_date)->format('Y-m-d'),
                'civil_fin_bid' => optional($site->civil_financial_bid_opening_date)->format('Y-m-d'),
                'civil_contract_award' => optional($site->civil_contract_award_date)->format('Y-m-d'),
                'civil_contractor_amount' => $site->civil_contractor_amount,

                // T&D Procurement
                'tnd_advertisement' => optional($site->tAndDWorks->first()?->advertisement_date)->format('Y-m-d'),
                'tnd_pre_bid' => optional($site->tAndDWorks->first()?->pre_bid_meeting_date)->format('Y-m-d'),
                'tnd_tech_bid' => optional($site->tAndDWorks->first()?->technical_bid_opening_date)->format('Y-m-d'),
                'tnd_fin_bid' => optional($site->tAndDWorks->first()?->financial_bid_opening_date)->format('Y-m-d'),
                'tnd_contract_award' => optional($site->tAndDWorks->first()?->contract_award_date)->format('Y-m-d'),
                'tnd_contractor_amount' => $site->tAndDWorks->first()?->contractor_amount,

                 // EME Procurement
                'eme_advertisement' => optional($site->emeInfo?->advertisement_date)->format('Y-m-d'),
                'eme_pre_bid' => optional($site->emeInfo?->pre_bid_meeting_date)->format('Y-m-d'),
                'eme_tech_bid' => optional($site->emeInfo?->technical_bid_opening_date)->format('Y-m-d'),
                'eme_fin_bid' => optional($site->emeInfo?->financial_bid_opening_date)->format('Y-m-d'),
                'eme_contract_award' => optional($site->emeInfo?->contract_award_date)->format('Y-m-d'),
                'eme_contractor_amount' => $site->emeInfo?->contractor_amount,

                'civil_initiation_ground_breaking' => optional($service->getDateOfCivilWorkLayoutInitiation())->format('Y-m-d'),
                'civil_total' => $service->getTotalPaidAmount(null),
                'civil_financial_progress' => $service->getTotalCost() > 0 ? round(($service->getTotalPaidAmount(null) / $service->getTotalCost()) * 100, 2) : null,
                'civil_disbursed' => $service->getTotalPaidAmount(null),
                'civil_remaining' => $service->getTotalCost() > 0 ? max($service->getTotalCost() - $service->getTotalPaidAmount(null), 0) : null,
                'civil_physical_progress' => optional($service->getLatestPhysicalProgress(null))->progress_percentage,
                'civil_progress_description' => $service->getProgressDescriptionCivl(),
                'civil_completion_date' => $service->getCivilCompletionDate(),
                'tnd_initiation_date' => optional($site->tAndDWorks->first()?->date_of_initiation)->format('Y-m-d'),
                'tnd_total' => $service->getTotalPaidAmount('T&D'),
                'tnd_disbursed' => $service->getTotalPaidAmount('T&D'),
                'tnd_financial_progress' => $service->getTotalCost() > 0 ? round(($service->getTotalPaidAmount('T&D') / $service->getTotalCost()) * 100, 2) : null,
                'tnd_remaining' => $service->getRemainingAmountTAndD(),
                'tnd_physical_progress' => optional($service->getLatestPhysicalProgress('T&D'))->progress_percentage,
                'tnd_progress_description' => optional($service->getLatestPhysicalProgress('T&D'))->remarks,
                'tnd_completion_date' => $service->getTndCompletionDate(),
                'eme_initiation_date' => optional($site->emeInfo?->initiation_date)->format('Y-m-d'),
                'eme_total' => $service->getTotalPaidAmount('EME'),
                'eme_disbursed' => $service->getTotalPaidAmount('EME'),
                'eme_financial_progress' => $service->getTotalCost() > 0 ? round(($service->getTotalPaidAmount('EME') / $service->getTotalCost()) * 100, 2) : null,
                'eme_remaining' => $site->emeInfo?->amount_remaining,
                'eme_physical_progress' => optional($service->getLatestPhysicalProgress('EME'))->progress_percentage,
                'eme_progress_description' => optional($service->getLatestPhysicalProgress('EME'))->remarks,
                'eme_completion_date' => $service->getEmeCompletionDate(),
                'overall_physical_progress' => $service->getCombinedCivilProgress(),
                'overall_progress_description' => optional($site->physicalProgresses->sortByDesc('progress_date')->first())->remarks,
                'overall_disbursed' => $service->getTotalPaidAmount(null) + $service->getTotalPaidAmount('T&D') + $service->getTotalPaidAmount('EME'),
                'overall_remaining' => null,
                'overall_financial_progress' => null,
            ];
        });
    }

    /**
     * Build the per-site dataset matching the detailed instructions.txt columns.
     */
    private function buildInstructionDataset(Request $request): Collection
    {
        return $this->buildDetailedDataset($request);
    }
    public function detailedReport(Request $request)
    {
        $this->authorize('viewAny', MhpSite::class);

        $districts = District::orderBy('name')->pluck('name');
        
        // Get unique statuses from MHP sites for the filter
        $statuses = MhpSite::distinct()->pluck('status')->filter()->values();

        $filters = $request->only('district', 'status', 'search');
        $rows = $this->buildDetailedDataset($request);

        return Inertia::render('MHP/MhpDetailedReport', [
            'districts' => $districts,
            'statuses' => $statuses,
            'filters' => $filters,
            'rows' => $rows,
        ]);
    }

    /**
     * Excel Export for the Detailed Report.
     */
    public function exportDetailedReport(Request $request)
    {
        $this->authorize('viewAny', MhpSite::class);

        $rows = $this->buildDetailedDataset($request);

        // Define Headers matching fieldsformhpreport.txt
        $headerRow = [
           'S. No', 'District', 'Tehsil', 'VC/NC', 'Village',
           'Type of MHP',
           'Dialogue With Community', 'Social Assessmnent', 'Detailed Technical Survey',
           'Existing Capacity (KW)', 'Total Capacity kW', 'Net Head ft', 'Discharge cusecs',
           'Length of Channel ft', 'Turbine Type', 'No of Turbines required',
           'HT Line Length (Km)', 'LT Line Length (Km)', 'No. of Transformer',
           'Total H.H', 'Commercial Consumers', 'Total Connections', 'Total Population',
           'Total Cost (PKR)', 'Per Kw Cost (PKR)', 'Per HH+Commercial Cost (PKR)', 'Per Beneficiery Cost (PKR)',
           'Presented to Management Committee', 'Shared With OPM/EU for Review',
           'Review Meeting with OPM (TA/EU) comments and feedback', 'OPM Visit to Site',
           'Final Review Meeting with EU for Approval', 'Approval from EU',

           // Civil Procurement
           'Advertisement in Newspaper (Civil)', 'Pre-Bid Meeting (Civil)', 'Technical Bid Opening (Civil)',
           'Financial Bid Opening (Civil)', 'Contractor Agreement & Work Order (Civil)', 'Contractor Cost as per BID (Civil)',

            // T&D Procurement (Repeated header names in text file, adding suffix for clarity)
            'Advertisement in Newspaper (T&D)', 'Pre-Bid Meeting (T&D)', 'Technical Bid Opening (T&D)',
            'Financial Bid Opening (T&D)', 'Contractor Agreement & Work Order (T&D)', 'Contractor Cost as per BID (T&D)',

            // EME Procurement
            'Advertisement in Newspaper (EME)', 'Pre-Bid Meeting (EME)', 'Technical Bid Opening (EME)',
            'Financial Bid Opening (EME)', 'Contractor Agreement & Work Order (EME)', 'Contractor Cost as per BID (EME)',

            // Civil Progress
            'Date of Civil work Initiation Layout and Ground Breaking Ceremony', 'Total Amount for Civil Works PKR',
            'Financial Progress Civil %', 'Amount Disbursed Civil', 'Remaining Civil',
            'Physical Progress Civil', 'Progress Description Civil', 'Date of Physical Work completion Civil',

            // T&D Progress
            'Date of T&D work Initiation', 'Total Amount for T&D Works PKR',
            'Amount Disbursed T&D', 'Financial Progress T&D %', 'Remaining Amount T&D',
            'Physical Progress T&D', 'Progress Description T&D', 'Date of Physical Work completion T&D',

            // EME Progress
            'Date of EME work Initiation', 'Total Amount for EME Works PKR',
            'Amount Disbursed EME', 'Financial EME Progress %', 'Remaining EME',
            'Physical EME Progress', 'Progress EME Description', 'Date of Physical Work completion EME',

            // Overall
            'Physical (Civil+EME+T&D) %', 'Description Progress Overall',
            'Amoount Disbursed PKR Overall', 'Remaining Amount', 'Fianncial Progress %'
        ];


        $dataRows = [];
        foreach ($rows as $index => $row) {
            $dataRows[] = [
                $index + 1,
                $row['district'], $row['tehsil'], $row['vc_nc'], $row['village'],
                $row['type'],
                $row['dialogue_date'], $row['social_assessment'], $row['technical_survey_date'],
                $row['existing_capacity_kw'], $row['total_capacity_kw'], $row['net_head_ft'], $row['discharge_cusecs'],
                $row['channel_length_ft'], $row['turbine_type'], $row['turbine_count'],
                $row['ht_length_km'], $row['lt_length_km'], $row['transformer_count'],
                $row['total_households'], $row['commercial_consumers'], $row['total_connections'], $row['population'],
                $row['total_cost'], $row['per_kw_cost'], $row['per_hh_cost'], $row['per_beneficiary_cost'],
                $row['presented_mc'], $row['shared_opm'], $row['review_meeting_opm'], $row['opm_visit_date'],
                $row['eu_final_review'], $row['eu_approval'], // New fields

                // Civil Procurement
                $row['civil_advertisement'], $row['civil_pre_bid'], $row['civil_tech_bid'],
                $row['civil_fin_bid'], $row['civil_contract_award'], $row['civil_contractor_amount'],

                // T&D Procurement
                $row['tnd_advertisement'], $row['tnd_pre_bid'], $row['tnd_tech_bid'],
                $row['tnd_fin_bid'], $row['tnd_contract_award'], $row['tnd_contractor_amount'],

                // EME Procurement
                $row['eme_advertisement'], $row['eme_pre_bid'], $row['eme_tech_bid'],
                $row['eme_fin_bid'], $row['eme_contract_award'], $row['eme_contractor_amount'],

                // Civil Progress
                $row['civil_initiation_ground_breaking'], $row['civil_total'],
                $row['civil_financial_progress'], $row['civil_disbursed'], $row['civil_remaining'],
                $row['civil_physical_progress'], $row['civil_progress_description'], $row['civil_completion_date'],

                // T&D Progress
                $row['tnd_initiation_date'], $row['tnd_total'],
                $row['tnd_disbursed'], $row['tnd_financial_progress'], $row['tnd_remaining'],
                $row['tnd_physical_progress'], $row['tnd_progress_description'], $row['tnd_completion_date'],

                // EME Progress
                $row['eme_initiation_date'], $row['eme_total'],
                $row['eme_disbursed'], $row['eme_financial_progress'], $row['eme_remaining'],
                $row['eme_physical_progress'], $row['eme_progress_description'], $row['eme_completion_date'],

                // Overall
                $row['overall_physical_progress'], $row['overall_progress_description'],
                $row['overall_disbursed'], $row['overall_remaining'], $row['overall_financial_progress'],
            ];
        }

        $xlsxBinary = $this->generateSimpleXlsx(array_merge([$headerRow], $dataRows));

        return response($xlsxBinary, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="mhp_detailed_report_' . now()->format('Ymd_His') . '.xlsx"',
        ]);
    }

    use \App\Traits\SimpleXlsxGenerator;
}


