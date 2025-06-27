
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RevenueRecord;
use App\Services\RevenueRecordService;

class RevenueRecordController extends Controller
{
    protected RevenueRecordService $service;

    public function __construct(RevenueRecordService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = RevenueRecord::latest()->paginate(10);
        return inertia('RevenueRecords/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'RevenueRecord created.');
    }

    public function update(Request $request, RevenueRecord $revenueRecord)
    {
        $this->service->update($revenueRecord, $request->all());
        return redirect()->back()->with('success', 'RevenueRecord updated.');
    }

    public function destroy(RevenueRecord $revenueRecord)
    {
        $this->service->delete($revenueRecord);
        return redirect()->back()->with('success', 'RevenueRecord deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('RevenueRecords/Show', compact('item'));
    }
}
