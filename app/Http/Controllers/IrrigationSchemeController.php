
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IrrigationScheme;
use App\Services\IrrigationSchemeService;

class IrrigationSchemeController extends Controller
{
    protected IrrigationSchemeService $service;

    public function __construct(IrrigationSchemeService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = IrrigationScheme::latest()->paginate(10);
        return inertia('IrrigationSchemes/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'IrrigationScheme created.');
    }

    public function update(Request $request, IrrigationScheme $irrigationScheme)
    {
        $this->service->update($irrigationScheme, $request->all());
        return redirect()->back()->with('success', 'IrrigationScheme updated.');
    }

    public function destroy(IrrigationScheme $irrigationScheme)
    {
        $this->service->delete($irrigationScheme);
        return redirect()->back()->with('success', 'IrrigationScheme deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('IrrigationSchemes/Show', compact('item'));
    }
}
