<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectPhysicalProgressRequest;
use App\Models\IrrigationScheme;
use App\Models\ProjectPhysicalProgress;
use App\Services\IrrigationSchemeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class IrrigationPhysicalProgressController extends Controller
{
    protected $irrigationSchemeService;

    public function __construct(IrrigationSchemeService $irrigationSchemeService)
    {
        $this->irrigationSchemeService = $irrigationSchemeService;
    }

    /**
     * Display a listing of physical progress entries for a specific Irrigation Scheme.
     */
    public function index(Request $request, IrrigationScheme $scheme)
    {
        $physicalProgresses = $this->irrigationSchemeService->getPhysicalProgresses($scheme);

        if ($request->wantsJson()) {
            return response()->json([
                'physicalProgresses' => $physicalProgresses->map(function ($p) {
                    return [
                        'id' => $p->id,
                        'progress_percentage' => (float) $p->progress_percentage,
                        'progress_date' => optional($p->progress_date)->toDateString(),
                        'payment_for' => $p->payment_for,
                        'remarks' => $p->remarks,
                        'attachments_frontend' => $p->attachments_frontend,
                    ];
                }),
            ]);
        }

        return Inertia::render('Irrigation/PhysicalProgress/Index', [
            'scheme' => $scheme->only('id', 'cbo'),
            'physicalProgresses' => $physicalProgresses,
        ]);
    }

    /**
     * Store a newly created Project Physical Progress record in storage.
     */
    public function store(StoreProjectPhysicalProgressRequest $request, IrrigationScheme $scheme)
    {
        try {
            $this->irrigationSchemeService->createPhysicalProgress($scheme, $request->validated());
            return redirect()->back()->with('success', 'Physical Progress added successfully!');
        } catch (\Exception $e) {
            Log::error('Error adding physical progress: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to add physical progress.');
        }
    }

    /**
     * Update the specified Project Physical Progress record in storage.
     */
    public function update(UpdateProjectPhysicalProgressRequest $request, IrrigationScheme $scheme, ProjectPhysicalProgress $physicalProgress)
    {
        try {
            $this->irrigationSchemeService->updatePhysicalProgress($physicalProgress, $request->validated());
            return redirect()->back()->with('success', 'Physical Progress updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating physical progress: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update physical progress.');
        }
    }

    /**
     * Remove the specified Project Physical Progress record from storage.
     */
    public function destroy(IrrigationScheme $scheme, ProjectPhysicalProgress $physicalProgress)
    {
        try {
            $this->irrigationSchemeService->deletePhysicalProgress($physicalProgress);
            return redirect()->back()->with('success', 'Physical Progress deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting physical progress: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete physical progress.');
        }
    }
}
