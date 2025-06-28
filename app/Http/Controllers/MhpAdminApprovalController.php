<?php

namespace App\Http\Controllers;

use App\Models\MhpAdminApproval;
use App\Http\Requests\MhpAdminApprovalRequest;
use Illuminate\Http\Request;

class MhpAdminApprovalController extends Controller
{
    public function store(MhpAdminApprovalRequest $request)
    {
        $data = $request->validated();
        MhpAdminApproval::create($data);
        return redirect()->back()->with('success', 'MhpAdminApproval created successfully.');
    }

    public function update(MhpAdminApprovalRequest $request, MhpAdminApproval $mhpadminapproval)
    {
        $data = $request->validated();
        $mhpadminapproval->update($data);
        return redirect()->back()->with('success', 'MhpAdminApproval updated successfully.');
    }
}
