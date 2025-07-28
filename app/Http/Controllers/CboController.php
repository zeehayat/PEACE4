<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCboRequest;
use App\Http\Requests\UpdateCboRequest;
use App\Models\Cbo;
use App\Services\CboService; // Import the CboService
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CboController extends Controller
{
    protected $cboService;

    // Inject the CboService into the controller
    public function __construct(CboService $cboService)
    {
        $this->cboService = $cboService;
    }

    /**
     * Display a listing of the CBOs.
     */
    public function index(Request $request)
    {
        $query = Cbo::query()
            ->with([
                'media',
                'dialogues.media',
                'exposureVisits.media',
                'trainings.media',
            ]);

        // Apply filters and search if present
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('reference_code', 'like', '%' . $searchTerm . '%')
                    ->orWhere('village', 'like', '%' . $searchTerm . '%')
                    ->orWhere('district', 'like', '%' . $searchTerm . '%')
                    ->orWhere('tehsil', 'like', '%' . $searchTerm . '%')
                    ->orWhere('village_council', 'like', '%' . $searchTerm . '%')
                    ->orWhere('president_name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('secretary_name', 'like', '%' . $searchTerm . '%');
            });
        }

        if ($request->has('district')) {
            $query->where('district', $request->input('district'));
        }
        // Add more filters as needed (e.g., tehsil, village_council, gender)

        $cbos = $query->paginate(10)->withQueryString();

        Log::info('CboController@index: CBOs BEFORE transformation:', ['data' => $cbos->toArray()['data'] ?? []]); // Check raw data

        // Transform collection to add frontend-specific accessors
        $cbos->getCollection()->transform(function ($cbo) {
            // Log the CBO object *inside* the transform closure
            Log::info('CboController@index: Transforming CBO:', ['cbo_id' => $cbo->id, 'reference_code' => $cbo->reference_code]);

            if ($cbo->dialogues) {
                $cbo->dialogues->each(fn($d) => $d->attachments = $d->attachments_frontend);
            }
            if ($cbo->exposureVisits) {
                $cbo->exposureVisits->each(fn($ev) => $ev->attachments = $ev->attachments_frontend);
            }
            if ($cbo->trainings) {
                $cbo->trainings->each(fn($t) => $t->attachments = $t->attachments_frontend);
            }

            $cbo->dialogues_count = $cbo->dialogues->count();
            $cbo->trainings_count = $cbo->trainings->count();
            $cbo->exposure_visits_count = $cbo->exposureVisits->count();

            return $cbo;
        });

        Log::info('CboController@index: CBOs AFTER transformation:', ['data' => $cbos->toArray()['data'] ?? []]); // Check transformed data

        return Inertia::render('CBO/Index', [
            'cbos' => $cbos,
            'filters' => $request->only('search', 'district'),
        ]);
    }

    /**
     * Show the form for creating a new CBO.
     */
    public function create()
    {
        // Not used if modal handles creation. If dedicated page, return Inertia render.
        // return Inertia::render('CBO/Create');
    }

    /**
     * Store a newly created CBO in storage.
     */
    public function store(StoreCboRequest $request)
    {
        try {
            $this->cboService->createCbo($request->validated());
            return redirect()->back()->with('success', 'CBO created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating CBO: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create CBO: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified CBO.
     */
    public function show(Cbo $cbo)
    {
        // Load all necessary relationships for a detailed view
        $cbo->load([
            'media',
            'dialogues.media',
            'exposureVisits.media',
            'trainings.media',
        ]);

        // Apply attachments_frontend accessors to loaded relationships
        $cbo->attachments = $cbo->attachments_frontend;
        foreach ($cbo->dialogues as $dialogue) $dialogue->attachments = $dialogue->attachments_frontend;
        foreach ($cbo->exposureVisits as $visit) $visit->attachments = $visit->attachments_frontend;
        foreach ($cbo->trainings as $training) $training->attachments = $training->attachments_frontend;

        return Inertia::render('CBO/Show', [ // Assuming you might have a Show.vue page for CBO details
            'cbo' => $cbo,
        ]);
    }

    /**
     * Show the form for editing the specified CBO.
     */
    public function edit(Cbo $cbo)
    {
        // Not used if modal handles editing. If dedicated page, return Inertia render.
        // return Inertia::render('CBO/Edit', ['cbo' => $cbo]);
    }

    /**
     * Update the specified CBO in storage.
     */
    public function update(UpdateCboRequest $request, Cbo $cbo)
    {
        try {
            $this->cboService->updateCbo($cbo, $request->validated());
            return redirect()->back()->with('success', 'CBO updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating CBO: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update CBO: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified CBO from storage.
     */
    public function destroy(Cbo $cbo)
    {
        try {
            $this->cboService->deleteCbo($cbo);
            return redirect()->back()->with('success', 'CBO deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting CBO: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete CBO: ' . $e->getMessage());
        }
    }

    /**
     * Get CBOs for searchable select input (e.g., for MHP Site creation).
     * This is typically an API endpoint.
     */
    public function getCbos(Request $request)
    {
        $search = $request->input('search');

        $cbos = Cbo::query()
            ->when($search, function ($query) use ($search) { // Use $search in the closure
                $query->where('reference_code', 'like', '%' . $search . '%')
                    ->orWhere('village', 'like', '%' . $search . '%')
                    ->orWhere('district', 'like', '%' . $search . '%')
                    ->orWhere('tehsil', 'like', '%' . $search . '%') // FIX: Use $search here
                    ->orWhere('village_council', 'like', '%' . $search . '%'); // FIX: Use $search here
            })
            ->select('id', 'reference_code')
            ->limit(10)
            ->get();

        return response()->json($cbos);
    }
    public function autoSearch(Request $request)
    {
        $query = $request->input('search');
        $cbos = Cbo::where('reference_code', 'like', "%{$query}%")
            ->orWhere('district', 'like', "%{$query}%")
            ->limit(10)
            ->get(['id', 'reference_code']); // Ensure these fields are returned
        return response()->json($cbos);
    }
}


    // In CboController.php

