<?php

namespace App\Http\Controllers;

use App\Models\IrrigationCostRevision;
use App\Models\IrrigationAdminApproval;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class IrrigationCostRevisionController extends Controller
{
    /**
     * Display a listing of cost revisions for a specific admin approval.
     */
    public function index(Request $request, IrrigationAdminApproval $adminApproval)
    {
        $costRevisions = $adminApproval->costRevisions()
            ->with('media')
            ->orderBy('revision_number', 'asc')
            ->get();

        $costRevisions->transform(function ($revision) {
            $revision->attachments = $revision->attachments_frontend;
            return $revision;
        });

        return response()->json([
            'costRevisions' => $costRevisions,
        ]);
    }

    /**
     * Store a newly created cost revision in storage.
     */
    public function store(Request $request, IrrigationAdminApproval $adminApproval)
    {
        $validated = $request->validate([
            'revision_number' => ['required', 'integer', 'min:1'],
            'revised_cost' => ['required', 'numeric', 'min:0'],
            'approved_on' => ['required', 'date'],
            'remarks' => ['nullable', 'string'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:20480'],
        ]);

        $this->authorize('create', [IrrigationCostRevision::class, $adminApproval]);

        $revision = $adminApproval->costRevisions()->create($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $revision->addMedia($file)->toMediaCollection('attachments');
            }
        }

        return back()->with('success', 'Cost revision added successfully.');
    }

    /**
     * Display the specified cost revision.
     */
    public function show(IrrigationAdminApproval $adminApproval, IrrigationCostRevision $costRevision)
    {
        // Optional safety check to ensure the revision belongs to the correct approval
        if ($costRevision->approvable_type !== IrrigationAdminApproval::class || $costRevision->approvable_id !== $adminApproval->id) {
            abort(404, 'Cost revision does not belong to the specified admin approval.');
        }

        $costRevision->load('media');
        $costRevision->attachments = $costRevision->attachments_frontend;

        return response()->json($costRevision);
    }

    /**
     * Update the specified cost revision in storage.
     */
    public function update(Request $request, IrrigationAdminApproval $admin_approval, IrrigationCostRevision $cost_revision)
    {
        $validated = $request->validate([
            'revision_number' => ['required','integer','min:1'],
            'revised_cost'    => ['required','numeric','min:0'],
            'approved_on'     => ['nullable','date'],
            'remarks'         => ['nullable','string'],
            'attachments.*'   => ['file'],
            'attachments_to_delete' => ['array'],
        ]);

        $cost_revision->update($validated);

        // delete selected attachments
        foreach ($request->input('attachments_to_delete', []) as $mediaId) {
            optional($cost_revision->media()->find($mediaId))->delete();
        }

        // add new attachments
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $cost_revision->addMedia($file)->toMediaCollection('attachments');
            }
        }

        return back()->with('success', 'Cost revision updated successfully.');
    }


    /**
     * Remove the specified cost revision from storage.
     */
    public function destroy(IrrigationCostRevision $costRevision)
    {
        $this->authorize('delete', $costRevision);

        $costRevision->delete();

        return back()->with('success', 'Cost revision deleted successfully.');
    }
}
