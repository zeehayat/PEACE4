<?php

namespace App\Http\Controllers;

use App\Models\Cro;
use App\Enums\KpDistrict;
use App\Traits\SimpleXlsxGenerator;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Collection;

class CroReportController extends Controller
{
    use SimpleXlsxGenerator;

    /**
     * Display the CRO Report page.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Cro::class);

        $districts = collect(KpDistrict::cases())->map(fn($d) => $d->getLabel())->values();

        $filters = $request->only('district', 'search');
        $rows = $this->buildDataset($request);

        return Inertia::render('Cro/CroReport', [
            'districts' => $districts,
            'filters' => $filters,
            'rows' => $rows,
        ]);
    }

    /**
     * Export the CRO Report to Excel.
     */
    public function export(Request $request)
    {
        $this->authorize('viewAny', Cro::class);

        $rows = $this->buildDataset($request);

        $headerRow = [
            'S. No',
            'District',
            'Tehsil',
            'VC/NC',
            'Village',
            'CRO Name',
            'President Name',
            'President Contact',
            'Secretary Name',
            'Secretary Contact',
            'Formation Date',
            'Gender',
            'Total Members',
            'CRO Members',
            'Community Dialogues',
            'Dialogue Date',
            'Dialogue Participants',
            'Exposure Visit Date',
            'Exposure Visit Participants',
            'O&M Training Date',
            'O&M Training Participants',
            'Electrical Training Date',
            'Electrical Training Participants',
            'Remarks'
        ];

        $dataRows = [];
        foreach ($rows as $index => $row) {
            $dataRows[] = [
                $index + 1,
                $row['district'],
                $row['tehsil'],
                $row['village_council'],
                $row['village'],
                $row['cro_name'],
                $row['president_name'],
                $row['president_contact'],
                $row['secretary_name'],
                $row['secretary_contact'],
                $row['date_of_cro_formation'],
                $row['gender'],
                $row['total_members'],
                $row['no_of_cro_members'],
                $row['no_of_community_dialogues'],
                $row['date_final_community_dialogue'],
                $row['dialogue_participants'],
                $row['date_exposure_visit'],
                $row['exposure_visit_participants'],
                $row['date_om_training'],
                $row['om_training_participants'],
                $row['date_electrical_training'],
                $row['electrical_training_participants'],
                $row['remarks'],
            ];
        }

        $xlsxBinary = $this->generateSimpleXlsx(array_merge([$headerRow], $dataRows));

        return response($xlsxBinary, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="cro_report_' . now()->format('Ymd_His') . '.xlsx"',
        ]);
    }

    /**
     * Build the dataset for the report.
     */
    private function buildDataset(Request $request): Collection
    {
        $query = Cro::query();

        // Apply Filters
        if ($request->filled('district')) {
            $query->where('district', $request->district);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                 $q->where('cro_name', 'like', "%{$search}%")
                   ->orWhere('village', 'like', "%{$search}%")
                   ->orWhere('president_name', 'like', "%{$search}%");
            });
        }

        $cros = $query->latest()->get();

        return $cros->map(function ($cro) {
            return [
                'id' => $cro->id,
                'district' => $cro->district,
                'tehsil' => $cro->tehsil,
                'village_council' => $cro->village_council,
                'village' => $cro->village,
                'cro_name' => $cro->cro_name,
                'president_name' => $cro->president_name,
                'president_contact' => $cro->president_contact,
                'secretary_name' => $cro->secretary_name,
                'secretary_contact' => $cro->secretary_contact,
                'date_of_cro_formation' => optional($cro->date_of_cro_formation)->format('d-M-Y'),
                'gender' => $cro->gender,
                'total_members' => $cro->total_members,
                'no_of_cro_members' => $cro->no_of_cro_members,
                'no_of_community_dialogues' => $cro->no_of_community_dialogues,
                'date_final_community_dialogue' => optional($cro->date_final_community_dialogue)->format('d-M-Y'),
                'dialogue_participants' => $cro->dialogue_participants,
                'date_exposure_visit' => optional($cro->date_exposure_visit)->format('d-M-Y'),
                'exposure_visit_participants' => $cro->exposure_visit_participants,
                'date_om_training' => optional($cro->date_om_training)->format('d-M-Y'),
                'om_training_participants' => $cro->om_training_participants,
                'date_electrical_training' => optional($cro->date_electrical_training)->format('d-M-Y'),
                'electrical_training_participants' => $cro->electrical_training_participants,
                'remarks' => $cro->remarks,
            ];
        });
    }
}
