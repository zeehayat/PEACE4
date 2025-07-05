<?php

namespace App\Http\Controllers;

use App\Models\MhpAdminApproval;
use App\Http\Requests\MhpAdminApprovalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MhpAdminApprovalController extends Controller
{
    public function store(MhpAdminApprovalRequest $request)
    {
        $data = $request->validated();
        unset($data['attachments']);
        $approval=MhpAdminApproval::create($data);
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $approval->addMedia($file)->toMediaCollection('attachments');
            }
        }
        return redirect()->route('mhp.mhp-sites.index')
            ->with('success', 'Approval Stored Successfully.');

    }

    public function update(MhpAdminApprovalRequest $request, MhpAdminApproval $mhpadminapproval)
    {
        $data = $request->validated();
        unset($data['attachments']);
        $approval=$mhpadminapproval->update($data);
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $approval->addMedia($file)->toMediaCollection('attachments');
            }
        }
        return redirect()->back()->with('success', 'MhpAdminApproval updated successfully.');
    }
    public function updateRevisedCost($mhpSiteId, $field, Request $request)
    {
        $allowedFields = ['revised_cost_1', 'revised_cost_2', 'revised_cost_3'];

        if (!in_array($field, $allowedFields)) {
            abort(400, 'Invalid revised cost field.');
        }

        $request->validate([
            'value' => 'required|numeric|min:0',
        ]);

        $approval = MhpAdminApproval::where('mhp_site_id', $mhpSiteId)->first();

        if (!$approval) {
            return back()->withErrors(['msg' => 'Admin approval not found for this site.']);
        }

        $approval->$field = $request->input('value');
        $approval->save();

        return back()->with('success', ucfirst(str_replace('_', ' ', $field)) . ' updated successfully.');
    }



}
