<?php

namespace App\Http\Controllers;

use App\Models\IrrigationSchemeContract;
use App\Models\IrrigationScheme; // Needed for context/validation
use App\Models\Vendor; // Needed for linking contracts to vendors
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class IrrigationSchemeContractController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', IrrigationSchemeContract::class);

        // Typically, this index would be filtered by irrigation_scheme_id
        $query = IrrigationSchemeContract::query()->with(['irrigationScheme', 'vendor']);

        if ($request->has('irrigation_scheme_id')) {
            $query->where('irrigation_scheme_id', $request->input('irrigation_scheme_id'));
        }

        $contracts = $query->latest()->paginate(10); // Adjust pagination as needed

        return Inertia::render('IrrigationSchemeContract/Index', [ // This Inertia page needs to be created
            'contracts' => $contracts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'irrigation_scheme_id' => 'required|exists:irrigation_schemes,id',
            'vendor_id' => 'required|exists:vendors,id',
            'date_civil_work_initiation' => 'nullable|date',
            'contract_amount' => 'nullable|numeric|min:0',
        ]);

        $irrigationScheme = IrrigationScheme::findOrFail($validated['irrigation_scheme_id']);
        $this->authorize('create', [IrrigationSchemeContract::class, $irrigationScheme]);
        try {
            DB::transaction(function () use ($validated) {
                IrrigationSchemeContract::create($validated);
            });
            return redirect()->back()->with('success', 'Irrigation Scheme Contract created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating Irrigation Scheme Contract: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create Irrigation Scheme Contract: ' . $e->getMessage());
        }
    }

    public function update(Request $request, IrrigationSchemeContract $irrigationSchemeContract)
    {
        $this->authorize('update', $irrigationSchemeContract);

        $validated = $request->validate([
            'irrigation_scheme_id' => 'required|exists:irrigation_schemes,id',
            'vendor_id' => 'required|exists:vendors,id',
            'date_civil_work_initiation' => 'nullable|date',
            'contract_amount' => 'nullable|numeric|min:0',
        ]);

        try {
            DB::transaction(function () use ($irrigationSchemeContract, $validated) {
                $irrigationSchemeContract->update($validated);
            });
            return redirect()->back()->with('success', 'Irrigation Scheme Contract updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating Irrigation Scheme Contract: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update Irrigation Scheme Contract: ' . $e->getMessage());
        }
    }

    public function destroy(IrrigationSchemeContract $irrigationSchemeContract)
    {
        $this->authorize('delete', $irrigationSchemeContract);

        try {
            DB::transaction(function () use ($irrigationSchemeContract) {
                $irrigationSchemeContract->delete();
            });
            return redirect()->back()->with('success', 'Irrigation Scheme Contract deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting Irrigation Scheme Contract: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Irrigation Scheme Contract: ' . $e->getMessage());
        }
    }

    public function show(IrrigationSchemeContract $irrigationSchemeContract)
    {
        $this->authorize('view', $irrigationSchemeContract);

        // Load relationships for show view
        $irrigationSchemeContract->load(['irrigationScheme', 'vendor']);
        return Inertia::render('IrrigationSchemeContract/Show', ['irrigationSchemeContract' => $irrigationSchemeContract]);
    }
}
