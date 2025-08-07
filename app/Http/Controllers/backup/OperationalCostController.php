<?php

namespace App\Http\Controllers;

use App\Models\OperationalCost;
use App\Models\MhpSite;
use App\Models\ExpenseType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class OperationalCostController extends Controller
{
    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->has('site_id')) {
            // JSON for modal
            $siteId = $request->get('site_id');

            $costs = OperationalCost::with(['media'])
                ->where('mhp_site_id', $siteId)
                ->with('expenseType')
                ->orderBy('cost_date')
                ->get()
                ->map(function ($cost) {
                    return [
                        'id' => $cost->id,
                        'cost_date' => $cost->cost_date,
                        'amount' => $cost->amount,
                        'remarks' => $cost->remarks,
                        'expense_type_id' => $cost->expense_type_id,
                        'expense_type_name' => optional($cost->expenseType)->name,
                        'media' => $cost->getMedia()->map(fn ($m) => [
                            'id' => $m->id,
                            'name' => $m->file_name,
                            'url' => $m->getFullUrl(),
                        ])
                    ];
                });

            return response()->json($costs);
        }

        // fallback: inertia page
        $items = OperationalCost::latest()->paginate(10);
        return inertia('OperationalCosts/Index', compact('items'));
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
        ]);

        DB::transaction(function () use ($request, $validated) {
            $cost = OperationalCost::create($validated);

            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $cost->addMedia($file)->toMediaCollection();
                }
            }
        });

        return response()->json(['success' => true]);
    }

    public function update(Request $request, OperationalCost $operationalCost)
    {
        $validated = $request->validate([
            'mhp_site_id' => 'required|exists:mhp_sites,id',
            'cost_date' => 'required|date',
            'expense_type_id' => 'required|exists:expense_types,id',
            'amount' => 'required|numeric',
            'remarks' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $operationalCost, $validated) {
            $operationalCost->update($validated);

            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $operationalCost->addMedia($file)->toMediaCollection();
                }
            }
        });

        return response()->json(['success' => true]);
    }

    public function destroy(OperationalCost $operationalCost)
    {
        $operationalCost->delete();
        return response()->json(['success' => true]);
    }

    public function show(int $id)
    {
        $item = OperationalCost::with(['media', 'expenseType'])->findOrFail($id);
        return inertia('OperationalCosts/Show', compact('item'));
    }

    public function deleteMedia(Media $media)
    {
        $media->delete();
        return response()->json(['success' => true]);
    }
}
