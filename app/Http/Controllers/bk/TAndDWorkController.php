<?php

namespace App\Http\Controllers\bk;

use App\Http\Controllers\Controller;
use App\Http\Requests\bk\TAndDWorkRequest;
use App\Models\IrrigationScheme;
use App\Models\MhpSite;
use App\Models\TAndDWork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

// Needed for projectable type context
// Needed for projectable type context
// NEW: Import the TAndDWorkRequest
// If you plan to render Inertia pages from here
// For database transactions
// For logging errors
// For media handling

class TAndDWorkController extends Controller
{
    // Display a listing of T&D Works (e.g., all T&D works across all sites)
    public function index(Request $request)
    {
        $query = TAndDWork::query()->with(['projectable', 'media']); // Eager load projectable (MhpSite/IrrigationScheme) and media

        // Example filter: by projectable_id and type (if listing for a specific site)
        if ($request->filled('projectable_id') && $request->filled('projectable_type')) {
            $query->where('projectable_id', $request->projectable_id)
                ->where('projectable_type', $request->projectable_type);
        }

        $tAndDWorks = $query->latest()->paginate(10); // Paginate results

        return response()->json($tAndDWorks); // Or Inertia::render('TAndDWork/Index', ['tAndDWorks' => $tAndDWorks]);
    }

    // Store a newly created T&D Work in storage.
    public function store(TAndDWorkRequest $request) // Use the FormRequest for validation
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $request->validated();

                // Extract and remove attachments/removed_attachments from $data
                $attachments = $request->file('attachments') ?? [];
                $removedAttachments = $data['removed_attachments'] ?? [];

                unset($data['attachments']);
                unset($data['removed_attachments']);

                // Determine projectable model
                $projectableModel = null;
                if ($data['projectable_type'] === MhpSite::class) {
                    $projectableModel = MhpSite::findOrFail($data['projectable_id']);
                } elseif ($data['projectable_type'] === IrrigationScheme::class) {
                    $projectableModel = IrrigationScheme::findOrFail($data['projectable_id']);
                }

                if (!$projectableModel) {
                    throw new \Exception("Projectable model not found for type: {$data['projectable_type']} and ID: {$data['projectable_id']}");
                }

                // Create the T&D Work record using the polymorphic relationship
                $tAndDWork = $projectableModel->tAndDWorks()->create($data);

                // Handle new attachments
                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        if ($file instanceof \Illuminate\Http\UploadedFile) {
                            $tAndDWork->addMedia($file)->toMediaCollection('attachments');
                        } else {
                            Log::warning("Skipping invalid file in TAndDWork store: " . (is_object($file) ? get_class($file) : gettype($file)));
                        }
                    }
                }
            });
            return redirect()->back()->with('success', 'T&D Work created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating T&D Work: ' . $e->getMessage() . ' - File: ' . $e->getFile() . ' - Line: ' . $e->getLine());
            return redirect()->back()->with('error', 'Failed to create T&D Work: ' . $e->getMessage());
        }
    }

    // Display the specified T&D Work. (Used for fetching data for edit forms)
    public function show(TAndDWork $tAndDWork) // Route Model Binding will inject the model
    {
        $tAndDWork->load('projectable', 'media'); // Eager load projectable and media
        return response()->json($tAndDWork); // Returns JSON for frontend modals
    }

    // Update the specified T&D Work in storage.
    public function update(TAndDWorkRequest $request, TAndDWork $tAndDWork) // Use the FormRequest for validation
    {
        try {
            DB::transaction(function () use ($request, $tAndDWork) {
                $data = $request->validated();

                $attachments = $request->file('attachments') ?? [];
                $removedAttachments = $data['removed_attachments'] ?? [];

                unset($data['attachments']);
                unset($data['removed_attachments']);

                // Update the T&D Work record
                $tAndDWork->update($data);

                // Handle removed attachments
                if (!empty($removedAttachments)) {
                    Media::whereIn('id', $removedAttachments)
                        ->where('model_type', get_class($tAndDWork))
                        ->where('model_id', $tAndDWork->id)
                        ->delete();
                }

                // Handle new attachments
                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        if ($file instanceof \Illuminate\Http\UploadedFile) {
                            $tAndDWork->addMedia($file)->toMediaCollection('attachments');
                        }
                    }
                }
            });
            return redirect()->back()->with('success', 'T&D Work updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating T&D Work: ' . $e->getMessage() . ' - File: ' . $e->getFile() . ' - Line: ' . $e->getLine());
            return redirect()->back()->with('error', 'Failed to update T&D Work: ' . $e->getMessage());
        }
    }

    // Remove the specified T&D Work from storage.
    public function destroy(TAndDWork $tAndDWork) // Route Model Binding
    {
        Log::info("Attempting to delete T&D Work with ID: {$tAndDWork->id}");
        try {
            DB::transaction(function () use ($tAndDWork) {
                $tAndDWork->delete(); // Spatie Media Library handles media deletion
            });
            return redirect()->back()->with('success', 'T&D Work deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting T&D Work: ' . $e->getMessage() . ' - File: ' . $e->getFile() . ' - Line: ' . $e->getLine());
            return redirect()->back()->with('error', 'Failed to delete T&D Work: ' . $e->getMessage());
        }
    }
}
