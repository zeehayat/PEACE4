<?php

namespace App\Http\Controllers;

use App\Models\OperationalCost;
use App\Models\MhpSite;
use App\Models\ExpenseType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Services\MhpSiteService;
use Illuminate\Support\Facades\Log; // Don't forget to import Log

class OperationalCostController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;
    }

    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->has('site_id')) {
            $siteId = $request->get('site_id');
            $costs = $this->mhpSiteService->getOperationalCostsForSite($siteId);
            return response()->json($costs);
        }

        $items = OperationalCost::latest()->paginate(10);
        return inertia('MHP/Index', compact('items'));
    }

    public function expenseTypes()
    {
        return ExpenseType::select('id', 'name')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mhp_site_id' => 'required|exists:mhp_sites,id',
            'cost_date' => 'required|date',
            'expense_type_id' => 'required|exists:expense_types,id',
            'amount' => 'required|numeric',
            'remarks' => 'nullable|string',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:5000',
        ]);

        try {
            $this->mhpSiteService->storeOperationalCost($validated);
            // Return an Inertia redirect on success
            return redirect()->back()->with('success', 'Operational cost recorded successfully!');
        } catch (\Exception $e) {
            Log::error('Error recording operational cost: ' . $e->getMessage(), ['exception' => $e]);
            // Return an Inertia redirect with an error message
            return redirect()->back()->with('error', 'Failed to record operational cost.');
        }
    }

    public function update(Request $request, OperationalCost $operationalCost)
    {
        $validated = $request->validate([
            'mhp_site_id' => 'required|exists:mhp_sites,id',
            'cost_date' => 'required|date',
            'expense_type_id' => 'required|exists:expense_types,id',
            'amount' => 'required|numeric',
            'remarks' => 'nullable|string',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:5000',
            'attachments_to_delete' => 'nullable|array',
            'attachments_to_delete.*' => 'exists:media,id',
        ]);

        try {
            $this->mhpSiteService->editOperationalCost($operationalCost, $validated);
            return redirect()->back()->with('success', 'Operational cost updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating operational cost: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update operational cost.');
        }
    }

    public function destroy(OperationalCost $operationalCost)
    {
        try {
            $this->mhpSiteService->deleteOperationalCost($operationalCost);
            return redirect()->back()->with('success', 'Operational cost deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting operational cost: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete operational cost.');
        }
    }

    public function show(int $id)
    {
        $item = $this->mhpSiteService->getOperationalCost($id);
        return inertia('OperationalCosts/Show', compact('item'));
    }

    public function deleteMedia(Media $media)
    {
        $media->delete();
        return redirect()->back()->with('success', 'Attachment deleted successfully!');
    }
}
