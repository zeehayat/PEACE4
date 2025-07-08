<?php

namespace App\Http\Controllers;

use App\Models\ProjectFinancialInstallment;
use App\Http\Requests\ProjectFinancialInstallmentRequest; // Assuming this request handles validation
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProjectFinancialInstallmentController extends Controller
{
    public function index(Request $request)
    {
        // This index method might need adjustment later based on how you want to list them
        // (e.g., by MHP site, by Irrigation scheme, or all together)
        $items = ProjectFinancialInstallment::latest()->paginate(10);
        return inertia('ProjectFinancialInstallment/Index', compact('items')); // Ensure this Inertia page exists or adjust
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'projectable_id' => 'required|numeric',
            'projectable_type' => 'required|string', // e.g., 'App\\Models\\MhpSite', 'App\\Models\\IrrigationScheme'
            'installment_number' => 'required|integer|min:1',
            'installment_date' => 'nullable|date',
            'installment_amount' => 'required|numeric|min:0',
            'category' => 'nullable|string', // e.g., 'general', 'eme', 'tnd'
            'remarks' => 'nullable|string',
            'attachments.*' => 'nullable|file|max:20480', // Max 20MB per file
        ]);

        try {
            DB::transaction(function () use ($request, $validated) {
                // Ensure the projectable model exists
                $projectableModel = app($validated['projectable_type'])->find($validated['projectable_id']);
                if (!$projectableModel) {
                    abort(404, 'Projectable model not found.');
                }

                $installment = $projectableModel->financialInstallments()->create([
                    'installment_number' => $validated['installment_number'],
                    'installment_date' => $validated['installment_date'],
                    'installment_amount' => $validated['installment_amount'],
                    'category' => $validated['category'] ?? 'general',
                    'remarks' => $validated['remarks'],
                ]);

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $installment->addMedia($file)->toMediaCollection('attachments');
                    }
                }
            });

            return redirect()->back()->with('success', 'Project Financial Installment created successfully.');
        } catch (\Exception $e) {
            \Log::error('Error creating Project Financial Installment: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create Project Financial Installment: ' . $e->getMessage());
        }
    }

    public function update(Request $request, ProjectFinancialInstallment $projectFinancialInstallment)
    {
        $validated = $request->validate([
            'installment_number' => 'required|integer|min:1',
            'installment_date' => 'nullable|date',
            'installment_amount' => 'required|numeric|min:0',
            'category' => 'nullable|string',
            'remarks' => 'nullable|string',
            'attachments.*' => 'nullable|file|max:20480',
            'removed_attachments' => 'nullable|array',
            'removed_attachments.*' => 'exists:media,id',
        ]);

        try {
            DB::transaction(function () use ($request, $projectFinancialInstallment, $validated) {
                $projectFinancialInstallment->update([
                    'installment_number' => $validated['installment_number'],
                    'installment_date' => $validated['installment_date'],
                    'installment_amount' => $validated['installment_amount'],
                    'category' => $validated['category'] ?? 'general',
                    'remarks' => $validated['remarks'],
                ]);

                // Handle new attachments
                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $projectFinancialInstallment->addMedia($file)->toMediaCollection('attachments');
                    }
                }

                // Handle removed attachments
                if ($request->filled('removed_attachments')) {
                    Media::whereIn('id', $request->removed_attachments)
                        ->where('model_type', get_class($projectFinancialInstallment))
                        ->where('model_id', $projectFinancialInstallment->id)
                        ->delete();
                }
            });

            return redirect()->back()->with('success', 'Project Financial Installment updated successfully.');
        } catch (\Exception $e) {
            \Log::error('Error updating Project Financial Installment: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update Project Financial Installment: ' . $e->getMessage());
        }
    }

    public function destroy(ProjectFinancialInstallment $projectFinancialInstallment)
    {
        try {
            $projectFinancialInstallment->delete();
            return redirect()->back()->with('success', 'ProjectFinancialInstallment deleted.');
        } catch (\Exception $e) {
            \Log::error('Error deleting Project Financial Installment: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Project Financial Installment: ' . $e->getMessage());
        }
    }

    public function show(int $id)
    {
        $item = ProjectFinancialInstallment::with('media')->find($id); // Eager load media
        if (!$item) {
            abort(404);
        }
        return inertia('ProjectFinancialInstallment/Show', compact('item'));
    }
}
