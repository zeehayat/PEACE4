<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectFinancialInstallmentRequest;
use App\Http\Requests\UpdateProjectFinancialInstallmentRequest;
use App\Models\IrrigationScheme;
use App\Models\ProjectFinancialInstallment;
use App\Services\IrrigationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

class IrrigationFinancialProgressController extends Controller
{
    protected $irrigationService;

    public function __construct(IrrigationService $irrigationService)
    {
        $this->irrigationService = $irrigationService;
        $this->authorizeResource(ProjectFinancialInstallment::class, 'financial_installment');
    }

    /**
     * Display a listing of financial installments for a specific irrigation scheme.
     */
    public function index(Request $request, IrrigationScheme $scheme)
    {
        $query = $scheme->financialInstallments()->with('media');

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

        return redirect()->route('irrigation.schemes.index');
    }

    /**
     * Store a newly created financial installment record for an irrigation scheme.
     */
    public function store(StoreProjectFinancialInstallmentRequest $request, IrrigationScheme $scheme)
    {
        try {
            $this->irrigationService->createFinancialInstallment($scheme, $request->validated());
            return redirect()->back()->with('success', 'Financial Installment recorded successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Financial Installment for Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to record Financial Installment: ' . $e->getMessage());
        }
    }

    /**
     * Update the specified financial installment record.
     */
    public function update(UpdateProjectFinancialInstallmentRequest $request, IrrigationScheme $scheme, ProjectFinancialInstallment $financialInstallment)
    {
        try {
            $this->irrigationService->updateFinancialInstallment($financialInstallment, $request->validated());
            return redirect()->back()->with('success', 'Financial Installment updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Financial Installment for Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update Financial Installment: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified financial installment record.
     */
    public function destroy(IrrigationScheme $scheme, ProjectFinancialInstallment $financialInstallment)
    {
        try {
            $financialInstallment->delete();
            return redirect()->back()->with('success', 'Financial Installment deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Financial Installment for Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Financial Installment: ' . $e->getMessage());
        }
    }
}
