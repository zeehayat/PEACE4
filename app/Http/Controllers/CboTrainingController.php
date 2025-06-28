<?php

namespace App\Http\Controllers;

use App\Models\CboTraining;
use App\Http\Requests\CboTrainingRequest;
use Illuminate\Http\Request;

class CboTrainingController extends Controller
{
    public function store(CboTrainingRequest $request)
    {
        $data = $request->validated();
        CboTraining::create($data);
        return redirect()->back()->with('success', 'CboTraining created successfully.');
    }

    public function update(CboTrainingRequest $request, CboTraining $cbotraining)
    {
        $data = $request->validated();
        $cbotraining->update($data);
        return redirect()->back()->with('success', 'CboTraining updated successfully.');
    }
}
