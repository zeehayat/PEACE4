<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\District;
use App\Services\CboService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class CboReportController extends Controller
{
    public function index(Request $request)
    {
        // --- 1. Preparation: Filter Options ---

        // Fetch all possible districts for the filter dropdown
        $districts = District::orderBy('name')->pluck('name');

        // Fetch distinct tehsils from the Cbo model (only show options the user could filter by)
        $tehsils = Cbo::query()
            ->forUser(Auth::user())
            ->distinct()
            ->pluck('tehsil')
            ->filter() // Remove null/empty values
            ->sort()
            ->values();

        // --- 2. Core Query Setup (Scoping, Aggregation, Eager Loading) ---
        $query = Cbo::query()
            // 2a. Apply User Scoping (critical for ACL)
            ->forUser(Auth::user())

            // 2b. Add Activity Counts (dialogues_count, etc.)
            ->withCount(['dialogues', 'exposureVisits', 'trainings'])

            // 2c. Full Detail Eager Loading for drill-down/export preparation
            ->with([
                'dialogues.media', // Include media on dialogues
                'exposureVisits.media', // Include media on exposure visits
                'trainings.media', // Include media on trainings
            ]);

        // --- 3. Filter Implementation ---
        $query->when($request->filled('district'), function ($q) use ($request) {
            $q->where('district', $request->district);
        })
            ->when($request->filled('tehsil'), function ($q) use ($request) {
                $q->where('tehsil', $request->tehsil);
            })
            ->when($request->filled('village_council'), function ($q) use ($request) {
                $q->where('village_council', $request->village_council);
            })
            ->when($request->filled('cbo_name'), function ($q) use ($request) {
                $q->where('cbo_name', 'LIKE', '%' . $request->cbo_name . '%');
            })
            ->when($request->filled('date_from') && $request->filled('date_to'), function ($q) use ($request) {
                $q->whereBetween('date_of_formation', [$request->date_from, $request->date_to]);
            });

        // --- 4. Data Retrieval and Formatting ---

        // Paginate the results (e.g., 20 items per page)
        $reportData = $query->paginate(20)->withQueryString();

        // Use ->through() for transformation, ensuring full collections (including media) are included
        $reportData->through(function ($cbo) {
            // Apply frontend accessors for media if not automatically done (recommended practice)
            $cbo->attachments_frontend = $cbo->attachments_frontend;

            // Transform related collections to ensure media accessors are available if needed
            $cbo->dialogues->each(fn ($d) => $d->attachments_frontend = $d->attachments_frontend);
            $cbo->exposureVisits->each(fn ($e) => $e->attachments_frontend = $e->attachments_frontend);
            $cbo->trainings->each(fn ($t) => $t->attachments_frontend = $t->attachments_frontend);

            return $cbo;
        });

        // --- 5. Inertia Response ---
        return Inertia::render('CBO/CboReportIndex', [
            'reportData' => $reportData,
            'filters' => $request->only('district', 'tehsil', 'village_council', 'cbo_name', 'date_from', 'date_to'),
            'filterOptions' => [
                'districts' => $districts,
                'tehsils' => $tehsils,
            ],
        ]);
    }
    /**
     * Placeholder method for export logic (e.g., streaming Excel/CSV).
     * This would typically call a separate service/export class (like Maatwebsite/Laravel Excel)
     * using the same filtering logic as the index() method.
     */
    public function export(Request $request)
    {
        // In a real application, you would replicate the query logic from index() here,
        // but without pagination, and pipe the results to a downloadable Excel file.

        // 1. Build the base query, replicating the filtering logic from index() but without pagination
        $query = Cbo::query()
            ->forUser(Auth::user())
            ->withCount(['dialogues', 'exposureVisits', 'trainings'])
            ->with(['dialogues', 'trainings', 'exposureVisits']); // Eager load relations for full detail

        // Apply filters (must match the logic in the index method)
        $query->when($request->filled('district'), fn ($q) => $q->where('district', $request->district))
            ->when($request->filled('tehsil'), fn ($q) => $q->where('tehsil', $request->tehsil))
            ->when($request->filled('village_council'), fn ($q) => $q->where('village_council', $request->village_council))
            ->when($request->filled('cbo_name'), fn ($q) => $q->where('cbo_name', 'LIKE', '%' . $request->cbo_name . '%'))
            ->when($request->filled('date_from') && $request->filled('date_to'), fn ($q) => $q->whereBetween('date_of_formation', [$request->date_from, $request->date_to]));

        $cbos = $query->get();

        // 2. Define CSV Headers (MUST match the requested column headers)
        $headers = [
            'Reference Code',
            'District',
            'CBO NAME',
            'Gender',
            'Date of Formation',
            'NO of participants', // Sum of participants from all dialogues
            'Dialogue Dates', // All dialogue dates concatenated
            'NO OF DIALOGUES',
            'Trainings (Type )', // All training types concatenated
            'Trainings ( Participants)', // Sum of participants from all trainings
            'Exposure Visits (Date )', // All visit dates concatenated
            'Exposure Visits ( Participants)', // All visit participants concatenated
            'NO OF EXPOSURE VISITS',
        ];

        $callback = function() use ($cbos, $headers) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $headers);

            foreach ($cbos as $cbo) {

                // Aggregate Dialogue Data
                $dialogueDates = $cbo->dialogues->pluck('date_of_dialogue')->map(fn ($d) => Carbon::parse($d)->format('d-M-y'))->implode(' | ');
                $totalDialogueParticipants = $cbo->dialogues->sum('participants');

                // Aggregate Training Data
                $trainingTypes = $cbo->trainings->pluck('training_type')->implode(' | ');
                $totalTrainingParticipants = $cbo->trainings->sum('total_participants');

                // Aggregate Exposure Visit Data
                $visitDates = $cbo->exposureVisits->pluck('date_of_visit')->map(fn ($d) => Carbon::parse($d)->format('d-M-y'))->implode(' | ');
                $visitParticipants = $cbo->exposureVisits->pluck('participants')->implode(' | ');

                $row = [
                    $cbo->reference_code,
                    $cbo->district,
                    $cbo->cbo_name,
                    $cbo->gender,
                    Carbon::parse($cbo->date_of_formation)->format('d-M-y'),
                    $totalDialogueParticipants,
                    $dialogueDates,
                    $cbo->dialogues_count,
                    $trainingTypes,
                    $totalTrainingParticipants,
                    $visitDates,
                    $visitParticipants,
                    $cbo->exposure_visits_count,
                ];

                fputcsv($file, $row);
            }

            fclose($file);
        };

        // 3. Stream the CSV file
        $fileName = 'cbo_activity_report_' . Carbon::now()->format('Ymd_His') . '.csv';

        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ]);

    }
}
