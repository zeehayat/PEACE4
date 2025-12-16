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
                'No. of O&M trainings',
                'Sessions on electrical appliances (women)',
            ]);

            foreach ($rows as $index => $row) {
                fputcsv($out, [
                    $index + 1,
                    $row['district'],
                    $row['cbos_formed'],
                    $row['total_members'],
                    $row['exposure_visits'],
                    $row['om_trainings'],
                    $row['appliance_sessions_women'],
                ]);
            }

            fclose($out);
        };

        return response()->stream($callback, 200, $headers);
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
            ->selectSub("select count(*) from cbo_trainings where cbo_trainings.cbo_id = cbos.id and cbo_trainings.training_type = 'O&M Training'", 'om_trainings')
            ->selectSub("select count(*) from cbo_trainings where cbo_trainings.cbo_id = cbos.id and cbo_trainings.training_type = 'Electrical Appliance'", 'appliance_sessions')
            ->selectSub("select count(*) from cbo_trainings where cbo_trainings.cbo_id = cbos.id and cbo_trainings.training_type = 'Electrical Appliance' and cbo_trainings.training_gender = 'Female'", 'appliance_sessions_women')
            ->get();

        return $cboMetrics
            ->groupBy('district')
            ->map(function ($group) {
                return [
                    'district' => $group->first()->district,
                    'cbos_formed' => $group->count(),
                    'total_members' => (int) $group->sum('total_members'),
                    'exposure_visits' => (int) $group->sum('exposure_visits'),
                    'om_trainings' => (int) $group->sum('om_trainings'),
                    'appliance_sessions' => (int) $group->sum('appliance_sessions'),
                    'appliance_sessions_women' => (int) $group->sum('appliance_sessions_women'),
                ];
            })
            ->sortBy('district')
            ->values();
    }
}
