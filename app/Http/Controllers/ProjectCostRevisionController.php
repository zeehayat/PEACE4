<?php

namespace App\Http\Controllers;

use App\Models\ProjectCostRevision;
use App\Http\Requests\ProjectCostRevisionRequest;
use Illuminate\Http\Request;

class ProjectCostRevisionController extends Controller
{
    public function store(ProjectCostRevisionRequest $request)
    {
        $data = $request->validated();
        ProjectCostRevision::create($data);
        return redirect()->back()->with('success', 'ProjectCostRevision created successfully.');
    }

    public function update(ProjectCostRevisionRequest $request, ProjectCostRevision $projectcostrevision)
    {
        $data = $request->validated();
        $projectcostrevision->update($data);
        return redirect()->back()->with('success', 'ProjectCostRevision updated successfully.');
    }
}
