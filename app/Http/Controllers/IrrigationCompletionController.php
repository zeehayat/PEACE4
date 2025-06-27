
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IrrigationCompletion;
use App\Services\IrrigationCompletionService;

class IrrigationCompletionController extends Controller
{
    protected IrrigationCompletionService $service;

    public function __construct(IrrigationCompletionService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = IrrigationCompletion::latest()->paginate(10);
        return inertia('IrrigationCompletions/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'IrrigationCompletion created.');
    }

    public function update(Request $request, IrrigationCompletion $irrigationCompletion)
    {
        $this->service->update($irrigationCompletion, $request->all());
        return redirect()->back()->with('success', 'IrrigationCompletion updated.');
    }

    public function destroy(IrrigationCompletion $irrigationCompletion)
    {
        $this->service->delete($irrigationCompletion);
        return redirect()->back()->with('success', 'IrrigationCompletion deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('IrrigationCompletions/Show', compact('item'));
    }
}
