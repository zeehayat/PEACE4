<?php

namespace App\Http\Controllers;

use App\Models\IrrigationCostRevision;
use App\Models\IrrigationScheme;
use Illuminate\Http\Request;

class IrrigationCostRevisionController extends Controller
{
    /**
     * Store a newly created cost revision in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'irrigation_scheme_id' => 'required|exists:irrigation_schemes,id',
            'revised_cost' => 'required|numeric|min:0',
            'revision_date' => 'required|date',
            'remarks' => 'nullable|string',
        ]);

        $irrigationScheme = IrrigationScheme::findOrFail($validated['irrigation_scheme_id']);
        $this->authorize('create', [IrrigationCostRevision::class, $irrigationScheme]);

        $irrigationScheme->costRevisions()->create($validated);

        return back()->with('success', 'Cost revision added successfully.');
    }

    /**
     * Update the specified cost revision in storage.
     */
    public function update(Request $request, IrrigationCostRevision $costRevision)
    {
        $this->authorize('update', $costRevision);

        $validated = $request->validate([
            'revised_cost' => 'required|numeric|min:0',
            'revision_date' => 'required|date',
            'remarks' => 'nullable|string',
        ]);

        $costRevision->update($validated);

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
