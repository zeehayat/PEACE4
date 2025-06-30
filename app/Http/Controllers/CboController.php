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
        $cbos = Cbo::all();
        return inertia('Cbo/List', [
            'cbos' => $cbos,
        ]);
    }
    public function create()
    {
        $cbos=Cbo::all();
        return Inertia::render('Cbo/Create',[
            'cbos'=>$cbos
        ]);

    }
    public function store(Request $request)
    {
        $cbo = $this->service->create($request->all());

        return redirect()->route('cbo.show', $cbo->id)
            ->with('success', 'CBO created.');
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

    public function show(Cbo $cbo)
    {
        return inertia('Cbo/Show', [
            'item' => $cbo->load('media'), // if you want media; optional
        ]);
    }
}
