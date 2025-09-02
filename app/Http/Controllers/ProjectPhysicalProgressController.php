<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectPhysicalProgressRequest;
use App\Http\Requests\UpdateProjectPhysicalProgressRequest;
use App\Models\MhpSite;
use App\Models\ProjectPhysicalProgress;
use App\Services\MhpSiteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProjectPhysicalProgressController extends Controller
{
    protected $mhpSiteService;

    public function __construct(MhpSiteService $mhpSiteService)
    {
        $this->mhpSiteService = $mhpSiteService;
    }

    /**
     * Display a listing of physical progress entries for a specific MHP Site.
     */
    public function index(Request $request, MhpSite $site)
    {
        $paymentFor = $request->string('payment_for')->value();

        $query = $site->physicalProgresses()   // ✅ use morphMany relation
        ->when($paymentFor, fn($q) => $q->where('payment_for', $paymentFor))
            ->with(['activity', 'media'])      // if you use Spatie media
            ->orderByDesc('progress_date')
            ->orderByDesc('id');

        $progresses = $query->get();

        if ($request->wantsJson()) {
            return response()->json([
                'physicalProgresses' => $progresses->map(function ($p) {
                    return [
                        'id' => $p->id,
                        'progress_percentage' => (float) $p->progress_percentage,
                        'progress_date' => optional($p->progress_date)->toDateString(),
                        'payment_for' => $p->payment_for,
                        'remarks' => $p->remarks,
                        'works' => $p->works,
                        'activity' => $p->activity ? [
                            'id' => $p->activity->id ?? null,
                            'name' => $p->activity->name ?? null,
                        ] : null,
                        'attachments_frontend' => method_exists($p, 'getMedia')
                            ? $p->getMedia('attachments')->map(fn($m) => [
                                'id' => $m->id,
                                'file_name' => $m->file_name,
                                'url' => $m->getUrl(),
                                'size' => $m->size,
                                'created_at' => $m->created_at?->toDateTimeString(),
                            ])
                            : [],
                    ];
                }),
            ]);
        }

        // Optional Inertia page, if you use it elsewhere
        // return Inertia::render(...);
    }


    /**
     * Store a newly created Project Physical Progress record in storage.
     */
    public function store(Request $request, MhpSite $site)
    {
        $data = $request->validate([
            'progress_percentage' => ['required','numeric','between:0,100'],
            'progress_date' => ['required','date'],
            'remarks' => ['nullable','string'],
            'works' => ['nullable','string'],
            'payment_for' => ['required','in:T&D,EME,Civil'],
            'activity_id' => ['nullable','integer'],
            'activity_type' => ['nullable','string'],
            // attachments handled separately if using Spatie
        ]);

        // ✅ Create via the morphMany relation (will set projectable_id/type)
        $progress = $site->physicalProgresses()->create($data);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $progress->addMedia($file)->toMediaCollection('attachments');
            }
        }

        return back()->with('success', 'Physical Progress recorded successfully!');
    }


    /**
     * Display the specified Project Physical Progress.
     */
    public function show(ProjectPhysicalProgress $physicalProgress)
    {
        $physicalProgress->load(['activity', 'media']);
        $physicalProgress->attachments = $physicalProgress->attachments_frontend;
        if ($physicalProgress->activity_type === \App\Models\TAndDWork::class && $physicalProgress->activity) {
            $physicalProgress->activity->attachments = $physicalProgress->activity->attachments_frontend;
        }

        return response()->json($physicalProgress);
    }

    /**
     * Update the specified Project Physical Progress record in storage.
     */
    public function update(Request $request, MhpSite $site, ProjectPhysicalProgress $physicalProgress)
    {
        // Optional safety: ensure it belongs to this site
        if ($physicalProgress->projectable_type !== MhpSite::class || $physicalProgress->projectable_id !== $site->id) {
            abort(404);
        }

        $data = $request->validate([
            'progress_percentage' => ['required','numeric','between:0,100'],
            'progress_date' => ['required','date'],
            'remarks' => ['nullable','string'],
            'works' => ['nullable','string'],
            'payment_for' => ['required','in:T&D,EME,Civil'],
            'activity_id' => ['nullable','integer'],
            'activity_type' => ['nullable','string'],
        ]);

        $physicalProgress->update($data);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $physicalProgress->addMedia($file)->toMediaCollection('attachments');
            }
        }

        return back()->with('success', 'Physical Progress updated successfully!');
    }


    /**
     * Remove the specified Project Physical Progress record from storage.
     */
    public function destroy(ProjectPhysicalProgress $physicalProgress)
    {
        try {
            $physicalProgress->delete();
            return redirect()->back()->with('success', 'Physical Progress deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Physical Progress: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Failed to delete Physical Progress: ' . $e->getMessage());
        }
    }
}
