<?php

namespace App\Http\Controllers;

use App\Models\MhpEmeProgress;
use Illuminate\Http\Request;

class MhpEmeProgressController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mhp_site_id' => 'required|exists:mhp_sites,id',
            'milestone_percent' => 'required|integer|in:25,50,75,100',
            'progress_date' => 'nullable|date',
            'remarks' => 'nullable|string',
        ]);

        $progress = MhpEmeProgress::create($validated);

        // Handle file attachments (if any)
        // Example: $progress->attachments()->create([...]);

        return response()->json($progress, 201);
    }

    public function index($mhpSiteId)
    {
        return MhpEmeProgress::where('mhp_site_id', $mhpSiteId)->with('attachments')->get();
    }

    public function destroy(MhpEmeProgress $mhpEmeProgress)
    {
        $mhpEmeProgress->delete();
        return response()->noContent();
    }
}
