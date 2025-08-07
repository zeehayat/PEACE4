
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProcurementQuotation;
use App\Services\ProcurementQuotationService;

class ProcurementQuotationController extends Controller
{
    protected ProcurementQuotationService $service;

    public function __construct(ProcurementQuotationService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProcurementQuotation::latest()->paginate(10);
        return inertia('ProcurementQuotations/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProcurementQuotation created.');
    }

    public function update(Request $request, ProcurementQuotation $procurementQuotation)
    {
        $this->service->update($procurementQuotation, $request->all());
        return redirect()->back()->with('success', 'ProcurementQuotation updated.');
    }

    public function destroy(ProcurementQuotation $procurementQuotation)
    {
        $this->service->delete($procurementQuotation);
        return redirect()->back()->with('success', 'ProcurementQuotation deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProcurementQuotations/Show', compact('item'));
    }
}
