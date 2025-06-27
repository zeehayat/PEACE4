
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MhpEmeProgress;
use App\Services\MhpEmeProgressService;

class MhpEmeProgressController extends Controller
{
    protected MhpEmeProgressService $service;

    public function __construct(MhpEmeProgressService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = MhpEmeProgress::latest()->paginate(10);
        return inertia('MhpEmeProgresss/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'MhpEmeProgress created.');
    }

    public function update(Request $request, MhpEmeProgress $mhpEmeProgress)
    {
        $this->service->update($mhpEmeProgress, $request->all());
        return redirect()->back()->with('success', 'MhpEmeProgress updated.');
    }

    public function destroy(MhpEmeProgress $mhpEmeProgress)
    {
        $this->service->delete($mhpEmeProgress);
        return redirect()->back()->with('success', 'MhpEmeProgress deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('MhpEmeProgresss/Show', compact('item'));
    }
}
