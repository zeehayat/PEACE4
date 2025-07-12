<?php

namespace App\Http\Controllers;

use App\Http\Requests\CboExposureVisitRequest;
use App\Models\CboExposureVisit;
use App\Services\CboExposureVisitService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB; // Import DB for transactions
use Illuminate\Support\Facades\Log; // Import Log for error logging
use Spatie\MediaLibrary\MediaCollections\Models\Media; // Import Media model for direct deletion

class CboExposureVisitController extends Controller
{
    public function __construct(protected CboExposureVisitService $service) {}

    public function index(Request $request)
    {
        $visits = CboExposureVisit::with('cbo', 'media')->latest()->paginate(10000);

        return Inertia::render('CboExposureVisit/Index', [
            'visits' => $visits,
        ]);
    }

    public function create()
    {
        return Inertia::render('CboExposureVisit/Create', [
            'cbos' => \App\Models\Cbo::all(['id', 'reference_code']),
        ]);
    }

    public function store(CboExposureVisitRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $request->validated();
                $visit = $this->service->create($data); // Assuming service handles basic model creation

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $visit->addMedia($file)->toMediaCollection('attachments');
                    }
                }
            });
            return redirect()->route('cbo.exposure-visits.index')->with('success', 'Visit created.');
        } catch (\Exception $e) {
            Log::error('Error creating Exposure Visit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create Exposure Visit: ' . $e->getMessage());
        }
    }

    public function edit(CboExposureVisit $exposureVisit)
    {
        $exposureVisit->load('media'); // Ensure media is loaded for attachments in edit form

        return Inertia::render('CboExposureVisit/Edit', [
            'visit' => $exposureVisit, // Pass the loaded model directly
            'cbos' => \App\Models\Cbo::all(['id', 'reference_code']),
        ]);
    }

    public function update(CboExposureVisitRequest $request, CboExposureVisit $exposureVisit)
    {
        try {
            DB::transaction(function () use ($request, $exposureVisit) {
                $data = $request->validated();
                $this->service->update($exposureVisit, $data); // Assuming service handles basic model update

                // Handle removed attachments
                if ($request->filled('removed_attachments')) {
                    Media::whereIn('id', $request->removed_attachments)
                        ->where('model_type', get_class($exposureVisit))
                        ->where('model_id', $exposureVisit->id)
                        ->delete();
                }

                // Handle new attachments
                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $exposureVisit->addMedia($file)->toMediaCollection('attachments');
                    }
                }
            });
            return redirect()->route('cbo.exposure-visits.index')->with('success', 'Visit updated.');
        } catch (\Exception $e) {
            Log::error('Error updating Exposure Visit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update Exposure Visit: ' . $e->getMessage());
        }
    }

    // Destroy Method for CboExposureVisit
    public function destroy(CboExposureVisit $exposureVisit)
    {
        try {
            DB::transaction(function () use ($exposureVisit) {
                // Spatie Media Library automatically handles media deletion upon model deletion.
                // Assuming your CboExposureVisitService->delete() method ultimately calls $exposureVisit->delete()
                $this->service->delete($exposureVisit);
            });
            return redirect()->back()->with('success', 'Visit deleted.');
        } catch (\Exception $e) {
            Log::error('Error deleting Exposure Visit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Exposure Visit: ' . $e->getMessage());
        }
    }
}
