<?php

namespace App\Http\Controllers;

use App\Models\MhpAdminApproval;
use App\Models\MhpEmeFinancialProgress;
use Illuminate\Http\Request;

class MhpEmeFinancialProgressController extends Controller
{
    public function index(Request $request)
    {
        $siteId = $request->get('site_id');

        $progresses = MhpEmeFinancialProgress::where('mhp_site_id', $siteId)
            ->orderBy('installment_number')
            ->with('media')
            ->get();

        $approval = MhpAdminApproval::where('mhp_site_id', $siteId)->first();

        $actualCost = $approval->revised_cost_3
            ?? $approval->revised_cost_2
            ?? $approval->revised_cost_1
            ?? $approval->approved_cost;

        $paidSoFar = $progresses->sum('amount');

        $remaining = $actualCost - $paidSoFar;

        return response()->json([
            'progresses' => $progresses,
            'actual_cost' => $actualCost,
            'paid_so_far' => $paidSoFar,
            'remaining' => $remaining,
        ]);
    }


    public function store(Request $request)
    {

        $validated = $request->validate([
            'mhp_site_id' => 'required|exists:mhp_sites,id',
            'installment_number' => 'required|integer|min:1|max:5',
            'initiation_date' => 'nullable|date',
            'date' => 'nullable|date',
            'amount' => 'nullable|numeric',
            'cheque_no' => 'nullable|string|max:100',
            'remaining_amount' => 'nullable|numeric',
            'attachments.*' => 'file|max:10240'
        ]);

        $progress = MhpEmeFinancialProgress::create($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $progress->addMedia($file)->toMediaCollection();
            }
        }

        return back()->with('success', 'Financial progress saved.');
    }

    public function update(Request $request, MhpEmeFinancialProgress $progress)
    {
        $validated = $request->validate([
            'initiation_date' => 'nullable|date',
            'date' => 'nullable|date',
            'amount' => 'nullable|numeric',
            'cheque_no' => 'nullable|string|max:100',
            'remaining_amount' => 'nullable|numeric',
            'attachments.*' => 'file|max:10240'
        ]);

        $progress->update($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $progress->addMedia($file)->toMediaCollection();
            }
        }

        return back()->with('success', 'Financial progress updated.');
    }

    public function destroy(MhpEmeFinancialProgress $progress)
    {
        $progress->delete();
        return back()->with('success', 'Financial progress deleted.');
    }
}
