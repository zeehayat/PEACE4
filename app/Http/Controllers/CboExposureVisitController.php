<?php

namespace App\Http\Controllers;

use App\Http\Requests\CboExposureVisitRequest;
use App\Models\CboExposureVisit;
use App\Services\CboExposureVisitService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CboExposureVisitController extends Controller
{
    public function __construct(protected CboExposureVisitService $service) {}
    public function index(Request $request)
    {
        $visits = CboExposureVisit::with('cbo', 'media')->latest()->paginate(10000);

        return Inertia::render('CboExposureVisit/Index', [
            'visits' => $visits,
        ]);
    }
    public function create()
    {
        return Inertia::render('CboExposureVisit/Create', [
            'cbos' => \App\Models\Cbo::all(['id', 'reference_code']),
        ]);
    }

    public function store(CboExposureVisitRequest $request)
    {
        $data = $request->validated();
        $visit = $this->service->create($data);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $visit->addMedia($file)->toMediaCollection('attachments');
            }
        }

        return redirect()->route('cbo.exposure-visits.index')->with('success', 'Visit created.');
    }

    public function edit(CboExposureVisit $exposureVisit)
    {
        return Inertia::render('CboExposureVisit/Edit', [
            'visit' => $exposureVisit->load('media'),
            'cbos' => \App\Models\Cbo::all(['id', 'reference_code']),
        ]);
    }

    public function update(CboExposureVisitRequest $request, CboExposureVisit $exposureVisit)
    {
        $data = $request->validated();
        $this->service->update($exposureVisit, $data);

        if ($request->filled('removed_attachments')) {
            foreach ($request->removed_attachments as $id) {
                $exposureVisit->getMedia('attachments')->where('id', $id)->first()?->delete();
            }
        }

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $exposureVisit->addMedia($file)->toMediaCollection('attachments');
            }
        }

        return redirect()->route('cbo.exposure-visits.index')->with('success', 'Visit updated.');
    }



    public function destroy(CboExposureVisit $exposureVisit)
    {
        $this->service->delete($exposureVisit);

        return redirect()->back()->with('success', 'Visit deleted.');
    }
}
