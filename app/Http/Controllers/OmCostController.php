
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OmCost;
use App\Services\OmCostService;

class OmCostController extends Controller
{
    protected OmCostService $service;

    public function __construct(OmCostService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = OmCost::latest()->paginate(10);
        return inertia('OmCosts/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'OmCost created.');
    }

    public function update(Request $request, OmCost $omCost)
    {
        $this->service->update($omCost, $request->all());
        return redirect()->back()->with('success', 'OmCost updated.');
    }

    public function destroy(OmCost $omCost)
    {
        $this->service->delete($omCost);
        return redirect()->back()->with('success', 'OmCost deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('OmCosts/Show', compact('item'));
    }
}
