<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectFinancialInstallmentRequest;
use App\Http\Requests\UpdateProjectFinancialInstallmentRequest;
use App\Models\MhpSite;
use App\Models\ProjectFinancialInstallment;
use App\Services\MhpSiteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Gate;

class MhpFinancialInstallmentController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;
        $this->authorizeResource(ProjectFinancialInstallment::class, 'financial_installment');
    }

    /**
     * Display a listing of financial installments for a specific MHP Site.
     */
    public function index(Request $request, MhpSite $site)
    {
        $query = $site->financialInstallments()->with('media');

        if ($request->has('payment_for')) {
            $query->where('payment_for', $request->input('payment_for'));
        }

        if ($request->has('only-data')) {
            $installments = $query->orderBy('installment_date', 'desc')->get();
            $installments->transform(function ($installment) {
                $installment->attachments = $installment->attachments_frontend;
                return $installment;
            });

            return response()->json([
                'financialInstallments' => $installments,
            ]);
        }

        return redirect()->route('mhp.sites.index');
    }

    /**
     * Store a newly created financial installment record for an MHP Site.
     */
    public function store(StoreProjectFinancialInstallmentRequest $request, MhpSite $site)
    {
        try {
            $this->mhpSiteService->createFinancialInstallment($site, $request->validated());
            return redirect()->back()->with('success', 'Financial Installment recorded successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Financial Installment for MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to record Financial Installment: ' . $e->getMessage());
        }
    }

    /**
     * Update the specified financial installment record.
     */
    public function update(UpdateProjectFinancialInstallmentRequest $request, MhpSite $site, ProjectFinancialInstallment $financialInstallment)
    {
        try {
            $this->mhpSiteService->updateFinancialInstallment($financialInstallment, $request->validated());
            return redirect()->back()->with('success', 'Financial Installment updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Financial Installment for MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update Financial Installment: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified financial installment record.
     */
    public function destroy(MhpSite $site, ProjectFinancialInstallment $financialInstallment)
    {
        try {
            $financialInstallment->delete();
            return redirect()->back()->with('success', 'Financial Installment deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Financial Installment for MHP Site: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Financial Installment: ' . $e->getMessage());
        }
    }
}
