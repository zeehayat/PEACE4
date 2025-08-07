<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IrrigationCompletion;
use App\Services\IrrigationCompletionService;

class IrrigationCompletionController extends Controller
{
    protected IrrigationCompletionService $service;

    public function __construct(IrrigationCompletionService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = IrrigationCompletion::latest()->paginate(10);
        return inertia('IrrigationCompletions/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'irrigation_scheme_id' => [
                'required',
                'exists:irrigation_schemes,id',
                // Rule::unique('irrigation_completions', 'irrigation_scheme_id'), // Uncomment if only one completion record per scheme
            ],
            'scheme_handover_date' => ['nullable', 'date'], // Renamed column
            'remarks' => ['nullable', 'string'],
            // New fields from irrigation_schemes table
            'date_completion_civil_works' => ['nullable', 'date'],
            'handover_to_community_date' => ['nullable', 'date'],
            'attachments.*' => 'nullable|file|max:20480',
        ]);

        try {
            DB::transaction(function () use ($request, $validated) {
                $completion = new IrrigationCompletion();
                $completion->fill($validated);
                $completion->save();

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $completion->addMedia($file)->toMediaCollection('attachments');
                    }
                }
            });
            return redirect()->back()->with('success', 'Irrigation Completion created.');
        } catch (\Exception $e) {
            Log::error('Error creating Irrigation Completion: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create Irrigation Completion: ' . $e->getMessage());
        }
    }

    public function update(Request $request, IrrigationCompletion $irrigationCompletion)
    {
        $validated = $request->validate([
            'irrigation_scheme_id' => [
                'required',
                'exists:irrigation_schemes,id',
                // Rule::unique('irrigation_completions', 'irrigation_scheme_id')->ignore($irrigationCompletion->id), // Uncomment if only one completion record per scheme
            ],
            'scheme_handover_date' => ['nullable', 'date'],
            'remarks' => ['nullable', 'string'],
            // New fields from irrigation_schemes table
            'date_completion_civil_works' => ['nullable', 'date'],
            'handover_to_community_date' => ['nullable', 'date'],
            'attachments.*' => 'nullable|file|max:20480',
            'removed_attachments' => 'nullable|array',
            'removed_attachments.*' => 'exists:media,id',
        ]);

        try {
            DB::transaction(function () use ($request, $irrigationCompletion, $validated) {
                $irrigationCompletion->fill($validated);
                $irrigationCompletion->save();

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $irrigationCompletion->addMedia($file)->toMediaCollection('attachments');
                    }
                }
                if ($request->filled('removed_attachments')) {
                    Media::whereIn('id', $request->removed_attachments)
                        ->where('model_type', get_class($irrigationCompletion))
                        ->where('model_id', $irrigationCompletion->id)
                        ->delete();
                }
            });
            return redirect()->back()->with('success', 'Irrigation Completion updated.');
        } catch (\Exception $e) {
            Log::error('Error updating Irrigation Completion: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update Irrigation Completion: ' . $e->getMessage());
        }
    }

    public function destroy(IrrigationCompletion $irrigationCompletion)
    {
        try {
            $this->service->delete($irrigationCompletion);
            return redirect()->back()->with('success', 'Irrigation Completion deleted.');
        } catch (\Exception $e) {
            Log::error('Error deleting Irrigation Completion: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Irrigation Completion: ' . $e->getMessage());
        }
    }

    public function show(int $id)
    {
        $item = IrrigationCompletion::with('media')->findOrFail($id);
        return inertia('IrrigationCompletions/Show', compact('item'));
    }
}
