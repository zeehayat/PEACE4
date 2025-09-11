<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCboRequest;
use App\Http\Requests\UpdateCboRequest;
use App\Models\Cbo;
use App\Services\CboService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth; // Import Auth facade
use App\Models\District; // Import District model for clarity in scoping

class CboController extends Controller
{
    protected $cboService;

    public function __construct(CboService $cboService)
    {
        $this->cboService = $cboService;
        // FIX: Apply policy middleware for CBO model
        $this->authorizeResource(Cbo::class, 'cbo');
    }

    /**
     * Display a listing of the CBOs.
     */
    public function index(Request $request)
    {

        $query = Cbo::query()->forUser(Auth::user())
            ->with(['media', 'dialogues.media', 'exposureVisits.media', 'trainings.media']);

        // Apply filters and search if present
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('reference_code', 'like', '%' . $searchTerm . '%')
                    ->orWhere('cbo_name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('region', 'like', '%' . $searchTerm . '%')
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

        $cbos = $query->paginate(10)->withQueryString();

        $cbos->getCollection()->transform(function ($cbo) {
            $cbo->dialogues_count = $cbo->dialogues->count();
            $cbo->trainings_count = $cbo->trainings->count();
            $cbo->exposure_visits_count = $cbo->exposureVisits->count();
            return $cbo;
        });

        return Inertia::render('CBO/Index', [
            'cbos' => $cbos,
            'filters' => $request->only('search', 'district'),
        ]);
    }

    /**
     * Store a newly created CBO in storage.
     */
    public function store(StoreCboRequest $request)
    {
        // Policy check is done by authorizeResource at the constructor level
        try {
            $this->cboService->createCbo($request->validated());
            return redirect()->route('cbo.cbos.index')->with('success', 'CBO created successfully!');
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
        dd('Hello World');
        // Policy check is done by authorizeResource at the constructor level
        $cbo->load(['media', 'dialogues.media', 'exposureVisits.media', 'trainings.media']);
        //return response()->json(['cbo' => $cbo]);
        return Inertia::render('CBO/Show', ['cbo' => $cbo]);

    }

    /**
     * Update the specified CBO in storage.
     */
    public function update(UpdateCboRequest $request, Cbo $cbo)
    {
        // Policy check is done by authorizeResource at the constructor level
        try {
            $this->cboService->updateCbo($cbo, $request->validated());
            return redirect()->route('cbo.cbos.index')->with('success', 'CBO updated successfully!');
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
        // Policy check is done by authorizeResource at the constructor level
        try {
            $this->cboService->deleteCbo($cbo);
            return redirect()->route('cbo.cbos.index')->with('success', 'CBO deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting CBO: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete CBO: ' . $e->getMessage());
        }
    }

    /**
     * Get CBOs for searchable select input.
     */
    public function getCbos(Request $request)
    {
        // For searchable selects, we also need to apply district scoping
        // 1. Authorize: Secure the endpoint.
        // This ensures only users with 'cbo_view' permission can access this.
        $this->authorize('viewAny', Cbo::class);

        $query = Cbo::query()->forUser(Auth::user());

        $search = $request->input('search');

        $cbos = $query
            ->when($search, function ($query) use ($search) {
                $query->where('reference_code', 'like', '%' . $search . '%')
                    ->orWhere('cbo_name', 'like', '%' . $search . '%')
                    ->orWhere('district', 'like', '%' . $search . '%')
                    ->orWhere('tehsil', 'like', '%' . $search . '%')
                    ->orWhere('village_council', 'like', '%' . $search . '%')
                    ->orWhere('village', 'like', '%' . $search . '%')
                    ->orWhere('president_name', 'like', '%' . $search . '%')
                    ->orWhere('secretary_name', 'like', '%' . $search . '%');
            })
            ->select('id', 'reference_code', 'cbo_name', 'region', 'district', 'tehsil', 'village_council', 'village')
            ->limit(10)
            ->get();

        return response()->json($cbos);
    }
}
