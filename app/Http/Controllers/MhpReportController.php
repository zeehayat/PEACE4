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
     * Build the per-site dataset matching the detailed instructions.txt columns.
     */
    private function buildInstructionDataset(Request $request): Collection
    {
        $user = Auth::user();

        $sites = MhpSite::query()
            ->with([
                'cbo.dialogues',
                'adminApproval',
                'emeInfo',
                'tAndDWorks' => fn ($q) => $q->latest('date_of_initiation'),
                'physicalProgresses',
                'financialInstallments',
            ])
            ->forUser($user)
            ->when($request->filled('district'), function ($query) use ($request) {
                $query->whereHas('cbo', fn ($cboQuery) => $cboQuery->where('district', $request->district));
            })
            ->get();

        return $sites->map(function (MhpSite $site) {
            $cbo = $site->cbo;
            $admin = $site->adminApproval;
            $eme = $site->emeInfo;
            $tnd = $site->tAndDWorks->first();

            $dialogueDate = optional($cbo?->dialogues->sortByDesc('date_of_dialogue')->first()?->date_of_dialogue)?->format('Y-m-d');
            $technicalSurveyDate = optional($admin?->technical_survey_date)?->format('Y-m-d');

            $physical = $site->physicalProgresses;
            $financial = $site->financialInstallments;

            $latestProgress = function (?string $component) use ($physical) {
                return $physical
                    ->filter(function ($p) use ($component) {
                        if ($component === null) {
                            return $p->payment_for === null || $p->payment_for === 'Civil';
                        }
                        return $p->payment_for === $component;
                    })
                    ->sortByDesc('progress_date')
                    ->first();
            };

            $sumInstallments = function (?string $component) use ($financial) {
                return (float) $financial
                    ->filter(function ($f) use ($component) {
                        if ($component === null) {
                            return $f->payment_for === null || $f->payment_for === 'Civil';
                        }
                        return $f->payment_for === $component;
                    })
                    ->sum('installment_amount');
            };

            $countTransformers = function () use ($tnd, $eme) {
                $tndCount = 0;
                if ($tnd) {
                    $tndCount += is_array($tnd->step_up_transformers) ? count($tnd->step_up_transformers) : 0;
                    $tndCount += is_array($tnd->step_down_transformers) ? count($tnd->step_down_transformers) : 0;
                }
                $emeCount = $eme?->no_of_step_up_transformers ?? 0;
                return $tndCount + (int) $emeCount;
            };

            $civilProgress = $latestProgress(null);
            $tndProgress = $latestProgress('T&D');
            $emeProgress = $latestProgress('EME');

            $civilPaid = $sumInstallments(null);
            $tndPaid = $sumInstallments('T&D');
            $emePaid = $sumInstallments('EME');

            $totalPaid = $civilPaid + $tndPaid + $emePaid;
            $budget = (float) ($site->estimated_cost ?? 0);

            $overallPhysicalComponents = collect([
                optional($civilProgress)->progress_percentage,
                optional($tndProgress)->progress_percentage,
                optional($emeProgress)->progress_percentage,
            ])->filter(fn ($v) => $v !== null);
            $overallPhysical = $overallPhysicalComponents->count() > 0 ? $overallPhysicalComponents->avg() : null;

            $perKwCost = $site->planned_capacity_kw > 0 ? $budget / (float) $site->planned_capacity_kw : null;
            $totalConnections = (int) (($site->domestic_units ?? 0) + ($site->commercial_units ?? 0));
            $perHhCost = $totalConnections > 0 ? $budget / $totalConnections : null;
            $perBeneficiaryCost = ($site->population ?? 0) > 0 ? $budget / (float) $site->population : null;

            $channelLengthFt = $site->length_ft ?? ($site->channel_length_km ? $site->channel_length_km * 3280.84 : null);

            return [
                'district' => $cbo?->district,
                'tehsil' => $cbo?->tehsil,
                'vc_nc' => $cbo?->village_council,
                'village' => $cbo?->village,
                'cbo_name' => $cbo?->cbo_name,
                'type' => $site->status,
                'dialogue_date' => $dialogueDate,
                'social_assessment' => '', // not present in schema
                'technical_survey_date' => $technicalSurveyDate,
                'existing_capacity_kw' => $site->existing_capacity_kw,
                'total_capacity_kw' => $site->planned_capacity_kw,
                'net_head_ft' => $site->head_ft,
                'discharge_cusecs' => $site->design_discharge_cusecs,
                'channel_length_ft' => $channelLengthFt,
                'turbine_type' => $site->turbine_type ?? $eme?->turbine_type,
                'turbine_count' => $eme?->turbine_no,
                'ht_length_km' => $site->tl_ht_km,
                'lt_length_km' => $site->tl_lt_km,
                'transformer_count' => $countTransformers(),
                'total_households' => $site->total_hh,
                'commercial_consumers' => $site->commercial_units,
                'total_connections' => $totalConnections,
                'population' => $site->population,
                'total_cost' => $budget,
                'per_kw_cost' => $perKwCost,
                'per_hh_cost' => $perHhCost,
                'per_beneficiary_cost' => $perBeneficiaryCost,
                'presented_mc' => $admin && $admin->design_estimate_date ? 'Yes' : 'No',
                'shared_opm' => $admin && $admin->eu_approval_submission_date ? 'Yes' : 'No',
                'review_meeting_opm' => $admin && $admin->opm_validation_date ? 'Yes' : 'No',
                'opm_visit_date' => optional($admin?->opm_validation_date)?->format('Y-m-d'),
                'tnd_initiation_layout' => optional($tnd?->date_of_initiation)?->format('Y-m-d'),
                'civil_total' => $civilPaid,
                'civil_financial_progress' => $budget > 0 ? round(($civilPaid / $budget) * 100, 2) : null,
                'civil_disbursed' => $civilPaid,
                'civil_remaining' => $budget > 0 ? max($budget - $civilPaid, 0) : null,
                'civil_physical_progress' => optional($civilProgress)->progress_percentage,
                'civil_progress_description' => optional($civilProgress)->remarks,
                'civil_completion_date' => optional($civilProgress?->progress_date)?->format('Y-m-d'),
                'tnd_initiation_date' => optional($tnd?->date_of_initiation)?->format('Y-m-d'),
                'tnd_total' => $tndPaid,
                'tnd_disbursed' => $tndPaid,
                'tnd_financial_progress' => $budget > 0 ? round(($tndPaid / $budget) * 100, 2) : null,
                'tnd_remaining' => $budget > 0 ? max($budget - $tndPaid, 0) : null,
                'tnd_physical_progress' => optional($tndProgress)->progress_percentage,
                'tnd_progress_description' => optional($tndProgress)->remarks,
                'tnd_completion_date' => optional($tndProgress?->progress_date)?->format('Y-m-d'),
                'eme_initiation_date' => null,
                'eme_total' => $emePaid,
                'eme_disbursed' => $emePaid,
                'eme_financial_progress' => $budget > 0 ? round(($emePaid / $budget) * 100, 2) : null,
                'eme_remaining' => $budget > 0 ? max($budget - $emePaid, 0) : null,
                'eme_physical_progress' => optional($emeProgress)->progress_percentage,
                'eme_progress_description' => optional($emeProgress)->remarks,
                'eme_completion_date' => optional($emeProgress?->progress_date)?->format('Y-m-d'),
                'overall_physical_progress' => $overallPhysical,
                'overall_progress_description' => optional($physical->sortByDesc('progress_date')->first())->remarks,
                'overall_disbursed' => $totalPaid,
                'overall_remaining' => $budget > 0 ? max($budget - $totalPaid, 0) : null,
                'overall_financial_progress' => $budget > 0 ? round(($totalPaid / $budget) * 100, 2) : null,
            ];
        });
    }

    /**
     * Minimal XLSX generator (no styles) for simple tabular data.
     */
    private function generateSimpleXlsx(array $rows): string
    {
        $sheetXml = $this->buildSheetXml($rows);

        $tmp = tempnam(sys_get_temp_dir(), 'xlsx');
        $zip = new \ZipArchive();
        $zip->open($tmp, \ZipArchive::OVERWRITE);

        $zip->addFromString('[Content_Types].xml', <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
    <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
    <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>
XML);

        $zip->addFromString('_rels/.rels', <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>
XML);

        $zip->addFromString('xl/_rels/workbook.xml.rels', <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
    <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>
XML);

        $zip->addFromString('xl/workbook.xml', <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Report" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>
XML);

        $zip->addFromString('xl/styles.xml', <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="1"><font><sz val="11"/><color theme="1"/><name val="Calibri"/></font></fonts>
  <fills count="1"><fill><patternFill patternType="none"/></fill></fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>
XML);

        $zip->addFromString('xl/worksheets/sheet1.xml', $sheetXml);

        $zip->close();
        $binary = file_get_contents($tmp);
        @unlink($tmp);
        return $binary ?: '';
    }

    private function buildSheetXml(array $rows): string
    {
        $rowsXml = '';
        foreach ($rows as $rowIndex => $row) {
            $rowNum = $rowIndex + 1;
            $cellsXml = '';
            foreach (array_values($row) as $colIndex => $value) {
                $colLetter = $this->columnLetter($colIndex);
                $escaped = htmlspecialchars((string) ($value ?? ''), ENT_QUOTES | ENT_XML1);
                $cellsXml .= "<c r=\"{$colLetter}{$rowNum}\" t=\"inlineStr\"><is><t>{$escaped}</t></is></c>";
            }
            $rowsXml .= "<row r=\"{$rowNum}\">{$cellsXml}</row>";
        }

        return <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>
    {$rowsXml}
  </sheetData>
</worksheet>
XML;
    }

    private function columnLetter(int $index): string
    {
        $index += 1;
        $letter = '';
        while ($index > 0) {
            $mod = ($index - 1) % 26;
            $letter = chr(65 + $mod) . $letter;
            $index = (int) (($index - $mod) / 26);
        }
        return $letter;
    }
}
