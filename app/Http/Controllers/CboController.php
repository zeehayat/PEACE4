<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cbo;
use App\Services\CboService;
use Inertia\Inertia;

class CboController extends Controller
{
    protected CboService $service;

    public function __construct(CboService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = Cbo::latest()->paginate(10);
        return inertia('Cbos/Index', compact('items'));
    }
    public function create()
    {
        return Inertia::render('Cbo/Create');

    }
    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'Cbo created.');
    }

    public function update(Request $request, Cbo $cbo)
    {
        $this->service->update($cbo, $request->all());
        return redirect()->back()->with('success', 'Cbo updated.');
    }

    public function destroy(Cbo $cbo)
    {
        $this->service->delete($cbo);
        return redirect()->back()->with('success', 'Cbo deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('Cbos/Show', compact('item'));
    }
}
