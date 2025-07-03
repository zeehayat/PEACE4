<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\MhpSite;
use App\Http\Requests\MhpSiteRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MhpSiteController extends Controller
{
    public function index() {
        $sites = MhpSite::with('cbo')->paginate();
        return Inertia::render('MhpSites/List', compact('sites'));
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
            'name' => 'required',
            'location' => 'required',
            'status' => 'required|in:New,Rehab,Upgradation',
        ]);
        MhpSite::create($validated);
        return redirect()->route('mhp-sites.index')->with('success', 'MHP Site created!');
    }

}
