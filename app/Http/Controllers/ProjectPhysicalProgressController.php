
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectPhysicalProgress;
use App\Services\ProjectPhysicalProgressService;

class ProjectPhysicalProgressController extends Controller
{
    protected ProjectPhysicalProgressService $service;

    public function __construct(ProjectPhysicalProgressService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $items = ProjectPhysicalProgress::latest()->paginate(10);
        return inertia('ProjectPhysicalProgresss/Index', compact('items'));
    }

    public function store(Request $request)
    {
        $this->service->create($request->all());
        return redirect()->back()->with('success', 'ProjectPhysicalProgress created.');
    }

    public function update(Request $request, ProjectPhysicalProgress $projectPhysicalProgress)
    {
        $this->service->update($projectPhysicalProgress, $request->all());
        return redirect()->back()->with('success', 'ProjectPhysicalProgress updated.');
    }

    public function destroy(ProjectPhysicalProgress $projectPhysicalProgress)
    {
        $this->service->delete($projectPhysicalProgress);
        return redirect()->back()->with('success', 'ProjectPhysicalProgress deleted.');
    }

    public function show(int $id)
    {
        $item = $this->service->find($id);
        return inertia('ProjectPhysicalProgresss/Show', compact('item'));
    }
}
