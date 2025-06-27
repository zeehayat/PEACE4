
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProcurementItem;
use App\Services\ProcurementItemService;

class ProcurementItemController extends Controller
{
    protected ProcurementItemService $service;

    public function __construct(ProcurementItemService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProcurementItem::latest()->paginate(10);
        return inertia('ProcurementItems/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProcurementItem created.');
    }

    public function update(Request $request, ProcurementItem $procurementItem)
    {
        $this->service->update($procurementItem, $request->all());
        return redirect()->back()->with('success', 'ProcurementItem updated.');
    }

    public function destroy(ProcurementItem $procurementItem)
    {
        $this->service->delete($procurementItem);
        return redirect()->back()->with('success', 'ProcurementItem deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProcurementItems/Show', compact('item'));
    }
}
