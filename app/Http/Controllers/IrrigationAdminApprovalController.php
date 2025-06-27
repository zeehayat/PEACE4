
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IrrigationAdminApproval;
use App\Services\IrrigationAdminApprovalService;

class IrrigationAdminApprovalController extends Controller
{
    protected IrrigationAdminApprovalService $service;

    public function __construct(IrrigationAdminApprovalService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = IrrigationAdminApproval::latest()->paginate(10);
        return inertia('IrrigationAdminApprovals/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'IrrigationAdminApproval created.');
    }

    public function update(Request $request, IrrigationAdminApproval $irrigationAdminApproval)
    {
        $this->service->update($irrigationAdminApproval, $request->all());
        return redirect()->back()->with('success', 'IrrigationAdminApproval updated.');
    }

    public function destroy(IrrigationAdminApproval $irrigationAdminApproval)
    {
        $this->service->delete($irrigationAdminApproval);
        return redirect()->back()->with('success', 'IrrigationAdminApproval deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('IrrigationAdminApprovals/Show', compact('item'));
    }
}
