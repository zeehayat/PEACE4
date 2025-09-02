<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectPhysicalProgressRequest;
use App\Http\Requests\UpdateProjectPhysicalProgressRequest;
use App\Models\MhpSite;
use App\Models\ProjectPhysicalProgress;
use App\Services\MhpSiteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
     */
    public function index(Request $request, MhpSite $site)
    {
        $query = $site->physicalProgresses()->with(['activity.media', 'media']);

        if ($request->has('payment_for')) {
            $query->where('payment_for', $request->input('payment_for'));
        }

        $allProgress = $query->orderBy('progress_date', 'desc')->get()->map(function ($item) {
            // Unify the data structure for the frontend
            return [
                'id' => $item->id, // Use the real ID for keys and actions
                'type' => $item->payment_for, // Use payment_for to distinguish type
                'date' => $item->progress_date,
                'percentage' => $item->progress_percentage,
                'remarks' => $item->remarks,
                'attachments' => $item->attachments_frontend,
                'original_model' => $item // Pass the original model for the edit form
            ];
        });

        // Handle JSON response for modals/AJAX calls
        if ($request->has('only-data')) {
            return response()->json([
                'physicalProgresses' => $allProgress,
            ]);
        }

        // Handle paginated response for full page loads
        $page = $request->input('page', 1);
        $perPage = 10;
        $paginatedProgress = new \Illuminate\Pagination\LengthAwarePaginator(
            $allProgress->forPage($page, $perPage),
            $allProgress->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return Inertia::render('MHP/Index', [
            'site' => $site->only('id', 'project_id', 'cbo.reference_code'),
            'physicalProgresses' => $paginatedProgress,
            'filters' => $request->only('payment_for'),
        ]);
    }

    /**
     * Store a newly created Project Physical Progress record in storage.
     */
    public function store(StoreProjectPhysicalProgressRequest $request, MhpSite $site)
    {
        try {
            $validatedData = $request->validated();
            $attachments = $validatedData['attachments'] ?? [];
            unset($validatedData['attachments']);

            $progress = $site->physicalProgresses()->create($validatedData);

            if (!empty($attachments)) {
                foreach ($attachments as $attachment) {
                    $progress->addMedia($attachment)->toMediaCollection('attachments');
                }
            }

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
        $physicalProgress->load(['activity', 'media']);
        $physicalProgress->attachments = $physicalProgress->attachments_frontend;
        if ($physicalProgress->activity_type === \App\Models\TAndDWork::class && $physicalProgress->activity) {
            $physicalProgress->activity->attachments = $physicalProgress->activity->attachments_frontend;
        }

        return response()->json($physicalProgress);
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
            $physicalProgress->delete();
            return redirect()->back()->with('success', 'Physical Progress deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Physical Progress: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Physical Progress: ' . $e->getMessage());
        }
    }
}
