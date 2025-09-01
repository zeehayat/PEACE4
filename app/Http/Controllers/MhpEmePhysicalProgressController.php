<?php

namespace App\Http\Controllers;

use App\Models\MhpEmePhysicalProgress;
use App\Models\MhpSite;
use App\Services\MhpEmeProgressService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MhpEmePhysicalProgressController extends Controller
{
    protected $emeService;

    public function __construct(MhpEmeProgressService $emeService)
    {
        $this->emeService = $emeService;
    }

    public function index(Request $request, MhpSite $site)
    {
        $this->authorize('viewAny', [MhpEmePhysicalProgress::class, $site]);

        $progresses = MhpEmePhysicalProgress::where('mhp_site_id', $site->id)
            ->orderBy('date', 'desc')
            ->with('media')
            ->get();

        $progresses->transform(function ($progress) {
            $progress->attachments = $progress->attachments_frontend;
            return $progress;
        });

        return response()->json([
            'emePhysicalProgresses' => $progresses,
        ]);
    }

    public function store(Request $request, MhpSite $site)
    {
        $this->authorize('create', [MhpEmePhysicalProgress::class, $site]);

        $validated = $request->validate([
            'milestone_percent' => 'required|numeric|between:0,100',
            'date' => 'nullable|date',
            'works' => 'nullable|string',
            'remarks' => 'nullable|string',
            'attachments.*' => 'file|max:10240'
        ]);

        try {
            $progress = $this->emeService->create($validated);
            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $progress->addMedia($file)->toMediaCollection('attachments');
                }
            }
            return redirect()->back()->with('success', 'EME physical progress saved.');
        } catch (\Exception $e) {
            Log::error('Error creating EME physical progress: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to save EME physical progress: ' . $e->getMessage());
        }
    }

    public function update(Request $request, MhpSite $site, MhpEmePhysicalProgress $eme_progress)
    {
        $this->authorize('update', $eme_progress);

        $validated = $request->validate([
            'milestone_percent' => 'required|numeric|between:0,100',
            'date' => 'nullable|date',
            'works' => 'nullable|string',
            'remarks' => 'nullable|string',
            'attachments.*' => 'file|max:10240'
        ]);

        try {
            $this->emeService->update($eme_progress, $validated);

            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $eme_progress->addMedia($file)->toMediaCollection('attachments');
                }
            }
            return redirect()->back()->with('success', 'EME physical progress updated.');
        } catch (\Exception $e) {
            Log::error('Error updating EME physical progress: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to update EME physical progress: ' . $e->getMessage());
        }
    }

    public function destroy(MhpSite $site, MhpEmePhysicalProgress $eme_progress)
    {
        $this->authorize('delete', $eme_progress);

        try {
            $this->emeService->delete($eme_progress);
            return redirect()->back()->with('success', 'EME physical progress deleted.');
        } catch (\Exception $e) {
            Log::error('Error deleting EME physical progress: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete EME physical progress: ' . $e->getMessage());
        }
    }
}
