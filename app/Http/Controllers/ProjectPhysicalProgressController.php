<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectPhysicalProgressRequest;
use App\Http\Requests\UpdateProjectPhysicalProgressRequest;
use App\Models\MhpSite; // Assuming physical progress is primarily associated with MHP Sites
use App\Models\ProjectPhysicalProgress;
use App\Services\MhpSiteService; // Import the service
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProjectPhysicalProgressController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;
    }

    /**
     * Display a listing of physical progress entries for a specific MHP Site.
     * E.g., /mhp/sites/{mhpSite}/physical-progresses
     */
    public function index(Request $request, MhpSite $mhpSite)
    {
        $physicalProgresses = $mhpSite->physicalProgresses()
            ->with(['activity', 'media']) // Eager load activity details and media
            ->orderBy('progress_date', 'desc')
            ->paginate(10);

        // Apply accessor for frontend attachments and activity details if needed
        $physicalProgresses->getCollection()->transform(function ($progress) {
            $progress->attachments = $progress->attachments_frontend;
            // The 'activity' relation itself will be a TAndDWork model (or null)
            // You can add specific formatting for activity here if needed for the list view
            return $progress;
        });

        // If you're rendering an Inertia page to manage physical progress for a site
        return Inertia::render('MHP/PhysicalProgress/Index', [
            'mhpSite' => $mhpSite->only('id', 'project_id', 'name'), // Pass minimal site info
            'physicalProgresses' => $physicalProgresses,
        ]);
    }

    /**
     * Show the form for creating a new Physical Progress entry (usually in a modal).
     */
    public function create()
    {
        // Not directly used if modal handles creation.
    }

    /**
     * Store a newly created Project Physical Progress record in storage.
     * The `projectable_id` and `projectable_type` will be automatically set by the service.
     */
    public function store(StoreProjectPhysicalProgressRequest $request, MhpSite $mhpSite)
    {
        try {
            $this->mhpSiteService->createPhysicalProgress($mhpSite, $request->validated());
            return redirect()->back()->with('success', 'Physical Progress recorded successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Physical Progress: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to record Physical Progress: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified Project Physical Progress.
     */
    public function show(ProjectPhysicalProgress $physicalProgress)
    {
        $physicalProgress->load(['activity', 'media']); // Ensure activity details and media are loaded
        $physicalProgress->attachments = $physicalProgress->attachments_frontend; // Apply accessor
        // If it's a T&D activity, load its media too
        if ($physicalProgress->activity_type === \App\Models\TAndDWork::class && $physicalProgress->activity) {
            $physicalProgress->activity->attachments = $physicalProgress->activity->attachments_frontend;
        }

        return response()->json($physicalProgress); // Return as JSON for modal or API, or render Inertia
    }

    /**
     * Show the form for editing the specified Physical Progress.
     */
    public function edit(ProjectPhysicalProgress $physicalProgress)
    {
        // Not directly used if modal handles editing.
    }

    /**
     * Update the specified Project Physical Progress record in storage.
     */
    public function update(UpdateProjectPhysicalProgressRequest $request, ProjectPhysicalProgress $physicalProgress)
    {
        try {
            $this->mhpSiteService->updatePhysicalProgress($physicalProgress, $request->validated());
            return redirect()->back()->with('success', 'Physical Progress updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Physical Progress: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update Physical Progress: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified Project Physical Progress record from storage.
     */
    public function destroy(ProjectPhysicalProgress $physicalProgress)
    {
        try {
            $physicalProgress->delete(); // Spatie media will be handled automatically
            return redirect()->back()->with('success', 'Physical Progress deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Physical Progress: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Physical Progress: ' . $e->getMessage());
        }
    }
}
