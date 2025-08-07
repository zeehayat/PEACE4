
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProcurementFinalApproval;
use App\Services\ProcurementFinalApprovalService;

class ProcurementFinalApprovalController extends Controller
{
    protected ProcurementFinalApprovalService $service;

    public function __construct(ProcurementFinalApprovalService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProcurementFinalApproval::latest()->paginate(10);
        return inertia('ProcurementFinalApprovals/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProcurementFinalApproval created.');
    }

    public function update(Request $request, ProcurementFinalApproval $procurementFinalApproval)
    {
        $this->service->update($procurementFinalApproval, $request->all());
        return redirect()->back()->with('success', 'ProcurementFinalApproval updated.');
    }

    public function destroy(ProcurementFinalApproval $procurementFinalApproval)
    {
        $this->service->delete($procurementFinalApproval);
        return redirect()->back()->with('success', 'ProcurementFinalApproval deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProcurementFinalApprovals/Show', compact('item'));
    }
}
