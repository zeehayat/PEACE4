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
        $query = $cbo->dialogues()->with('media');

        // Check if the request is for pure data (e.g., from a modal fetching list)
        if ($request->has('only-data')) {
            $dialogues = $query->orderBy('date_of_dialogue', 'desc')->get(); // Get all results, not paginated for options

            // Apply accessor for frontend attachments
            $dialogues->transform(function ($dialogue) {
                $dialogue->attachments = $dialogue->attachments_frontend;
                return $dialogue;
            });

            return response()->json([
                'dialogues' => $dialogues, // Return the raw collection data
            ]);
        }

        // Original Inertia rendering for the dedicated index page (if it exists)
        $dialogues = $query->orderBy('date_of_dialogue', 'desc')->paginate(10); // Paginate for full page view

        // Apply accessor for frontend attachments
        $dialogues->getCollection()->transform(function ($dialogue) {
            $dialogue->attachments = $dialogue->attachments_frontend;
            return $dialogue;
        });

        return Inertia::render('CBO/Dialogues/Index', [
            'cbo' => $cbo->only('id', 'reference_code'),
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
        Log::info('CboDialogueController@store: Request received.', ['cbo_id' => $cbo->id, 'request_data' => $request->validated()]);

        try {
            // The service method expects the Cbo instance
            $dialogue=$this->cboService->createCboDialogue($cbo, $request->validated());
            Log::info('CboDialogueController@store: Dialogue created via service.', ['dialogue_id' => $dialogue->id]);

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
