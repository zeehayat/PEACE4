
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CboExposureVisit;
use App\Services\CboExposureVisitService;

class CboExposureVisitController extends Controller
{
    protected CboExposureVisitService $service;

    public function __construct(CboExposureVisitService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = CboExposureVisit::latest()->paginate(10);
        return inertia('CboExposureVisits/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'CboExposureVisit created.');
    }

    public function update(Request $request, CboExposureVisit $cboExposureVisit)
    {
        $this->service->update($cboExposureVisit, $request->all());
        return redirect()->back()->with('success', 'CboExposureVisit updated.');
    }

    public function destroy(CboExposureVisit $cboExposureVisit)
    {
        $this->service->delete($cboExposureVisit);
        return redirect()->back()->with('success', 'CboExposureVisit deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('CboExposureVisits/Show', compact('item'));
    }
}
