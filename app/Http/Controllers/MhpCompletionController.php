<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMhpCompletionRequest;
use App\Http\Requests\UpdateMhpCompletionRequest;
use App\Models\MhpCompletion;
use App\Models\MhpSite;
use App\Services\MhpSiteService; // Import the service
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MhpCompletionController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;
    }

    /**
     * Display a listing of MHP Completions.
     * (Often handled via MhpSiteController@index with eager loading, or specific view)
     */
    public function index()
    {
        // Similar to MhpAdminApproval, this might not be directly used as a standalone list.
        // If it is, you would query MhpCompletion::with('mhpSite')->paginate();
        return response()->json(['message' => 'MHP Completions index.']);
    }

    /**
     * Store a newly created MHP Completion in storage.
     * Note: This acts as 'storeOrUpdate' from the service perspective for HasOne relationship.
     */
    public function store(StoreMhpCompletionRequest $request)
    {

        try {
            $mhpSite = MhpSite::findOrFail($request->mhp_site_id);
            $this->authorize('create', [MhpCompletion::class, $mhpSite]);
            $mhpSite = MhpSite::findOrFail($request->mhp_site_id);
            $this->mhpSiteService->storeOrUpdateMhpCompletion($mhpSite, $request->validated());
            return redirect()->back()->with('success', 'MHP Completion details saved successfully!');
        } catch (\Exception $e) {
            Log::error('Error saving MHP Completion: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to save MHP Completion details: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified MHP Completion.
     */
    public function show(MhpCompletion $completion)
    {
        $this->authorize('view', $completion);

        $completion->load('media'); // Ensure media is loaded for the view
        $completion->attachments = $completion->attachments_frontend; // Apply accessor
        return response()->json($completion); // Or Inertia::render if a dedicated view
    }

    /**
     * Update the specified MHP Completion in storage.
     */
    public function update(UpdateMhpCompletionRequest $request, MhpCompletion $completion)
    {
        try {
            $this->authorize('update', $completion);

            // Since storeOrUpdateMhpCompletion takes MhpSite, we need to get the parent site
            $mhpSite = $completion->mhpSite; // Assuming mhpSite relationship is defined in MhpCompletion model
            $this->mhpSiteService->storeOrUpdateMhpCompletion($mhpSite, $request->validated());
            return redirect()->back()->with('success', 'MHP Completion details updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating MHP Completion: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update MHP Completion details: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified MHP Completion from storage.
     */
    public function destroy(MhpCompletion $completion)
    {
        try {
            $this->authorize('delete', $completion);

            $completion->delete(); // Spatie media will be handled automatically if model uses InteractsWithMedia
            return redirect()->back()->with('success', 'MHP Completion deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting MHP Completion: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete MHP Completion: ' . $e->getMessage());
        }
    }
}
