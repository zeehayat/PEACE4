
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProcurementOrder;
use App\Services\ProcurementOrderService;

class ProcurementOrderController extends Controller
{
    protected ProcurementOrderService $service;

    public function __construct(ProcurementOrderService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProcurementOrder::latest()->paginate(10);
        return inertia('ProcurementOrders/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProcurementOrder created.');
    }

    public function update(Request $request, ProcurementOrder $procurementOrder)
    {
        $this->service->update($procurementOrder, $request->all());
        return redirect()->back()->with('success', 'ProcurementOrder updated.');
    }

    public function destroy(ProcurementOrder $procurementOrder)
    {
        $this->service->delete($procurementOrder);
        return redirect()->back()->with('success', 'ProcurementOrder deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProcurementOrders/Show', compact('item'));
    }
}
