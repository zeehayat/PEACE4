<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLrmCommitteeRequest;
use App\Http\Requests\UpdateLrmCommitteeRequest;
use App\Models\LrmCommittee;
use App\Models\Cbo; // Assuming LRM Committees are linked to CBOs
use App\Services\LrmService; // Import the LrmService
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class LrmCommitteeController extends Controller
{
    protected $lrmService;

    // Inject the LrmService into the controller
    public function __construct(LrmService $lrmService)
    {
        $this->lrmService = $lrmService;
    }

    /**
     * Display a listing of the LRM Committees.
     */
    public function index(Request $request)
    {
        $query = LrmCommittee::query()
            ->with(['cbo', 'media']); // Eager load CBO and LRM Committee's own media

        // Apply filters and search if present
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('remarks', 'like', '%' . $searchTerm . '%')
                    ->orWhereHas('cbo', function ($cboQuery) use ($searchTerm) {
                        $cboQuery->where('reference_code', 'like', '%' . $searchTerm . '%');
                    });
            });
        }

        if ($request->has('cbo_id')) {
            $query->where('cbo_id', $request->input('cbo_id'));
        }
        // Add more filters as needed (e.g., date ranges, specific plant types)

        $lrmCommittees = $query->paginate(10)->withQueryString(); // Paginate results

        // Transform collection to add frontend-specific accessors
        $lrmCommittees->getCollection()->transform(function ($lrmCommittee) {
            // attachments_frontend is already appended via $appends in the model
            return $lrmCommittee;
        });

        return Inertia::render('LRM/Index', [
            'lrmCommittees' => $lrmCommittees,
            'filters' => $request->only('search', 'cbo_id'), // Pass filters back to frontend
        ]);
    }

    /**
     * Store a newly created LRM Committee in storage.
     */
    public function store(StoreLrmCommitteeRequest $request)
    {
        try {
            $this->lrmService->createLrmCommittee($request->validated());
            return redirect()->route('lrm.committees.index')->with('success', 'LRM Committee created successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating LRM Committee: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to create LRM Committee: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified LRM Committee.
     */
    public function show(LrmCommittee $lrmCommittee)
    {
        $lrmCommittee->load(['cbo', 'media']); // Ensure CBO and media are loaded
        return response()->json($lrmCommittee); // Return as JSON for modal or API
    }

    /**
     * Update the specified LRM Committee in storage.
     */
    public function update(UpdateLrmCommitteeRequest $request, LrmCommittee $lrmCommittee)
    {
        try {
            $this->lrmService->updateLrmCommittee($lrmCommittee, $request->validated());
            return redirect()->back()->with('success', 'LRM Committee updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating LRM Committee: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update LRM Committee: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified LRM Committee from storage.
     */
    public function destroy(LrmCommittee $lrmCommittee)
    {
        try {
            $this->lrmService->deleteLrmCommittee($lrmCommittee);
            return redirect()->back()->with('success', 'LRM Committee deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting LRM Committee: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete LRM Committee: ' . $e->getMessage());
        }
    }
}
