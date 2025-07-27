<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCboTrainingRequest;
use App\Http\Requests\UpdateCboTrainingRequest;
use App\Models\Cbo; // Import the parent Cbo model
use App\Models\CboTraining; // Import the CboTraining model
use App\Services\CboService; // Import the CboService
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CboTrainingController extends Controller
{
    protected $cboService;

    public function __construct(CboService $cboService)
    {
        $this->cboService = $cboService;
    }

    /**
     * Display a listing of CBO Trainings for a specific CBO.
     * E.g., /cbo/cbos/{cbo}/trainings
     */
    public function index(Request $request, Cbo $cbo)
    {
        $trainings = $cbo->trainings()
            ->with('media') // Eager load attachments
            ->orderBy('date_of_training', 'desc')
            ->paginate(10);

        // Apply accessor for frontend attachments
        $trainings->getCollection()->transform(function ($training) {
            $training->attachments = $training->attachments_frontend;
            return $training;
        });

        return Inertia::render('CBO/Trainings/Index', [ // Assuming a dedicated index page
            'cbo' => $cbo->only('id', 'reference_code'),
            'trainings' => $trainings,
        ]);
    }

    /**
     * Show the form for creating a new CBO Training.
     */
    public function create()
    {
        // Not directly used if modal handles creation.
    }

    /**
     * Store a newly created CBO Training in storage.
     */
    public function store(StoreCboTrainingRequest $request, Cbo $cbo)
    {
        try {
            $this->cboService->createCboTraining($cbo, $request->validated());
            return redirect()->back()->with('success', 'CBO Training created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating CBO Training: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create CBO Training: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified CBO Training.
     */
    public function show(CboTraining $training)
    {
        $training->load('media'); // Ensure media is loaded
        $training->attachments = $training->attachments_frontend; // Apply accessor
        return response()->json($training); // Return as JSON for modal or API
    }

    /**
     * Show the form for editing the specified CBO Training.
     */
    public function edit(CboTraining $training)
    {
        // Not directly used if modal handles editing.
    }

    /**
     * Update the specified CBO Training in storage.
     */
    public function update(UpdateCboTrainingRequest $request, Cbo $cbo, CboTraining $training)
    {
        // Ensure the training belongs to the correct CBO
        if ($training->cbo_id !== $cbo->id) {
            return redirect()->back()->with('error', 'Training not found for this CBO.');
        }
        try {
            $this->cboService->updateCboTraining($training, $request->validated());
            return redirect()->back()->with('success', 'CBO Training updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating CBO Training: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update CBO Training: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified CBO Training from storage.
     */
    public function destroy(Cbo $cbo, CboTraining $training)
    {
        // Ensure the training belongs to the correct CBO before deleting
        if ($training->cbo_id !== $cbo->id) {
            return redirect()->back()->with('error', 'Training not found for this CBO.');
        }
        try {
            $this->cboService->deleteCboTraining($training);
            return redirect()->back()->with('success', 'CBO Training deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting CBO Training: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete CBO Training: ' . $e->getMessage());
        }
    }
}
