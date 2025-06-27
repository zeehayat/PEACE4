
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vendor;
use App\Services\VendorService;

class VendorController extends Controller
{
    protected VendorService $service;

    public function __construct(VendorService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = Vendor::latest()->paginate(10);
        return inertia('Vendors/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'Vendor created.');
    }

    public function update(Request $request, Vendor $vendor)
    {
        $this->service->update($vendor, $request->all());
        return redirect()->back()->with('success', 'Vendor updated.');
    }

    public function destroy(Vendor $vendor)
    {
        $this->service->delete($vendor);
        return redirect()->back()->with('success', 'Vendor deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('Vendors/Show', compact('item'));
    }
}
