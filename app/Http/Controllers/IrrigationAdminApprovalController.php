<?php
namespace App\Http\Controllers;

use App\Models\IrrigationScheme;
use Illuminate\Http\Request;
use App\Models\IrrigationAdminApproval;
use App\Services\IrrigationAdminApprovalService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

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
            'approved_cost' => 'nullable|numeric|min:0',
            // Corrected and added fields from the form
            'approved_vendor' => 'nullable|string|max:255',
            'vendor_id' => 'nullable|integer|exists:vendors,id',
            'date_technical_surveys' => 'nullable|date',
            'date_design_estimates_submission_psu' => 'nullable|date',
            'date_validation_visit_psu' => 'nullable|date',
            'remarks' => 'nullable|string',
            'attachments.*' => 'nullable|file|max:20480',
        ]);

        $irrigationScheme = IrrigationScheme::findOrFail($validated['irrigation_scheme_id']);
        $this->authorize('create', [IrrigationAdminApproval::class, $irrigationScheme]);

        try {
            DB::transaction(function () use ($request, $validated) {
                // Use fillable attributes to mass assign data
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

    public function update(Request $request, IrrigationScheme $scheme, IrrigationAdminApproval $adminApproval)
    {
        // Add a check to ensure the model belongs to the parent
        if ($adminApproval->irrigation_scheme_id !== $scheme->id) {
            return redirect()->back()->with('error', 'Invalid admin approval for this scheme.');
        }

        $validated = $request->validate([
            'irrigation_scheme_id' => 'required|exists:irrigation_schemes,id',
            'approved_cost' => 'nullable|numeric|min:0',
            // Corrected and added fields from the form
            'approved_vendor' => 'nullable|string|max:255',
            'vendor_id' => 'nullable|integer|exists:vendors,id',
            'date_technical_surveys' => 'nullable|date',
            'date_design_estimates_submission_psu' => 'nullable|date',
            'date_validation_visit_psu' => 'nullable|date',
            'remarks' => 'nullable|string',
            'attachments.*' => 'nullable|file|max:20480',
            'attachments_to_delete' => 'nullable|array',
            'attachments_to_delete.*' => 'exists:media,id',
        ]);

        $this->authorize('update', $adminApproval);

        try {
            DB::transaction(function () use ($request, $adminApproval, $validated) {
                // Use the update method on the model instance
                $adminApproval->update($validated);

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $adminApproval->addMedia($file)->toMediaCollection('attachments');
                    }
                }
                if ($request->filled('attachments_to_delete')) {
                    Media::whereIn('id', $request->attachments_to_delete)
                        ->where('model_type', get_class($adminApproval))
                        ->where('model_id', $adminApproval->id)
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
        $this->authorize('delete', $irrigationAdminApproval);

        try {
            $this->service->delete($irrigationAdminApproval);
            return redirect()->back()->with('success', 'Irrigation Admin Approval deleted.');
        } catch (\Exception $e) {
            Log::error('Error deleting Irrigation Admin Approval: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Irrigation Admin Approval: ' . $e->getMessage());
        }
    }

    public function show(IrrigationAdminApproval $irrigationAdminApproval)
    {
        $this->authorize('view', $irrigationAdminApproval);
        $item = IrrigationAdminApproval::with('media')->findOrFail($irrigationAdminApproval);
        return inertia('Irrigation/Forms/IrrigationAdminApprovalForm', compact('item'));
    }
}
