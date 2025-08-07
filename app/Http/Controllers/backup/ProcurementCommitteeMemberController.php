
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProcurementCommitteeMember;
use App\Services\ProcurementCommitteeMemberService;

class ProcurementCommitteeMemberController extends Controller
{
    protected ProcurementCommitteeMemberService $service;

    public function __construct(ProcurementCommitteeMemberService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProcurementCommitteeMember::latest()->paginate(10);
        return inertia('ProcurementCommitteeMembers/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProcurementCommitteeMember created.');
    }

    public function update(Request $request, ProcurementCommitteeMember $procurementCommitteeMember)
    {
        $this->service->update($procurementCommitteeMember, $request->all());
        return redirect()->back()->with('success', 'ProcurementCommitteeMember updated.');
    }

    public function destroy(ProcurementCommitteeMember $procurementCommitteeMember)
    {
        $this->service->delete($procurementCommitteeMember);
        return redirect()->back()->with('success', 'ProcurementCommitteeMember deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProcurementCommitteeMembers/Show', compact('item'));
    }
}
