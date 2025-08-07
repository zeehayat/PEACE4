<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMhpSiteRequest;
use App\Http\Requests\UpdateMhpSiteRequest;
use App\Models\MhpSite;
use App\Services\MhpSiteService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\District;
use Illuminate\Routing\Controller; // Ensure this is imported

class MhpSiteController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;
        // We will apply permission middleware on the routes directly instead of using authorizeResource.
    }

    /**
     * Display a listing of the MHP Sites.
     */
    public function index(Request $request)
    {
        $query = MhpSite::query()
            ->with(['cbo', 'media', 'adminApproval.media',                 'latestPhysicalProgress'
                , 'latest_financial_installment', 'completion']);

        $user = Auth::user();
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            $query->whereHas('cbo', function ($q) use ($user) {
                $q->where('district', $user->district->name);
            });
            Log::info('MhpSiteController@index: Scoping MHP Sites by user district.', ['user_id' => $user->id, 'district' => $user->district->name]);
        }

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('project_id', 'like', '%' . $searchTerm . '%')
                    ->orWhere('status', 'like', '%' . $searchTerm . '%')
                    ->orWhereHas('cbo', function ($cboQuery) use ($searchTerm) {
                        $cboQuery->where('reference_code', 'like', '%' . $searchTerm . '%')
                            ->orWhere('village', 'like', '%' . $searchTerm . '%')
                            ->orWhere('district', 'like', '%' . $searchTerm . '%');
                    });
            });
        }

        $mhpSites = $query->paginate(10)->withQueryString();

        return Inertia::render('MHP/Index', ['mhpSites' => $mhpSites, 'filters' => $request->only('search')]);
    }

    /**
     * Store a newly created MHP Site in storage.
     */
    public function store(StoreMhpSiteRequest $request)
    {
        // Permission check is now handled by route middleware
        try {
            $this->mhpSiteService->createMhpSite($request->validated());
            return redirect()->route('mhp.sites.index')->with('success', 'MHP Site created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create MHP Site: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified MHP Site.
     */
    public function show(MhpSite $site)
    {
        // Permission check is now handled by route middleware
        $site->load(['cbo', 'media', 'adminApproval.media', 'latest_physical_progress', 'latest_financial_installment', 'completion']);
        return response()->json(['site' => $site]);
    }

    /**
     * Update the specified MHP Site in storage.
     */
    public function update(UpdateMhpSiteRequest $request, MhpSite $site)
    {
        // Permission check is now handled by route middleware
        try {
            $this->mhpSiteService->updateMhpSite($site, $request->validated());
            return redirect()->route('mhp.sites.index')->with('success', 'MHP Site updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update MHP Site: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified MHP Site from storage.
     */
    public function destroy(MhpSite $site)
    {
        // Permission check is now handled by route middleware
        try {
            $this->mhpSiteService->deleteMhpSite($site);
            return redirect()->route('mhp.sites.index')->with('success', 'MHP Site deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete MHP Site: ' . $e->getMessage());
        }
    }

    /**
     * Get MHP sites for a searchable select input.
     */
    public function getSites(Request $request)
    {
        $query = MhpSite::query();
        $user = Auth::user();
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            $query->whereHas('cbo', function ($q) use ($user) {
                $q->where('district', $user->district->name);
            });
        }

        $search = $request->input('search');

        $sites = $query
            ->when($search, function ($query) use ($search) {
                $query->where('project_id', 'like', '%' . $search . '%')
                    ->orWhereHas('cbo', function ($cboQuery) use ($search) {
                        $cboQuery->where('reference_code', 'like', '%' . $search . '%');
                    });
            })
            ->select('id', 'project_id')
            ->with('cbo:id,reference_code')
            ->limit(10)
            ->get();

        return response()->json($sites);
    }
}
