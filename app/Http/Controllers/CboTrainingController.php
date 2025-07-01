<?php

namespace App\Http\Controllers;

use App\Models\CboTraining;
use App\Http\Requests\CboTrainingRequest;
use Illuminate\Http\Request;

class CboTrainingController extends Controller
{
    public function index($cboId)
    {
        return CboTraining::with('media')
            ->where('cbo_id', $cboId)
            ->orderByDesc('date_of_training')
            ->get();
    }

    public function store(CboTrainingRequest $request)
    {
        $data = $request->validated();

        $training = CboTraining::create($data);

        if ($request->hasFile('attachments')) {
            $training->addMultipleMediaFromRequest(['attachments'])
                ->each(fn($fileAdder) => $fileAdder->toMediaCollection());
        }

        return redirect()->back()->with('success', 'CboTraining created successfully.');


    }

    public function update(CboTrainingRequest $request, CboTraining $cbotraining)
    {
        $data = $request->validated();
        $cbotraining->update($data);
        return redirect()->back()->with('success', 'CboTraining updated successfully.');
    }
}
