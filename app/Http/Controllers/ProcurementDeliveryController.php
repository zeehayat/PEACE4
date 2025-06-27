
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProcurementDelivery;
use App\Services\ProcurementDeliveryService;

class ProcurementDeliveryController extends Controller
{
    protected ProcurementDeliveryService $service;

    public function __construct(ProcurementDeliveryService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProcurementDelivery::latest()->paginate(10);
        return inertia('ProcurementDeliverys/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProcurementDelivery created.');
    }

    public function update(Request $request, ProcurementDelivery $procurementDelivery)
    {
        $this->service->update($procurementDelivery, $request->all());
        return redirect()->back()->with('success', 'ProcurementDelivery updated.');
    }

    public function destroy(ProcurementDelivery $procurementDelivery)
    {
        $this->service->delete($procurementDelivery);
        return redirect()->back()->with('success', 'ProcurementDelivery deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProcurementDeliverys/Show', compact('item'));
    }
}
