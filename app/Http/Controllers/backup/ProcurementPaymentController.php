
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProcurementPayment;
use App\Services\ProcurementPaymentService;

class ProcurementPaymentController extends Controller
{
    protected ProcurementPaymentService $service;

    public function __construct(ProcurementPaymentService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProcurementPayment::latest()->paginate(10);
        return inertia('ProcurementPayments/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProcurementPayment created.');
    }

    public function update(Request $request, ProcurementPayment $procurementPayment)
    {
        $this->service->update($procurementPayment, $request->all());
        return redirect()->back()->with('success', 'ProcurementPayment updated.');
    }

    public function destroy(ProcurementPayment $procurementPayment)
    {
        $this->service->delete($procurementPayment);
        return redirect()->back()->with('success', 'ProcurementPayment deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProcurementPayments/Show', compact('item'));
    }
}
