
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectFinancialInstallment;
use App\Services\ProjectFinancialInstallmentService;

class ProjectFinancialInstallmentController extends Controller
{
    protected ProjectFinancialInstallmentService $service;

    public function __construct(ProjectFinancialInstallmentService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProjectFinancialInstallment::latest()->paginate(10);
        return inertia('ProjectFinancialInstallments/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProjectFinancialInstallment created.');
    }

    public function update(Request $request, ProjectFinancialInstallment $projectFinancialInstallment)
    {
        $this->service->update($projectFinancialInstallment, $request->all());
        return redirect()->back()->with('success', 'ProjectFinancialInstallment updated.');
    }

    public function destroy(ProjectFinancialInstallment $projectFinancialInstallment)
    {
        $this->service->delete($projectFinancialInstallment);
        return redirect()->back()->with('success', 'ProjectFinancialInstallment deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProjectFinancialInstallments/Show', compact('item'));
    }
}
