<?php

namespace App\Http\Controllers;

use App\Http\Requests\TAndDWorkRequest;
use App\Http\Requests\UpdateTAndDWorkRequest;
use App\Models\MhpSite; // Assuming T&D works are primarily associated with MHP Sites for now
use App\Models\TAndDWork;
use App\Services\MhpSiteService; // Import the service
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class TAndDWorkController extends Controller
{
    public function __construct(private MhpSiteService $mhpSiteService) {}

    // /mhp/sites/{site}/t-and-d-works
    public function index(Request $request, MhpSite $site)
    {
        $query = $site->tAndDWorks()->with('media')
            ->latest('date_of_initiation')
            ->latest('id');

        // Return JSON for selects/modals
        if ($request->wantsJson() || $request->boolean('only_data')) {
            $works = $query->get();

            return response()->json([
                'tAndDWorks' => $works->map(fn($w) => [
                    'id' => $w->id,
                    'name' => $w->name,
                    'label' => $w->name ?: "T&D Work #{$w->id}",
                ]),
                'fullTAndDWorks' => $works->map(function ($w) {
                    return array_merge($w->toArray(), [
                        'attachments' => method_exists($w, 'attachments_frontend')
                            ? $w->attachments_frontend
                            : [],
                    ]);
                }),
            ]);
        }

        // Inertia view
        $tAndDWorks = $query->paginate(10);
        $tAndDWorks->getCollection()->transform(function ($w) {
            $w->attachments = $w->attachments_frontend ?? [];
            return $w;
        });

        return Inertia::render('MHP/TAndD/Index', [
            'mhpSite' => $site->only('id','project_id','name'),
            'tAndDWorks' => $tAndDWorks,
        ]);
    }

    // POST /mhp/sites/{site}/t-and-d-works
    public function store(TAndDWorkRequest $request, MhpSite $site)
    {
        try {
            $data = $request->validated();

            // Attach via morphMany
            $work = $site->tAndDWorks()->create($data);

            // attachments (if using Spatie)
            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $work->addMedia($file)->toMediaCollection('attachments');
                }
            }

            return back()->with('success', 'T&D Work created successfully!');
        } catch (\Throwable $e) {
            Log::error('Error creating T&D Work: '.$e->getMessage(), ['exception' => $e]);
            return back()->with('error', 'Failed to create T&D Work: '.$e->getMessage());
        }
    }

    // PUT /mhp/sites/{site}/t-and-d-works/{t_and_d_work}
    public function update(UpdateTAndDWorkRequest $request, MhpSite $site, TAndDWork $t_and_d_work)
    {
        // Optional ownership guard
        if ($t_and_d_work->projectable_type !== 'mhp_site' || $t_and_d_work->projectable_id !== $site->id) {
            abort(404);
        }

        try {
            $work = $this->mhpSiteService->updateTAndDWork($t_and_d_work, $request->validated());
            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $work->addMedia($file)->toMediaCollection('attachments');
                }
            }
            return back()->with('success', 'T&D Work updated successfully!');
        } catch (\Throwable $e) {
            Log::error('Error updating T&D Work: '.$e->getMessage(), ['exception' => $e]);
            return back()->with('error', 'Failed to update T&D Work: '.$e->getMessage());
        }
    }

    // DELETE /mhp/sites/{site}/t-and-d-works/{t_and_d_work}
    public function destroy(MhpSite $site, TAndDWork $t_and_d_work)
    {
        // Optional ownership guard
        if ($t_and_d_work->projectable_type !== 'mhp_site' || $t_and_d_work->projectable_id !== $site->id) {
            abort(404);
        }

        try {
            $this->mhpSiteService->deleteTAndDWork($t_and_d_work);
            return back()->with('success', 'T&D Work deleted successfully!');
        } catch (\Throwable $e) {
            Log::error('Error deleting T&D Work: '.$e->getMessage(), ['exception' => $e]);
            return back()->with('error', 'Failed to delete T&D Work: '.$e->getMessage());
        }
    }

    // If you keep it
    public function show(TAndDWork $t_and_d_work)
    {
        $t_and_d_work->load('media');
        $t_and_d_work->attachments = $t_and_d_work->attachments_frontend ?? [];
        return response()->json($t_and_d_work);
    }
}
