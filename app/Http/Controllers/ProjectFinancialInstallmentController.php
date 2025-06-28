<?php

namespace App\Http\Controllers;

use App\Models\ProjectFinancialInstallment;
use App\Http\Requests\ProjectFinancialInstallmentRequest;
use Illuminate\Http\Request;

class ProjectFinancialInstallmentController extends Controller
{
    public function store(ProjectFinancialInstallmentRequest $request)
    {
        $data = $request->validated();
        ProjectFinancialInstallment::create($data);
        return redirect()->back()->with('success', 'ProjectFinancialInstallment created successfully.');
    }

    public function update(ProjectFinancialInstallmentRequest $request, ProjectFinancialInstallment $projectfinancialinstallment)
    {
        $data = $request->validated();
        $projectfinancialinstallment->update($data);
        return redirect()->back()->with('success', 'ProjectFinancialInstallment updated successfully.');
    }
}
