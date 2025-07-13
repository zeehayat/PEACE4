<?php

namespace App\Http\Controllers;

use App\Models\MhpAdminApproval;
use App\Http\Requests\MhpAdminApprovalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class MhpAdminApprovalController extends Controller
{
    public function store(MhpAdminApprovalRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                // Get ALL validated data. It will include 'attachments' and 'removed_attachments'
                $data = $request->validated();

                // Extract attachments and removed_attachments for separate handling
                $attachments = $data['attachments'] ?? [];
                $removedAttachments = $data['removed_attachments'] ?? [];

                // CRITICAL FIX: Filter $data to only include attributes that are fillable/database columns
                // You can get this list from your MhpAdminApproval model's $fillable property.
                $fillableData = $request->only([
                    'mhp_site_id',
                    'eu_approval_date',
                    'approved_cost',
                    'civil_work_start_date',
                    'scheme_inauguration_date',
                    'date_design_estimates_submission_psu',
                    'date_design_estimates_submission_opm_eu_review',
                    'date_validation_visit_opm',
                    // Add any other direct database columns from your MhpAdminApproval model here
                ]);

                $approval = MhpAdminApproval::create($fillableData); // <--- PASS FILTERED DATA

                // Handle new attachments
                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        if ($file instanceof \Illuminate\Http\UploadedFile) {
                            $approval->addMedia($file)->toMediaCollection('attachments');
                        } else {
                            Log::warning("Skipping invalid file in MhpAdminApproval store: " . (is_object($file) ? get_class($file) : gettype($file)));
                        }
                    }
                }
            });
            return redirect()->back()->with('success', 'MHP Admin Approval created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating MHP Admin Approval: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create MHP Admin Approval: ' . $e->getMessage());
        }
    }

    public function update(MhpAdminApprovalRequest $request, MhpAdminApproval $adminApproval)
    {
        try {
            DB::transaction(function () use ($request, $adminApproval) {
                $data = $request->validated();

                $attachments = $data['attachments'] ?? [];
                $removedAttachments = $data['removed_attachments'] ?? [];

                // CRITICAL FIX: Filter $data to only include attributes that are fillable/database columns
                $fillableData = $request->only([
                    'mhp_site_id',
                    'eu_approval_date',
                    'approved_cost',
                    'civil_work_start_date',
                    'scheme_inauguration_date',
                    'date_design_estimates_submission_psu',
                    'date_design_estimates_submission_opm_eu_review',
                    'date_validation_visit_opm',
                    // Add any other direct database columns here
                ]);

                $adminApproval->update($fillableData); // <--- PASS FILTERED DATA

                // Handle removed attachments
                if (!empty($removedAttachments)) {
                    Media::whereIn('id', $removedAttachments)
                        ->where('model_type', get_class($adminApproval))
                        ->where('model_id', $adminApproval->id)
                        ->delete();
                }

                // Handle new attachments
                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        if ($file instanceof \Illuminate\Http\UploadedFile) {
                            $adminApproval->addMedia($file)->toMediaCollection('attachments');
                        } else {
                            Log::warning("Skipping invalid file in MhpAdminApproval update: " . (is_object($file) ? get_class($file) : gettype($file)));
                        }
                    }
                }
            });
            return redirect()->back()->with('success', 'MHP Admin Approval updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating MHP Admin Approval: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update MHP Admin Approval: ' . $e->getMessage());
        }
    }
    public function updateRevisedCost($mhpSiteId, $field, Request $request)
    {
        $allowedFields = ['revised_cost_1', 'revised_cost_2', 'revised_cost_3'];

        if (!in_array($field, $allowedFields)) {
            abort(400, 'Invalid revised cost field.');
        }

        $request->validate([
            'value' => 'required|numeric|min:0',
        ]);

        $approval = MhpAdminApproval::where('mhp_site_id', $mhpSiteId)->first();

        if (!$approval) {
            return back()->withErrors(['msg' => 'Admin approval not found for this site.']);
        }

        $approval->$field = $request->input('value');
        $approval->save();

        return back()->with('success', ucfirst(str_replace('_', ' ', $field)) . ' updated successfully.');
    }



}
