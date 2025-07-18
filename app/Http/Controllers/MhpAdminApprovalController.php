<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMhpAdminApprovalRequest;
use App\Http\Requests\UpdateMhpAdminApprovalRequest;
use App\Models\MhpAdminApproval;
use App\Models\MhpSite;
use App\Services\MhpSiteService; // Import the service
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MhpAdminApprovalController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;
    }

    /**
     * Display a listing of the MHP Admin Approvals.
     * (Often handled via MhpSiteController@index with eager loading, or specific view)
     */
    public function index()
    {
        // This method might not be directly used if approvals are viewed contextually with MHP sites.
        // If it's a standalone list, you'd query MhpAdminApproval::with('mhpSite')->paginate();
        // For now, assuming it's less common to list all approvals independently.
        return response()->json(['message' => 'Admin approvals index.']);
    }

    /**
     * Store a newly created MHP Admin Approval in storage.
     * Note: This acts as 'storeOrUpdate' from the service perspective.
     */
    public function store(StoreMhpAdminApprovalRequest $request)
    {
        try {
            $mhpSite = MhpSite::findOrFail($request->mhp_site_id);
            $this->mhpSiteService->storeOrUpdateAdminApproval($mhpSite, $request->validated());
            return redirect()->back()->with('success', 'MHP Admin Approval created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating MHP Admin Approval: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create MHP Admin Approval: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified MHP Admin Approval.
     */
    public function show(MhpAdminApproval $adminApproval)
    {
        $adminApproval->load('media'); // Ensure media is loaded for the view
        $adminApproval->attachments = $adminApproval->attachments_frontend; // Apply accessor
        return response()->json($adminApproval); // Or Inertia::render if a dedicated view
    }

    /**
     * Update the specified MHP Admin Approval in storage.
     */
    public function update(UpdateMhpAdminApprovalRequest $request, MhpAdminApproval $adminApproval)
    {
        try {
            // Since storeOrUpdateAdminApproval takes MhpSite, we need to get the parent site
            $mhpSite = $adminApproval->mhpSite; // Assuming mhpSite relationship is defined in MhpAdminApproval model
            $this->mhpSiteService->storeOrUpdateAdminApproval($mhpSite, $request->validated());
            return redirect()->back()->with('success', 'MHP Admin Approval updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating MHP Admin Approval: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update MHP Admin Approval: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified MHP Admin Approval from storage.
     * (Exercise caution with deleting related records; often better to mark as inactive or have soft deletes)
     */
    public function destroy(MhpAdminApproval $adminApproval)
    {
        try {
            $adminApproval->delete(); // Spatie media will be handled automatically if model uses InteractsWithMedia
            return redirect()->back()->with('success', 'MHP Admin Approval deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting MHP Admin Approval: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete MHP Admin Approval: ' . $e->getMessage());
        }
    }

    // This method was for updating a specific revised cost field.
    // It's now recommended to use the standard update method with the form,
    // but if you must keep it, here's how it would integrate with the service.
    // This assumes the frontend sends 'mhp_site_id' along with 'field' and 'value'.
    public function updateRevisedCost(Request $request)
    {
        $request->validate([
            'mhp_site_id' => ['required', 'exists:mhp_sites,id'],
            'field' => ['required', 'string', 'in:revised_cost_1,revised_cost_2,revised_cost_3'],
            'value' => ['nullable', 'numeric', 'min:0'],
        ]);

        try {
            $mhpSite = MhpSite::findOrFail($request->mhp_site_id);
            $updateData = [$request->field => $request->value];
            $this->mhpSiteService->storeOrUpdateAdminApproval($mhpSite, $updateData);

            return response()->json(['message' => 'Revised cost updated successfully.']);
        } catch (\Exception $e) {
            Log::error('Error updating specific revised cost: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['error' => 'Failed to update revised cost: ' . $e->getMessage()], 500);
        }
    }
}
