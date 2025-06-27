
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MhpSite;
use App\Services\MhpSiteService;

class MhpSiteController extends Controller
{
    protected MhpSiteService $service;

    public function __construct(MhpSiteService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = MhpSite::latest()->paginate(10);
        return inertia('MhpSites/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'MhpSite created.');
    }

    public function update(Request $request, MhpSite $mhpSite)
    {
        $this->service->update($mhpSite, $request->all());
        return redirect()->back()->with('success', 'MhpSite updated.');
    }

    public function destroy(MhpSite $mhpSite)
    {
        $this->service->delete($mhpSite);
        return redirect()->back()->with('success', 'MhpSite deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('MhpSites/Show', compact('item'));
    }
}
