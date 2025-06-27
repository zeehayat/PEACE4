
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MhpAdminApproval;
use App\Services\MhpAdminApprovalService;

class MhpAdminApprovalController extends Controller
{
    protected MhpAdminApprovalService $service;

    public function __construct(MhpAdminApprovalService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = MhpAdminApproval::latest()->paginate(10);
        return inertia('MhpAdminApprovals/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'MhpAdminApproval created.');
    }

    public function update(Request $request, MhpAdminApproval $mhpAdminApproval)
    {
        $this->service->update($mhpAdminApproval, $request->all());
        return redirect()->back()->with('success', 'MhpAdminApproval updated.');
    }

    public function destroy(MhpAdminApproval $mhpAdminApproval)
    {
        $this->service->delete($mhpAdminApproval);
        return redirect()->back()->with('success', 'MhpAdminApproval deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('MhpAdminApprovals/Show', compact('item'));
    }
}
