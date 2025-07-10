<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectPhysicalProgress;
use App\Services\ProjectPhysicalProgressService; // Assuming this service exists
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\Models\Media; // Import Media model

class ProjectPhysicalProgressController extends Controller
{
    protected ProjectPhysicalProgressService $service;

    public function __construct(ProjectPhysicalProgressService $service)
    {
        $this->service = $service;
    }

    public function index()
    {

        // This index method might need adjustment later based on how you want to list them
        // (e.g., by MHP site, by Irrigation scheme, or all together)

        $items = ProjectPhysicalProgress::latest()->paginate(10);
        return inertia('ProjectPhysicalProgresss/Index', compact('items')); // Ensure this Inertia page exists or adjust
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'projectable_id' => 'required|numeric',
            'projectable_type' => 'required|string',
            'progress_percentage' => 'required|integer|min:0|max:100',
            'progress_date' => 'nullable|date',
            'remarks' => 'nullable|string',
            'project_type' => 'required|in:MHP,IRRIGATION',
            'reference_code' => 'nullable|string|max:255',
            'attachments.*' => 'nullable|file|max:20480',
        ]);

        try {
            DB::transaction(function () use ($request, $validated) {
                $projectableModel = app($validated['projectable_type'])->find($validated['projectable_id']);
                if (!$projectableModel) {
                    abort(404, 'Projectable model not found.');
                }

                // Explicitly create a new instance and assign attributes
                $progress = new ProjectPhysicalProgress();
                $progress->projectable_id = $validated['projectable_id'];
                $progress->projectable_type = $validated['projectable_type'];
                $progress->progress_percentage = (int)$validated['progress_percentage']; // Explicitly cast to integer
                $progress->progress_date = $validated['progress_date'];
                $progress->remarks = $validated['remarks'];
                $progress->project_type = $validated['project_type'];
                $progress->reference_code = $validated['reference_code'];
                $progress->save(); // Save the model instance

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $progress->addMedia($file)->toMediaCollection('attachments');
                    }
                }
            });

            return redirect()->back()->with('success', 'Project Physical Progress created successfully.');
        } catch (\Exception $e) {
            \Log::error('Error creating Project Physical Progress: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create Project Physical Progress: ' . $e->getMessage());
        }
    }

    public function update(Request $request, ProjectPhysicalProgress $projectPhysicalProgress)
    {
        $validated = $request->validate([
            'progress_percentage' => 'required|integer|min:0|max:100',
            'progress_date' => 'nullable|date',
            'remarks' => 'nullable|string',
            'project_type' => 'required|in:MHP,Irrigation',
            'reference_code' => 'nullable|string|max:255',
            'attachments.*' => 'nullable|file|max:20480',
            'removed_attachments' => 'nullable|array',
            'removed_attachments.*' => 'exists:media,id',
        ]);

        try {
            DB::transaction(function () use ($request, $projectPhysicalProgress, $validated) {
                // Explicitly update attributes
                $projectPhysicalProgress->progress_percentage = (int)$validated['progress_percentage'];
                $projectPhysicalProgress->progress_date = $validated['progress_date'];
                $projectPhysicalProgress->remarks = $validated['remarks'];
                $projectPhysicalProgress->project_type = $validated['project_type'];
                $projectPhysicalProgress->reference_code = $validated['reference_code'];
                $projectPhysicalProgress->save(); // Save the updated model instance

                // Handle new attachments
                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $projectPhysicalProgress->addMedia($file)->toMediaCollection('attachments');
                    }
                }

                // Handle removed attachments
                if ($request->filled('removed_attachments')) {
                    Media::whereIn('id', $request->removed_attachments)
                        ->where('model_type', get_class($projectPhysicalProgress))
                        ->where('model_id', $projectPhysicalProgress->id)
                        ->delete();
                }
            });

            return redirect()->back()->with('success', 'Project Physical Progress updated successfully.');
        } catch (\Exception $e) {
            \Log::error('Error updating Project Physical Progress: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update Project Physical Progress: ' . $e->getMessage());
        }
    }

    public function destroy(ProjectPhysicalProgress $projectPhysicalProgress)
    {
        try {
            $this->service->delete($projectPhysicalProgress);
            return redirect()->back()->with('success', 'ProjectPhysicalProgress deleted.');
        } catch (\Exception $e) {
            \Log::error('Error deleting Project Physical Progress: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Project Physical Progress: ' . $e->getMessage());
        }
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        if (!$item) {
            abort(404);
        }
        return inertia('ProjectPhysicalProgresss/Show', compact('item'));
    }
}
