<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\LrmCommittee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LrmReportController extends Controller
{
    private function buildDataset(Request $request)
    {
        $query = LrmCommittee::query()
            ->forUser(Auth::user())
            ->select([
                'lrm_committees.id',
                'cbos.cbo_name as cbo_name',
                'cbos.district as district',
                'lrm_committees.target_forest_plants_count',
                'lrm_committees.target_fruit_plants_count',
                'lrm_committees.target_drr_training_persons',
                'lrm_committees.target_check_dams_value',
                DB::raw('SUM(lrm_nrm_achievements.achieved_forest_plants_count) as achieved_forest_plants_count'),
                DB::raw('SUM(lrm_nrm_achievements.achieved_fruit_plants_count) as achieved_fruit_plants_count'),
                DB::raw('SUM(lrm_nrm_achievements.achieved_drr_training_persons) as achieved_drr_training_persons'),
                DB::raw('SUM(lrm_nrm_achievements.achieved_check_dams_value) as achieved_check_dams_value'),
            ])
            ->join('cbos', 'lrm_committees.cbo_id', '=', 'cbos.id')
            ->leftJoin('lrm_nrm_achievements', 'lrm_nrm_achievements.lrm_committee_id', '=', 'lrm_committees.id')
            ->groupBy(
                'lrm_committees.id',
                'cbos.cbo_name',
                'cbos.district',
                'lrm_committees.target_forest_plants_count',
                'lrm_committees.target_fruit_plants_count',
                'lrm_committees.target_drr_training_persons',
                'lrm_committees.target_check_dams_value',
            );

        if ($request->filled('district')) {
            $query->where('cbos.district', $request->input('district'));
        }

        return $query->orderBy('lrm_committees.id')->get()->map(function ($row) {
            $row->achieved_forest_plants_count = (int) $row->achieved_forest_plants_count;
            $row->achieved_fruit_plants_count = (int) $row->achieved_fruit_plants_count;
            $row->achieved_drr_training_persons = (int) $row->achieved_drr_training_persons;
            $row->achieved_check_dams_value = (float) $row->achieved_check_dams_value;

            return $row;
        });
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', LrmCommittee::class);

        $districts = District::orderBy('name')->pluck('name');
        $rows = $this->buildDataset($request);

        return Inertia::render('LRM/LrmReport', [
            'districts' => $districts,
            'filters' => $request->only('district'),
            'rows' => $rows,
        ]);
    }

    public function export(Request $request)
    {
        $this->authorize('viewAny', LrmCommittee::class);

        $rows = $this->buildDataset($request);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="lrm_nrm_report_' . now()->format('Ymd_His') . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = static function () use ($rows) {
            $out = fopen('php://output', 'w');

            fputcsv($out, [
                'District', 'CBO', 'Forest Plants Target', 'Forest Plants Achieved',
                'Fruit Plants Target', 'Fruit Plants Achieved',
                'DRR Training Target', 'DRR Training Achieved',
                'Check Dams Target', 'Check Dams Achieved',
            ]);

            foreach ($rows as $row) {
                fputcsv($out, [
                    $row->district,
                    $row->cbo_name,
                    $row->target_forest_plants_count,
                    $row->achieved_forest_plants_count,
                    $row->target_fruit_plants_count,
                    $row->achieved_fruit_plants_count,
                    $row->target_drr_training_persons,
                    $row->achieved_drr_training_persons,
                    $row->target_check_dams_value,
                    $row->achieved_check_dams_value,
                ]);
            }

            fclose($out);
        };

        return response()->stream($callback, 200, $headers);
    }
}
