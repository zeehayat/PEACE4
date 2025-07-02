<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    public function cboReport(Request $request)
    {
        $query = Cbo::query()->with(['dialogues', 'exposureVisits', 'trainings']);

        if ($request->filled('district')) {
            $query->where('district', $request->district);
        }

        if ($request->filled('gender')) {
            $query->where('gender', $request->gender);
        }

        if ($request->filled('reference_code')) {
            $query->where('reference_code', 'like', '%' . $request->reference_code . '%');
        }

        if ($request->filled('from') && $request->filled('to')) {
            $query->whereBetween('date_of_formation', [$request->from, $request->to]);
        }

        $cbos = $query->get();

        return Inertia::render('Reports/CboActivityReport', [
            'cbos' => $cbos,
            'filters' => $request->only(['district', 'gender', 'from', 'to', 'reference_code']),
        ]);
    }

    public function exportCboReport(Request $request)
    {
        $query = Cbo::query()->with(['dialogues', 'exposureVisits', 'trainings']);

        if ($request->filled('district')) {
            $query->where('district', $request->district);
        }

        if ($request->filled('gender')) {
            $query->where('gender', $request->gender);
        }

        if ($request->filled('reference_code')) {
            $query->where('reference_code', 'like', '%' . $request->reference_code . '%');
        }

        if ($request->filled('from') && $request->filled('to')) {
            $query->whereBetween('date_of_formation', [$request->from, $request->to]);
        }

        $cbos = $query->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="cbo_activity_report.csv"',
        ];

        $callback = function () use ($cbos) {
            $handle = fopen('php://output', 'w');

            // Headings
            fputcsv($handle, [
                'Reference Code', 'District', 'Gender', 'Date of Formation',
                'Dialogue Dates & Participants', 'Trainings (Type & Participants)',
                'Exposure Visits (Date & Participants)'
            ]);

            foreach ($cbos as $cbo) {
                fputcsv($handle, [
                    $cbo->reference_code,
                    $cbo->district,
                    $cbo->gender,
                    $cbo->date_of_formation,
                    $cbo->dialogues->map(fn($d) => "{$d->date_of_dialogue} ({$d->participants})")->join('; '),
                    $cbo->trainings->map(fn($t) => "{$t->training_type} ({$t->total_participants})")->join('; '),
                    $cbo->exposureVisits->map(fn($e) => "{$e->date_of_visit} ({$e->participants})")->join('; '),
                ]);
            }

            fclose($handle);
        };

        return new StreamedResponse($callback, 200, $headers);
    }

}
