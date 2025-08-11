<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectPhysicalProgressRequest;
use App\Models\MhpSite;
use App\Services\ProjectProgressService;
use Illuminate\Http\Request;

class MhpProjectPhysicalProgressController extends Controller
{
    public function __construct(private ProjectProgressService $service) {}

    public function store(StoreProjectPhysicalProgressRequest $request, MhpSite $mhpSite)
    {
        $this->service->createPhysicalProgress($mhpSite, $request->validated());
        return back()->with('success', 'Physical Progress recorded successfully!');
    }

}
