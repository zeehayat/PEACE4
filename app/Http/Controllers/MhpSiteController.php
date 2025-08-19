<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMhpSiteRequest;
use App\Http\Requests\UpdateMhpSiteRequest;
use App\Models\Cbo;
use App\Models\MhpSite;
use App\Services\MhpSiteService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\District;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

class MhpSiteController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;

        // This single line applies all policy checks for the resource controller.
        $this->authorizeResource(MhpSite::class, 'site');
    }

    /**
     * Display a listing of the MHP Sites.
     */
    public function index(Request $request)
    {
        $query = MhpSite::query()->forUser(Auth::user())
            ->with([
                'cbo',
                'media',
                'adminApproval.media',
                'latestPhysicalProgress',
                'latestFinancialInstallment',
                'completion',
                'emeInfo',
            ]);


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
                $q->orWhere('status', 'like', '%' . $searchTerm . '%')
                    ->orWhereHas('cbo', function ($cboQuery) use ($searchTerm) {
                        $cboQuery->where('reference_code', 'like', '%' . $searchTerm . '%')
                            ->orWhere('village', 'like', '%' . $searchTerm . '%')
                            ->orWhere('district', 'like', '%' . $searchTerm . '%');
                    });
            });
        }

        $mhpSites = $query->paginate(10)->withQueryString();

        return Inertia::render('MHP/Index', [
            'mhpSites' => $mhpSites,
            'filters' => $request->only('search'),
        ]);
    }


    public function store(StoreMhpSiteRequest $request)
    {
        try {
            $this->mhpSiteService->createMhpSite($request->validated());
            return redirect()->route('mhp.sites.index')->with('success', 'MHP Site created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create MHP Site: ' . $e->getMessage());
        }
    }

    public function show(MhpSite $site)
    {
        $site->load(['cbo', 'media', 'adminApproval.media', 'latestPhysicalProgress', 'latestFinancialInstallment', 'completion']);
        return response()->json(['site' => $site]);
    }

    public function update(UpdateMhpSiteRequest $request, MhpSite $site)
    {
        try {
            $this->mhpSiteService->updateMhpSite($site, $request->validated());
            return redirect()->route('mhp.sites.index')->with('success', 'MHP Site updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating MHP Site: ' . e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update MHP Site: ' . $e->getMessage());
        }
    }

    public function destroy(MhpSite $site)
    {
        try {
            $this->mhpSiteService->deleteMhpSite($site);
            return redirect()->route('mhp.sites.index')->with('success', 'MHP Site deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting MHP Site: ' . e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete MHP Site: ' . $e->getMessage());
        }
    }

    public function getSites(Request $request)
    {
        $this->authorize('viewAny', MhpSite::class);

        // 2. Scope the query using our new reusable scope.
        $query = MhpSite::query()->forUser(Auth::user());
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
    /**
     * Get CBOs for a searchable select input.
     * This is a utility function used by the frontend.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCbos(Request $request)
    {
        // Authorize: Ensure the user has permission to view CBOs.
        $this->authorize('viewAny', Cbo::class);

        // Use the Cbo model's own scope for consistency.
        $query = Cbo::query()->forUser(Auth::user());

        $search = $request->input('search');

        $cbos = $query
            ->when($search, function ($query) use ($search) {
                $query->where('reference_code', 'like', '%' . $search . '%')
                    ->orWhere('village', 'like', '%' . $search . '%')
                    ->orWhere('district', 'like', '%' . $search . '%')
                    ->orWhere('tehsil', 'like', '%' . $search . '%')
                    ->orWhere('village_council', 'like', '%' . $search . '%')
                    ->orWhere('president_name', 'like', '%' . $search . '%')
                    ->orWhere('secretary_name', 'like', '%' . $search . '%');
            })
            ->select('id', 'reference_code', 'district', 'tehsil', 'village_council', 'village')
            ->limit(10)
            ->get();

        return response()->json($cbos);
    }
}
