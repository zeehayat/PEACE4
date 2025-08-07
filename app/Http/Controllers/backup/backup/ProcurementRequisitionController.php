
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProcurementRequisition;
use App\Services\ProcurementRequisitionService;

class ProcurementRequisitionController extends Controller
{
    protected ProcurementRequisitionService $service;

    public function __construct(ProcurementRequisitionService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProcurementRequisition::latest()->paginate(10);
        return inertia('ProcurementRequisitions/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProcurementRequisition created.');
    }

    public function update(Request $request, ProcurementRequisition $procurementRequisition)
    {
        $this->service->update($procurementRequisition, $request->all());
        return redirect()->back()->with('success', 'ProcurementRequisition updated.');
    }

    public function destroy(ProcurementRequisition $procurementRequisition)
    {
        $this->service->delete($procurementRequisition);
        return redirect()->back()->with('success', 'ProcurementRequisition deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProcurementRequisitions/Show', compact('item'));
    }
}
