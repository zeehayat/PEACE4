<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectFinancialInstallmentRequest;
use App\Http\Requests\UpdateProjectFinancialInstallmentRequest;
use App\Models\MhpSite; // Assuming financial installments are primarily associated with MHP Sites
use App\Models\ProjectFinancialInstallment;
use App\Services\MhpSiteService; // Import the service
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProjectFinancialInstallmentController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;
    }

    /**
     * Display a listing of financial installment entries for a specific MHP Site.
     * E.g., /mhp/sites/{mhpSite}/financial-installments
     */
    public function index(Request $request, MhpSite $mhpSite)
    {
        $financialInstallments = $mhpSite->financialInstallments()
            ->with(['activity', 'media']) // Eager load activity details and media
            ->orderBy('installment_date', 'desc')
            ->paginate(10);

        // Apply accessor for frontend attachments and activity details if needed
        $financialInstallments->getCollection()->transform(function ($installment) {
            $installment->attachments = $installment->attachments_frontend;
            // The 'activity' relation itself will be a TAndDWork model (or null)
            // You can add specific formatting for activity here if needed for the list view
            return $installment;
        });

        // If you're rendering an Inertia page to manage financial installments for a site
        return Inertia::render('MHP/FinancialInstallment/Index', [
            'mhpSite' => $mhpSite->only('id', 'project_id', 'name'), // Pass minimal site info
            'financialInstallments' => $financialInstallments,
        ]);
    }

    /**
     * Show the form for creating a new Financial Installment entry (usually in a modal).
     */
    public function create()
    {
        // Not directly used if modal handles creation.
    }

    /**
     * Store a newly created Project Financial Installment record in storage.
     * The `projectable_id` and `projectable_type` will be automatically set by the service.
     */
    public function store(StoreProjectFinancialInstallmentRequest $request, MhpSite $site)
    {
        try {
            $this->mhpSiteService->createFinancialInstallment($site, $request->validated());
            return redirect()->back()->with('success', 'Financial Installment recorded successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Financial Installment: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to record Financial Installment: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified Project Financial Installment.
     */
    public function show(ProjectFinancialInstallment $financialInstallment)
    {
        $financialInstallment->load(['activity', 'media']); // Ensure activity details and media are loaded
        $financialInstallment->attachments = $financialInstallment->attachments_frontend; // Apply accessor
        // If it's a T&D activity, load its media too
        if ($financialInstallment->activity_type === \App\Models\TAndDWork::class && $financialInstallment->activity) {
            $financialInstallment->activity->attachments = $financialInstallment->activity->attachments_frontend;
        }

        return response()->json($financialInstallment); // Return as JSON for modal or API, or render Inertia
    }

    /**
     * Show the form for editing the specified Financial Installment.
     */
    public function edit(ProjectFinancialInstallment $financialInstallment)
    {
        // Not directly used if modal handles editing.
    }

    /**
     * Update the specified Project Financial Installment record in storage.
     */
    public function update(UpdateProjectFinancialInstallmentRequest $request, ProjectFinancialInstallment $financialInstallment)
    {
        try {
            $this->mhpSiteService->updateFinancialInstallment($financialInstallment, $request->validated());
            return redirect()->back()->with('success', 'Financial Installment updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Financial Installment: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update Financial Installment: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified Project Financial Installment record from storage.
     */
    public function destroy(ProjectFinancialInstallment $financialInstallment)
    {
        try {
            $financialInstallment->delete(); // Spatie media will be handled automatically
            return redirect()->back()->with('success', 'Financial Installment deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Financial Installment: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Financial Installment: ' . $e->getMessage());
        }
    }

/* Get financial progress for a specific component (e.g., Civil, EME, T&D).
* This is intended for async calls from the frontend.
*/
    public function getFinancialProgress(Request $request, MhpSite $site)
    {
        $paymentFor = $request->string('payment_for')->value();

        $query = $site->financialInstallments()
            ->when($paymentFor, fn($q) => $q->where('payment_for', $paymentFor))
            ->with(['media'])
            ->orderByDesc('installment_date')
            ->orderByDesc('id');

        $installments = $query->get();

        return response()->json([
            'financialInstallments' => $installments->map(function ($installment) {
                return [
                    'id' => $installment->id,
                    'installment_number' => $installment->installment_number,
                    'installment_date' => optional($installment->installment_date)->toDateString(),
                    'installment_amount' => (float) $installment->installment_amount,
                    'payment_for' => $installment->payment_for,
                    'remarks' => $installment->remarks,
                    'attachments_frontend' => $installment->attachments_frontend,
                ];
            }),
        ]);
    }
}
