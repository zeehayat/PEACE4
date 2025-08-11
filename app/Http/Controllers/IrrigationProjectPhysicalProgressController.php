<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectPhysicalProgressRequest;
use App\Models\IrrigationScheme;
use App\Services\ProjectProgressService;
use Illuminate\Http\Request;

class IrrigationProjectPhysicalProgressController extends Controller
{
    public function __construct(private ProjectProgressService $service) {}

    public function store(StoreProjectPhysicalProgressRequest $request, IrrigationScheme $scheme)
    {
        $this->service->createPhysicalProgress($scheme, $request->validated());
        return back()->with('success', 'Physical Progress recorded successfully!');
    }
}
