<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectPhysicalProgressRequest;
use App\Http\Requests\UpdateProjectPhysicalProgressRequest;
use App\Models\MhpSite;
use App\Models\ProjectPhysicalProgress;
use App\Services\MhpSiteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

class MhpPhysicalProgressController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;

        // FIX: Use authorizeResource to automatically apply policy checks
        $this->authorizeResource(ProjectPhysicalProgress::class, 'physical_progress');
    }

    /**
     * Display a listing of physical progress records for a specific MHP site.
     */
    public function index(Request $request, MhpSite $site)
    {
        // The policy check for 'viewAny' is now automatically handled by authorizeResource.
        $query = $site->physicalProgresses()->with('media');

        if ($request->has('payment_for')) {
            $query->where('payment_for', $request->input('payment_for'));
        }

        if ($request->has('only-data')) {
            $progresses = $query->orderBy('progress_date', 'desc')->get();
            $progresses->transform(function ($progress) {
                $progress->attachments = $progress->attachments_frontend;
                return $progress;
            });

            return response()->json([
                'physicalProgresses' => $progresses,
            ]);
        }

        return redirect()->route('mhp.sites.index');
    }

    /**
     * Store a newly created physical progress record for an MHP site.
     */
    public function store(StoreProjectPhysicalProgressRequest $request, MhpSite $site)
    {
        // Policy check for 'create' is automatically handled by authorizeResource.
        try {
            $this->mhpSiteService->createPhysicalProgress($site, $request->validated());
            return redirect()->back()->with('success', 'Physical Progress recorded successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Physical Progress for MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to record Physical Progress: ' . $e->getMessage());
        }
    }

    /**
     * Update the specified physical progress record.
     */
    public function update(UpdateProjectPhysicalProgressRequest $request, MhpSite $site, ProjectPhysicalProgress $physicalProgress)
    {
        // Policy check for 'update' is automatically handled by authorizeResource.
        try {
            $this->mhpSiteService->updatePhysicalProgress($physicalProgress, $request->validated());
            return redirect()->back()->with('success', 'Physical Progress updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Physical Progress for MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update Physical Progress: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified physical progress record.
     */
    public function destroy(MhpSite $site, ProjectPhysicalProgress $physicalProgress)
    {
        // Policy check for 'delete' is automatically handled by authorizeResource.
        try {
            $physicalProgress->delete();
            return redirect()->back()->with('success', 'Physical Progress deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Physical Progress for MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Physical Progress: ' . $e->getMessage());
        }
    }
}
