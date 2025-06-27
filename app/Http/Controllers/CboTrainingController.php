
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CboTraining;
use App\Services\CboTrainingService;

class CboTrainingController extends Controller
{
    protected CboTrainingService $service;

    public function __construct(CboTrainingService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = CboTraining::latest()->paginate(10);
        return inertia('CboTrainings/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'CboTraining created.');
    }

    public function update(Request $request, CboTraining $cboTraining)
    {
        $this->service->update($cboTraining, $request->all());
        return redirect()->back()->with('success', 'CboTraining updated.');
    }

    public function destroy(CboTraining $cboTraining)
    {
        $this->service->delete($cboTraining);
        return redirect()->back()->with('success', 'CboTraining deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('CboTrainings/Show', compact('item'));
    }
}
