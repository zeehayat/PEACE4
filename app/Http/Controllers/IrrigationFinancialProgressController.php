<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectFinancialInstallmentRequest;
use App\Http\Requests\UpdateProjectFinancialInstallmentRequest;
use App\Models\IrrigationScheme;
use App\Models\ProjectFinancialInstallment;
use App\Services\IrrigationSchemeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

class IrrigationFinancialProgressController extends Controller
{
    protected $irrigationSchemeService;

    public function __construct(IrrigationSchemeService $irrigationSchemeService)
    {
        $this->irrigationSchemeService = $irrigationSchemeService;
        $this->authorizeResource(ProjectFinancialInstallment::class, 'financial_installment');
    }

    public function index(Request $request, IrrigationScheme $scheme)
    {
        $installments = $this->irrigationSchemeService->getFinancialInstallments($scheme);

        if ($request->wantsJson()) {
            return response()->json([
                'financialInstallments' => $installments->map(function ($installment) {
                    $installment->attachments = $installment->attachments_frontend;
                    return $installment;
                }),
            ]);
        }

        return redirect()->route('irrigation.schemes.index');
    }

    public function store(Request $request, IrrigationScheme $scheme)
    {
        $validated = $request->validate([
            'installment_number' => ['required', 'integer', 'min:1'],
            'installment_date' => ['required', 'date'],
            'installment_amount' => ['required', 'numeric', 'min:0'],
            'category' => ['nullable', 'string'],
            'remarks' => ['nullable', 'string'],
            'payment_for' => ['required', 'in:Civil,EME,T&D'],
            'projectable_id' => ['required', 'integer'],
            'projectable_type' => ['required', 'string'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:5000'],
        ]);

        try {
            $this->irrigationSchemeService->createFinancialInstallment($scheme, $validated);
            return redirect()->back()->with('success', 'Financial Installment recorded successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating Financial Installment for Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to record Financial Installment: ' . $e->getMessage());
        }
    }

    public function update(Request $request, IrrigationScheme $scheme, ProjectFinancialInstallment $financialInstallment)
    {
        $validated = $request->validate([
            'installment_number' => ['required', 'integer', 'min:1'],
            'installment_date' => ['required', 'date'],
            'installment_amount' => ['required', 'numeric', 'min:0'],
            'category' => ['nullable', 'string'],
            'remarks' => ['nullable', 'string'],
            'payment_for' => ['required', 'in:Civil,EME,T&D'],
            'projectable_id' => ['required', 'integer'],
            'projectable_type' => ['required', 'string'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:5000'],
            'attachments_to_delete' => ['nullable', 'array'],
        ]);

        try {
            $this->irrigationSchemeService->updateFinancialInstallment($financialInstallment, $validated);
            return redirect()->back()->with('success', 'Financial Installment updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating Financial Installment for Irrigation Scheme: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update Financial Installment: ' . $e->getMessage());
        }
    }

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
