<?php

namespace App\Http\Controllers;

use App\Models\MhpEmePhysicalProgress;
use App\Models\MhpSite;
use Illuminate\Http\Request;

class MhpEmePhysicalProgressController extends Controller
{
    public function index(Request $request)
    {
        $site = MhpSite::findOrFail($request->get('site_id'));
        $this->authorize('viewAny', [MhpEmePhysicalProgress::class, $site]);
        //$siteId = $request->get('site_id');

        $progresses = MhpEmePhysicalProgress::where('mhp_site_id', $site->id)
            ->orderBy('milestone_percent')
            ->with('media')
            ->get();

        return response()->json($progresses);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mhp_site_id' => 'required|exists:mhp_sites,id',
            'milestone_percent' => 'required|in:25,50,75,100',
            'date' => 'nullable|date',
            'works' => 'nullable|string',
            'remarks' => 'nullable|string',
            'attachments.*' => 'file|max:10240'
        ]);
        $site = MhpSite::findOrFail($validated['mhp_site_id']);
        $this->authorize('create', [MhpEmePhysicalProgress::class, $site]);
        $progress = MhpEmePhysicalProgress::create($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $progress->addMedia($file)->toMediaCollection();
            }
        }

        return back()->with('success', 'Physical progress saved.');
    }

    public function update(Request $request, MhpEmePhysicalProgress $progress)
    {
        $this->authorize('update', $progress);

        $validated = $request->validate([
            'date' => 'nullable|date',
            'works' => 'nullable|string',
            'remarks' => 'nullable|string',
            'attachments.*' => 'file|max:10240'
        ]);

        $progress->update($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $progress->addMedia($file)->toMediaCollection();
            }
        }

        return back()->with('success', 'Physical progress updated.');
    }

    public function destroy(MhpEmePhysicalProgress $progress)
    {
        $this->authorize('delete', $progress);

        $progress->delete();
        return back()->with('success', 'Physical progress deleted.');
    }
}
