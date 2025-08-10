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
    public function index(Request $request, MhpSite $site)
    {
        $query = $site->physicalProgresses()->with(['activity.media', 'media']);

        // FIX: Add filtering by 'payment_for' if requested
        if ($request->has('payment_for')) {
            $query->where('payment_for', $request->input('payment_for'));
            Log::info('ProjectPhysicalProgressController@index: Filtering by payment_for.', ['payment_for' => $request->input('payment_for')]);
        }

        // Check if the request is for pure data (e.g., from a modal fetching list)
        if ($request->has('only-data')) {
            Log::info('ProjectPhysicalProgressController@index: Request has only-data, returning JSON.');
            $progresses = $query->orderBy('progress_date', 'desc')->get();

            $progresses->transform(function ($progress) {
                $progress->attachments = $progress->attachments_frontend;
                // Ensure activity media is also transformed if needed for display
                if ($progress->activity) {
                    $progress->activity->attachments = $progress->activity->attachments_frontend;
                }
                return $progress;
            });

            return response()->json([
                'physicalProgresses' => $progresses, // Return the raw collection data
            ]);
        }

        // If 'only-data' is NOT present, then render the full Inertia page.
        Log::info('ProjectPhysicalProgressController@index: Request does NOT have only-data, rendering Inertia page.');
        $physicalProgresses = $query->orderBy('progress_date', 'desc')->paginate(10);

        $physicalProgresses->getCollection()->transform(function ($progress) {
            $progress->attachments = $progress->attachments_frontend;
            if ($progress->activity) {
                $progress->activity->attachments = $progress->activity->attachments_frontend;
            }
            return $progress;
        });

        return Inertia::render('MHP/Index', [ // Assuming a dedicated index page
            'site' => $site->only('id', 'project_id', 'cbo.reference_code'),
            'physicalProgresses' => $physicalProgresses,
            'filters' => $request->only('payment_for'),
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
