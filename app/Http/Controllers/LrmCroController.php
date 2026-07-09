<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLrmCroRequest;
use App\Http\Requests\UpdateLrmCroRequest;
use App\Models\LrmCommittee;
use App\Models\LrmCro;
use App\Services\LrmCroService;

class LrmCroController extends Controller
{
    protected LrmCroService $service;

    public function __construct(LrmCroService $service)
    {
        $this->service = $service;
        $this->authorizeResource(LrmCro::class, 'cro');
    }

    public function index(LrmCommittee $lrmCommittee)
    {
        return response()->json(
            $lrmCommittee->lrmCros()->orderBy('name')->get()
        );
    }

    public function store(StoreLrmCroRequest $request, LrmCommittee $lrmCommittee)
    {
        $this->service->createCro($lrmCommittee, $request->validated());
        return redirect()->back()->with('success', 'CRO recorded successfully!');
    }

    public function update(UpdateLrmCroRequest $request, LrmCommittee $lrmCommittee, LrmCro $cro)
    {
        $this->service->updateCro($cro, $request->validated());
        return redirect()->back()->with('success', 'CRO updated successfully!');
    }

    public function destroy(LrmCommittee $lrmCommittee, LrmCro $cro)
    {
        $this->service->deleteCro($cro);
        return redirect()->back()->with('success', 'CRO deleted successfully!');
    }
}
