<?php

namespace App\Http\Controllers;

use App\Http\Requests\CboExposureVisitRequest;
use App\Models\CboExposureVisit;
use App\Models\Cbo; // Ensure Cbo model is imported
use App\Services\CboExposureVisitService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB; // For transactions
use Illuminate\Support\Facades\Log; // For logging
use Spatie\MediaLibrary\MediaCollections\Models\Media; // For direct deletion

class CboExposureVisitController extends Controller
{
    public function __construct(protected CboExposureVisitService $service) {}

    public function index(Request $request)
    {
        // This index method might be used for a general list of all exposure visits
        // For the CBO-specific list, data comes via CboController@details
        $visits = CboExposureVisit::with('cbo', 'media')->latest()->paginate(10);
        return Inertia::render('CboExposureVisit/Index', [
            'visits' => $visits,
        ]);
    }

    // NEW: Show method to fetch a single Exposure Visit for editing
    public function show(CboExposureVisit $exposureVisit) // Route Model Binding
    {
        Log::info("CboExposureVisitController@show called for Exposure Visit ID: {$exposureVisit->id}");
        // Eager load the CBO relationship for display and media for attachments
        $exposureVisit->load('cbo', 'media');
        // The accessor will handle formatting 'media' into 'attachments'
        return response()->json($exposureVisit);
    }

    public function store(CboExposureVisitRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $request->validated();

                // CRITICAL FIX: Remove 'attachments' and 'removed_attachments' from $data
                // before passing to create. These are handled by Spatie Media Library.
                $attachments = $data['attachments'] ?? [];
                $removedAttachments = $data['removed_attachments'] ?? [];

                unset($data['attachments']);
                unset($data['removed_attachments']);

                $visit = $this->service->create($data); // This now only contains database columns

                // Handle new attachments
                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        // Ensure it's a valid File object (from frontend filter)
                        if ($file instanceof \Illuminate\Http\UploadedFile) { // Check for UploadedFile instance
                            $visit->addMedia($file)->toMediaCollection('attachments');
                        } else {
                            Log::warning("Skipping invalid file in store: " . (is_object($file) ? get_class($file) : gettype($file)));
                        }
                    }
                }
            });
            return redirect()->back()->with('success', 'Exposure Visit created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Exposure Visit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create Exposure Visit: ' . $e->getMessage());
        }
    }

    public function update(CboExposureVisitRequest $request, CboExposureVisit $exposureVisit)
    {
        try {
            DB::transaction(function () use ($request, $exposureVisit) {
                $data = $request->validated();

                // CRITICAL FIX: Extract attachments data before update
                $attachments = $data['attachments'] ?? [];
                $removedAttachments = $data['removed_attachments'] ?? [];

                unset($data['attachments']);
                unset($data['removed_attachments']);

                // Update the model with only the database columns
                $exposureVisit->update($data);

                // Handle removed attachments
                if (!empty($removedAttachments)) {
                    Media::whereIn('id', $removedAttachments)
                        ->where('model_type', get_class($exposureVisit))
                        ->where('model_id', $exposureVisit->id)
                        ->delete();
                }

                // Handle new attachments
                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        if ($file instanceof \Illuminate\Http\UploadedFile) {
                            $exposureVisit->addMedia($file)->toMediaCollection('attachments');
                        } else {
                            Log::warning("Skipping invalid file in update: " . (is_object($file) ? get_class($file) : gettype($file)));
                        }
                    }
                }
            });
            return redirect()->back()->with('success', 'Exposure Visit updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Exposure Visit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update Exposure Visit: ' . $e->getMessage());
        }
    }

    public function destroy(CboExposureVisit $exposureVisit)
    {
        Log::info("Attempting to delete Exposure Visit with ID: {$exposureVisit->id}");
        try {
            DB::transaction(function () use ($exposureVisit) {
                $exposureVisit->delete(); // Spatie Media Library handles media deletion
            });
            return redirect()->back()->with('success', 'Exposure Visit deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Exposure Visit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Exposure Visit: ' . $e->getMessage());
        }
    }
}
