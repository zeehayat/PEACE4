<?php

namespace App\Http\Controllers;

use App\Models\MhpSite;
use App\Http\Requests\MhpSiteRequest;
use Illuminate\Http\Request;

class MhpSiteController extends Controller
{
    public function store(MhpSiteRequest $request)
    {
        $data = $request->validated();
        MhpSite::create($data);
        return redirect()->back()->with('success', 'MhpSite created successfully.');
    }

    public function update(MhpSiteRequest $request, MhpSite $mhpsite)
    {
        $data = $request->validated();
        $mhpsite->update($data);
        return redirect()->back()->with('success', 'MhpSite updated successfully.');
    }
}
