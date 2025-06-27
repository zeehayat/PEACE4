
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OperationalCost;
use App\Services\OperationalCostService;

class OperationalCostController extends Controller
{
    protected OperationalCostService $service;

    public function __construct(OperationalCostService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = OperationalCost::latest()->paginate(10);
        return inertia('OperationalCosts/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'OperationalCost created.');
    }

    public function update(Request $request, OperationalCost $operationalCost)
    {
        $this->service->update($operationalCost, $request->all());
        return redirect()->back()->with('success', 'OperationalCost updated.');
    }

    public function destroy(OperationalCost $operationalCost)
    {
        $this->service->delete($operationalCost);
        return redirect()->back()->with('success', 'OperationalCost deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('OperationalCosts/Show', compact('item'));
    }
}
