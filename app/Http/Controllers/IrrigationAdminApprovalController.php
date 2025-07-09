<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IrrigationAdminApproval;
use App\Services\IrrigationAdminApprovalService;
use Illuminate\Support\Facades\DB;


class IrrigationAdminApprovalController extends Controller
{
    protected IrrigationAdminApprovalService $service;

    public function __construct(IrrigationAdminApprovalService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = IrrigationAdminApproval::latest()->paginate(10);
        return inertia('IrrigationAdminApprovals/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'irrigation_scheme_id' => 'required|exists:irrigation_schemes,id',
            'eu_approval_date' => 'nullable|date',
            'approved_cost' => 'nullable|numeric|min:0',
            'civil_work_start_date' => 'nullable|date', // This field also seems to be from MHPAdminApproval. Re-evaluate if it's needed here.
            'scheme_inauguration_date' => 'nullable|date', // This field also seems to be from MHPAdminApproval. Re-evaluate if it's needed here.
            // New fields from migrations
            'date_design_estimates_submission_psu' => 'nullable|date',
            'date_design_estimates_submission_opm_eu_review' => 'nullable|date',
            'date_validation_visit_opm' => 'nullable|date',
            'attachments.*' => 'nullable|file|max:20480',
        ]);

        try {
            DB::transaction(function () use ($request, $validated) {
                $approval = new IrrigationAdminApproval();
                $approval->fill($validated);
                $approval->save();

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $approval->addMedia($file)->toMediaCollection('attachments');
                    }
                }
            });
            return redirect()->back()->with('success', 'Irrigation Admin Approval created.');
        } catch (\Exception $e) {
            Log::error('Error creating Irrigation Admin Approval: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create Irrigation Admin Approval: ' . $e->getMessage());
        }
    }

    public function update(Request $request, IrrigationAdminApproval $irrigationAdminApproval)
    {
        $validated = $request->validate([
            'irrigation_scheme_id' => 'required|exists:irrigation_schemes,id',
            'eu_approval_date' => 'nullable|date',
            'approved_cost' => 'nullable|numeric|min:0',
            'civil_work_start_date' => 'nullable|date', // Re-evaluate if needed here
            'scheme_inauguration_date' => 'nullable|date', // Re-evaluate if needed here
            // New fields from migrations
            'date_design_estimates_submission_psu' => 'nullable|date',
            'date_design_estimates_submission_opm_eu_review' => 'nullable|date',
            'date_validation_visit_opm' => 'nullable|date',
            'attachments.*' => 'nullable|file|max:20480',
            'removed_attachments' => 'nullable|array',
            'removed_attachments.*' => 'exists:media,id',
        ]);

        try {
            DB::transaction(function () use ($request, $irrigationAdminApproval, $validated) {
                $irrigationAdminApproval->fill($validated);
                $irrigationAdminApproval->save();

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $irrigationAdminApproval->addMedia($file)->toMediaCollection('attachments');
                    }
                }
                if ($request->filled('removed_attachments')) {
                    Media::whereIn('id', $request->removed_attachments)
                        ->where('model_type', get_class($irrigationAdminApproval))
                        ->where('model_id', $irrigationAdminApproval->id)
                        ->delete();
                }
            });
            return redirect()->back()->with('success', 'Irrigation Admin Approval updated.');
        } catch (\Exception $e) {
            Log::error('Error updating Irrigation Admin Approval: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update Irrigation Admin Approval: ' . $e->getMessage());
        }
    }

    public function destroy(IrrigationAdminApproval $irrigationAdminApproval)
    {
        try {
            $this->service->delete($irrigationAdminApproval);
            return redirect()->back()->with('success', 'Irrigation Admin Approval deleted.');
        } catch (\Exception $e) {
            Log::error('Error deleting Irrigation Admin Approval: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Irrigation Admin Approval: ' . $e->getMessage());
        }
    }

    public function show(int $id)
    {
        $item = IrrigationAdminApproval::with('media')->findOrFail($id);
        return inertia('IrrigationAdminApprovals/Show', compact('item'));
    }
}
