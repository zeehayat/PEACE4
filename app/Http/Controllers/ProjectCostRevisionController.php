
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectCostRevision;
use App\Services\ProjectCostRevisionService;

class ProjectCostRevisionController extends Controller
{
    protected ProjectCostRevisionService $service;

    public function __construct(ProjectCostRevisionService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProjectCostRevision::latest()->paginate(10);
        return inertia('ProjectCostRevisions/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProjectCostRevision created.');
    }

    public function update(Request $request, ProjectCostRevision $projectCostRevision)
    {
        $this->service->update($projectCostRevision, $request->all());
        return redirect()->back()->with('success', 'ProjectCostRevision updated.');
    }

    public function destroy(ProjectCostRevision $projectCostRevision)
    {
        $this->service->delete($projectCostRevision);
        return redirect()->back()->with('success', 'ProjectCostRevision deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProjectCostRevisions/Show', compact('item'));
    }
}
