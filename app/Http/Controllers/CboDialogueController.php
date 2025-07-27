<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCboDialogueRequest;
use App\Http\Requests\UpdateCboDialogueRequest;
use App\Models\Cbo; // Import the parent Cbo model
use App\Models\CboDialogue; // Import the CboDialogue model
use App\Services\CboService; // Import the CboService
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CboDialogueController extends Controller
{
    protected $cboService;

    public function __construct(CboService $cboService)
    {
        $this->cboService = $cboService;
    }

    /**
     * Display a listing of CBO Dialogues for a specific CBO.
     * E.g., /cbo/cbos/{cbo}/dialogues
     */
    public function index(Request $request, Cbo $cbo)
    {
        $dialogues = $cbo->dialogues()
            ->with('media') // Eager load attachments
            ->orderBy('date_of_dialogue', 'desc')
            ->paginate(10);

        // Apply accessor for frontend attachments
        $dialogues->getCollection()->transform(function ($dialogue) {
            $dialogue->attachments = $dialogue->attachments_frontend;
            return $dialogue;
        });

        return Inertia::render('CBO/Dialogues/Index', [ // Assuming a dedicated index page for dialogues
            'cbo' => $cbo->only('id', 'reference_code'), // Pass minimal parent CBO info
            'dialogues' => $dialogues,
        ]);
    }

    /**
     * Show the form for creating a new CBO Dialogue (usually in a modal).
     */
    public function create()
    {
        // Not directly used if modal handles creation.
    }

    /**
     * Store a newly created CBO Dialogue in storage.
     */
    public function store(StoreCboDialogueRequest $request, Cbo $cbo)
    {
        try {
            // The service method expects the Cbo instance
            $this->cboService->createCboDialogue($cbo, $request->validated());
            return redirect()->back()->with('success', 'CBO Dialogue created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating CBO Dialogue: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create CBO Dialogue: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified CBO Dialogue.
     */
    public function show(CboDialogue $dialogue)
    {
        $dialogue->load('media'); // Ensure media is loaded
        $dialogue->attachments = $dialogue->attachments_frontend; // Apply accessor
        return response()->json($dialogue); // Return as JSON for modal or API
    }

    /**
     * Show the form for editing the specified CBO Dialogue.
     */
    public function edit(CboDialogue $dialogue)
    {
        // Not directly used if modal handles editing.
    }

    /**
     * Update the specified CBO Dialogue in storage.
     */
    public function update(UpdateCboDialogueRequest $request, Cbo $cbo, CboDialogue $dialogue)
    {
        // Ensure the dialogue belongs to the correct CBO (implicit by route model binding)
        // You might add an explicit check here: if ($dialogue->cbo_id !== $cbo->id) abort(404);
        try {
            $this->cboService->updateCboDialogue($dialogue, $request->validated());
            return redirect()->back()->with('success', 'CBO Dialogue updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating CBO Dialogue: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update CBO Dialogue: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified CBO Dialogue from storage.
     */
    public function destroy(Cbo $cbo, CboDialogue $dialogue)
    {
        // Ensure the dialogue belongs to the correct CBO before deleting
        if ($dialogue->cbo_id !== $cbo->id) {
            return redirect()->back()->with('error', 'Dialogue not found for this CBO.');
        }
        try {
            $this->cboService->deleteCboDialogue($dialogue);
            return redirect()->back()->with('success', 'CBO Dialogue deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting CBO Dialogue: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete CBO Dialogue: ' . $e->getMessage());
        }
    }
}
