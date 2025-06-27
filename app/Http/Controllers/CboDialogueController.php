
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CboDialogue;
use App\Services\CboDialogueService;

class CboDialogueController extends Controller
{
    protected CboDialogueService $service;

    public function __construct(CboDialogueService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = CboDialogue::latest()->paginate(10);
        return inertia('CboDialogues/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'CboDialogue created.');
    }

    public function update(Request $request, CboDialogue $cboDialogue)
    {
        $this->service->update($cboDialogue, $request->all());
        return redirect()->back()->with('success', 'CboDialogue updated.');
    }

    public function destroy(CboDialogue $cboDialogue)
    {
        $this->service->delete($cboDialogue);
        return redirect()->back()->with('success', 'CboDialogue deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('CboDialogues/Show', compact('item'));
    }
}
