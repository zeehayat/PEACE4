<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\District;
use App\Services\CboService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class CboReportController extends Controller
{
    public function index(Request $request)
    {
        $selectedDistrict = $request->input('district');

        // Fetch the list of all districts for the dropdown
        $districts = District::orderBy('name')->get();

        // Initialize the base query for CBOs
        $query = Cbo::query();

        // Apply filtering if a district is selected
        if ($selectedDistrict) {
            $query->where('district', $selectedDistrict);
        }

        // Load the necessary relationships for aggregation
        $query->withCount(['dialogues', 'exposureVisits', 'trainings']);

        $cbos = $query->get();

        // Aggregate data for the report
        $reportData = [
            'total_cbos_formed' => $cbos->count(),
            'total_members' => $cbos->sum('total_members'),
            'total_exposure_visits' => $cbos->sum('exposure_visits_count'),
            'total_om_training' => $cbos->sum('trainings_count'),
        ];

        return Inertia::render('CBO/Report', [
            'districts' => $districts,
            'reportData' => $reportData,
            'selectedDistrict' => $selectedDistrict,
        ]);
    }
}
