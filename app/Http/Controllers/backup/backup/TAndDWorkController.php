<?php

namespace App\Http\Controllers;

use App\Http\Requests\TAndDWorkRequest;
use App\Http\Requests\UpdateTAndDWorkRequest;
use App\Models\MhpSite; // Assuming T&D works are primarily associated with MHP Sites for now
use App\Models\TAndDWork;
use App\Services\MhpSiteService; // Import the service
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class TAndDWorkController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;


    }

    /**
     * Display a listing of T&D works for a specific MHP Site.
     * This typically would be called with a mhp_site_id in the route or request.
     * E.g., /mhp/sites/{mhpSite}/t-and-d-works
     */
    // Inside TAndDWorkController.php
    public function index(Request $request, MhpSite $mhpSite)
    {
        $query = $mhpSite->tAndDWorks()->with('media');

        // Add this conditional return for API calls from frontend forms
        if ($request->has('only-data')) {
            $tAndDWorks = $query->get(); // Get all relevant T&D works, not paginated for a select list

            // Apply accessor for frontend attachments
            $tAndDWorks->transform(function ($work) {
                $work->attachments = $work->attachments_frontend;
                return $work;
            });

            return response()->json([
                'tAndDWorks' => $tAndDWorks->map(fn($work) => [ // Map to simplified structure for select options
                    'id' => $work->id,
                    'name' => $work->name,
                    'label' => $work->name ?: "T&D Work #{$work->id}",
                ]),
                // You might also pass the original works array if needed elsewhere
                'fullTAndDWorks' => $tAndDWorks,
            ]);
        }

        // Original Inertia rendering for the T&D management page
        $tAndDWorks = $query->paginate(10);
        $tAndDWorks->getCollection()->transform(function ($work) {
            $work->attachments = $work->attachments_frontend;
            return $work;
        });

        return Inertia::render('MHP/TAndD/Index', [
            'mhpSite' => $mhpSite->only('id', 'project_id', 'name'),
            'tAndDWorks' => $tAndDWorks,
        ]);
    }

    /**
     * Show the form for creating a new T&D Work (usually in a modal).
     */
    public function create()
    {
        // This method might not be directly used if modal handles creation.
        // If dedicated page, return Inertia render.
    }

    /**
     * Store a newly created T&D Work in storage.
     */
    public function store(TAndDWorkRequest $request, MhpSite $site) // Laravel tries to bind $site here
    {
        Log::info('TAndDWorkController@store: Initial $site object from route binding:', ['id' => $site->id ?? 'null', 'exists' => $site->exists]);

        // If route model binding failed, $site might be an empty instance.
        // We need to ensure it's a valid, existing model before passing to service.
        if (!$site->exists && $request->has('projectable_id')) {
            $resolvedSite = MhpSite::find($request->input('projectable_id'));
            if ($resolvedSite) {
                $site = $resolvedSite; // Reassign $site to the found model
                Log::info('TAndDWorkController@store: $site resolved from request data fallback.', ['id' => $site->id]);
            } else {
                Log::error('TAndDWorkController@store: Parent MHP Site not found from request data.', ['projectable_id' => $request->input('projectable_id')]);
                return redirect()->back()->with('error', 'Parent MHP Site not found.');
            }
        } elseif (!$site->exists) {
            // This case means $site was not bound and projectable_id wasn't in request
            Log::error('TAndDWorkController@store: Parent MHP Site could not be resolved by any means.', ['route_param_site_id' => $site->id ?? 'null', 'request_data' => $request->all()]);
            return redirect()->back()->with('error', 'Parent MHP Site could not be resolved.');
        }

        // At this point, $site is guaranteed to be a valid MhpSite instance.
        try {
            $this->mhpSiteService->createTAndDWork($site, $request->validated());
            return redirect()->back()->with('success', 'T&D Work created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating T&D Work: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create T&D Work: ' . $e->getMessage());
        }
    }


    /**
     * Display the specified T&D Work.
     */
    public function show(TAndDWork $tAndDWork)
    {
        $tAndDWork->load('media'); // Ensure media is loaded
        $tAndDWork->attachments = $tAndDWork->attachments_frontend; // Apply accessor
        return response()->json($tAndDWork); // Return as JSON for modal or API, or render Inertia
    }

    /**
     * Show the form for editing the specified T&D Work.
     */
    public function edit(TAndDWork $tAndDWork)
    {
        // Not directly used if modal handles editing.
    }

    /**
     * Update the specified T&D Work in storage.
     */

    public function update(UpdateTAndDWorkRequest $request, MhpSite $site, TAndDWork $tAndDWork)
    {
        try {
            $this->mhpSiteService->updateTAndDWork($tAndDWork, $request->validated());
            return redirect()->back()->with('success', 'T&D Work updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating T&D Work: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update T&D Work: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified T&D Work from storage.
     */
    public function destroy(TAndDWork $tAndDWork)
    {
        try {
            $this->mhpSiteService->deleteTAndDWork($tAndDWork); // Use service delete method
            return redirect()->back()->with('success', 'T&D Work deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting T&D Work: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete T&D Work: ' . $e->getMessage());
        }
    }
}
