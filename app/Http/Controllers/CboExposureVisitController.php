<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCboExposureVisitRequest;
use App\Http\Requests\UpdateCboExposureVisitRequest;
use App\Models\Cbo; // Import the parent Cbo model
use App\Models\CboExposureVisit; // Import the CboExposureVisit model
use App\Services\CboService; // Import the CboService
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CboExposureVisitController extends Controller
{
    protected $cboService;

    public function __construct(CboService $cboService)
    {
        $this->cboService = $cboService;
    }

    /**
     * Display a listing of CBO Exposure Visits for a specific CBO.
     * E.g., /cbo/cbos/{cbo}/exposure-visits
     */
    public function index(Request $request, Cbo $cbo)
    {
        $exposureVisits = $cbo->exposureVisits()
            ->with('media') // Eager load attachments
            ->orderBy('date_of_visit', 'desc')
            ->paginate(10);

        // Apply accessor for frontend attachments
        $exposureVisits->getCollection()->transform(function ($visit) {
            $visit->attachments = $visit->attachments_frontend;
            return $visit;
        });

        return Inertia::render('CBO/ExposureVisits/Index', [ // Assuming a dedicated index page
            'cbo' => $cbo->only('id', 'reference_code'),
            'exposureVisits' => $exposureVisits,
        ]);
    }

    /**
     * Show the form for creating a new CBO Exposure Visit.
     */
    public function create()
    {
        // Not directly used if modal handles creation.
    }

    /**
     * Store a newly created CBO Exposure Visit in storage.
     */
    public function store(StoreCboExposureVisitRequest $request, Cbo $cbo)
    {
        try {
            $this->cboService->createCboExposureVisit($cbo, $request->validated());
            return redirect()->back()->with('success', 'CBO Exposure Visit created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating CBO Exposure Visit: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create CBO Exposure Visit: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified CBO Exposure Visit.
     */
    public function show(CboExposureVisit $exposureVisit)
    {
        $exposureVisit->load('media'); // Ensure media is loaded
        $exposureVisit->attachments = $exposureVisit->attachments_frontend; // Apply accessor
        return response()->json($exposureVisit); // Return as JSON for modal or API
    }

    /**
     * Show the form for editing the specified CBO Exposure Visit.
     */
    public function edit(CboExposureVisit $exposureVisit)
    {
        // Not directly used if modal handles editing.
    }

    /**
     * Update the specified CBO Exposure Visit in storage.
     */
    public function update(UpdateCboExposureVisitRequest $request, Cbo $cbo, CboExposureVisit $exposureVisit)
    {
        // Ensure the visit belongs to the correct CBO
        if ($exposureVisit->cbo_id !== $cbo->id) {
            return redirect()->back()->with('error', 'Exposure Visit not found for this CBO.');
        }
        try {
            $this->cboService->updateCboExposureVisit($exposureVisit, $request->validated());
            return redirect()->back()->with('success', 'CBO Exposure Visit updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating CBO Exposure Visit: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update CBO Exposure Visit: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified CBO Exposure Visit from storage.
     */
    public function destroy(Cbo $cbo, CboExposureVisit $exposureVisit)
    {
        // Ensure the visit belongs to the correct CBO before deleting
        if ($exposureVisit->cbo_id !== $cbo->id) {
            return redirect()->back()->with('error', 'Exposure Visit not found for this CBO.');
        }
        try {
            $this->cboService->deleteCboExposureVisit($exposureVisit);
            return redirect()->back()->with('success', 'CBO Exposure Visit deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting CBO Exposure Visit: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete CBO Exposure Visit: ' . $e->getMessage());
        }
    }
}
