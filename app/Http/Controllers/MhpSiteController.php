<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\MhpSite;
use App\Http\Requests\MhpSiteRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MhpSiteController extends Controller
{
    public function index(Request $request)
    {
        $query = MhpSite::query()->with('cbo');

        if ($request->filled('cbo')) {
            $query->whereHas('cbo', fn ($q) =>
            $q->where('reference_code', 'like', "%{$request->cbo}%")
            );
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $mhpSites = $query->paginate(10)->withQueryString();

        return Inertia::render('MhpSite/Index', [
            'mhpSites' => $mhpSites,
            'filters' => $request->only('cbo', 'status'),
        ]);
    }

    public function autoSearch(Request $request)
    {
        $search = $request->input('search');

        $cbos = Cbo::query()
            ->when($search, fn ($q) =>
            $q->where('reference_code', 'like', "%{$search}%")
            )
            ->orderBy('reference_code')
            ->limit(20)
            ->get(['id', 'reference_code']); // fetch only necessary columns

        return response()->json($cbos);
    }

    public function create() {
        return Inertia::render('MhpSite/MhpSite');
    }

    public function store(Request $request) {


        $validated = $request->validate([
            'cbo_id' => 'required|exists:cbos,id',
            'population' => 'nullable|numeric',
            'grid_status' => 'required|string',
            'status' => 'required|string',
            'existing_capacity_kw' => 'nullable|numeric',
            'planned_capacity_kw' => 'nullable|numeric',
            'head_ft' => 'nullable|numeric',
            'design_discharge_cusecs' => 'nullable|numeric',
            'channel_length_km' => 'nullable|numeric',
            'tl_ht_km' => 'nullable|numeric',
            'tl_lt_km' => 'nullable|numeric',
            'transformers' => 'nullable|numeric',
            'turbine_type' => 'nullable|string',
            'alternator_type' => 'nullable|string',
            'accessible' => 'nullable|string',
            'domestic_units' => 'nullable|numeric',
            'commercial_units' => 'nullable|numeric',
            'estimated_cost' => 'nullable|numeric',
            'per_kw_cost' => 'nullable|numeric',
            'total_hh' => 'nullable|numeric',
            'avg_hh_size' => 'nullable|numeric',
            'cost_per_capita' => 'nullable|numeric',
            'tentative_completion_date'=>'required|date'

        ]);
        MhpSite::create($validated);
        return redirect()->route('mhp-sites.index')->with('success', 'MHP Site created!');
    }

}
