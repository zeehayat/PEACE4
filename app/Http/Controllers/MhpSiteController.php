<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\MhpSite;
use App\Http\Requests\MhpSiteRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MhpSiteController extends Controller
{
    public function index(Request $request)
    {
        $query = MhpSite::query()
            ->with([
                'cbo',
                'adminApproval.media',
                'completion.media',  // eager-load completion + its media
                'media',
                'physicalProgresses.media', // Eager load physical progress and its media
                'financialInstallments.media' // Eager load financial installments and its media
            ]);

        if ($request->filled('cbo')) {
            $query->whereHas('cbo', fn ($q) =>
            $q->where('reference_code', 'like', "%{$request->cbo}%")
            );
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $mhpSites = $query->paginate(50)->withQueryString();

        $mhpSites->getCollection()->transform(function ($site) {
            // site attachments
            $site->attachments = $site->getMedia('attachments')->map(fn ($m) => [
                'id' => $m->id,
                'name' => $m->name,
                'file_name' => $m->file_name,
                'url' => $m->getUrl(),
                'size' => $m->size,
            ]);

            // adminApproval attachments
            if ($site->adminApproval) {
                $site->adminApproval->attachments = $site->adminApproval->getMedia('attachments')->map(fn ($m) => [
                    'id' => $m->id,
                    'name' => $m->name,
                    'file_name' => $m->file_name,
                    'url' => $m->getUrl(),
                    'size' => $m->size,
                ]);
            }

            // completion attachments
            if ($site->completion) {
                $site->completion->attachments = $site->completion->getMedia('attachments')->map(fn ($m) => [
                    'id' => $m->id,
                    'name' => $m->name,
                    'file_name' => $m->file_name,
                    'url' => $m->getUrl(),
                    'size' => $m->size,
                ]);
            }

            // Eager load and map physicalProgresses attachments
            // This transformation makes sure `site.physicalProgresses` has the `attachments` directly
            if ($site->physicalProgresses) {
                $site->physicalProgresses = $site->physicalProgresses->map(fn ($progress) => [
                    'id' => $progress->id,
                    'projectable_id' => $progress->projectable_id,
                    'projectable_type' => $progress->projectable_type,
                    'progress_percentage' => $progress->progress_percentage,
                    'progress_date' => $progress->progress_date,
                    'remarks' => $progress->remarks,
                    'project_type' => $progress->project_type,
                    'reference_code' => $progress->reference_code,
                    'attachments' => $progress->getMedia('attachments')->map(fn ($m) => [
                        'id' => $m->id,
                        'name' => $m->file_name,
                        'url' => $m->getUrl(),
                    ]),
                ]);
            }

            // Eager load and map financialInstallments attachments
            // This transformation makes sure `site.financialInstallments` has the `attachments` directly
            if ($site->financialInstallments) {
                $site->financialInstallments = $site->financialInstallments->map(fn ($installment) => [
                    'id' => $installment->id,
                    'projectable_id' => $installment->projectable_id,
                    'projectable_type' => $installment->projectable_type,
                    'installment_number' => $installment->installment_number,
                    'installment_date' => $installment->installment_date,
                    'installment_amount' => $installment->installment_amount,
                    'category' => $installment->category,
                    'remarks' => $installment->remarks,
                    'attachments' => $installment->getMedia('attachments')->map(fn ($m) => [
                        'id' => $m->id,
                        'name' => $m->file_name,
                        'url' => $m->getUrl(),
                    ]),
                ]);
            }

            // project_id
            $site->project_id = ($site->cbo->reference_code ?? 'N/A') . '/' . $site->id;

            return $site;
        });

        return Inertia::render('MhpSite/Index', [
            'mhpSites' => $mhpSites,
            'filters' => $request->only('cbo', 'status'),
        ]);
    }




    public function autoSearch(Request $request)
    {
        $search = $request->input('search');

        $cbos = Cbo::query()
            ->when($search, fn ($q) =>
            $q->where('reference_code', 'like', "%{$search}%")
            )
            ->orderBy('reference_code')
            ->limit(20)
            ->get(['id', 'reference_code']); // fetch only necessary columns

        return response()->json($cbos);
    }

    public function create() {
        return Inertia::render('MhpSite/MhpSite');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cbo_id' => 'required|exists:cbos,id',
            'population' => 'nullable|numeric',
            'grid_status' => 'required|string',
            'status' => 'required|string',
            'existing_capacity_kw' => 'nullable|numeric',
            'planned_capacity_kw' => 'nullable|numeric',
            'head_ft' => 'nullable|numeric',
            'design_discharge_cusecs' => 'nullable|numeric',
            'channel_length_km' => 'nullable|numeric',
            'tl_ht_km' => 'nullable|numeric',
            'tl_lt_km' => 'nullable|numeric',
            'transformers' => 'nullable|numeric',
            'turbine_type' => 'nullable|string',
            'alternator_type' => 'nullable|string',
            'accessible' => 'nullable|string',
            'domestic_units' => 'nullable|numeric',
            'commercial_units' => 'nullable|numeric',
            'estimated_cost' => 'nullable|numeric',
            'per_kw_cost' => 'nullable|numeric',
            'total_hh' => 'nullable|numeric',
            'avg_hh_size' => 'nullable|numeric',
            'cost_per_capita' => 'nullable|numeric',
            'tentative_completion_date' => 'required|date',
            'month_year_establishment' => 'required|date',
            'established_by' => 'required|string',
            'attachments.*' => 'nullable|file|max:20480', // max 20MB per file
        ]);
        unset($validated['attachments']);

        $site = MhpSite::create($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $site->addMedia($file)->toMediaCollection('attachments');
            }
        }

        return redirect()->route('mhp.mhp-sites.index')->with('success', 'MHP Site created!');
    }



    public function update(Request $request, $id)
    {
        $site = MhpSite::findOrFail($id);

        $validated = $request->validate([
            'cbo_id' => 'required|exists:cbos,id',
            'population' => 'nullable|numeric',
            'grid_status' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'existing_capacity_kw' => 'nullable|numeric',
            'planned_capacity_kw' => 'nullable|numeric',
            'head_ft' => 'nullable|numeric',
            'design_discharge_cusecs' => 'nullable|numeric',
            'channel_length_km' => 'nullable|numeric',
            'tl_ht_km' => 'nullable|numeric',
            'tl_lt_km' => 'nullable|numeric',
            'transformers' => 'nullable|numeric',
            'turbine_type' => 'nullable|string|max:255',
            'alternator_type' => 'nullable|string|max:255',
            'accessible' => 'nullable|string|in:YES,NO',
            'domestic_units' => 'nullable|numeric',
            'commercial_units' => 'nullable|numeric',
            'estimated_cost' => 'nullable|numeric',
            'per_kw_cost' => 'nullable|numeric',
            'total_hh' => 'nullable|numeric',
            'avg_hh_size' => 'nullable|numeric',
            'cost_per_capita' => 'nullable|numeric',
            'tentative_completion_date' => 'nullable|date',
            'established_by' => 'nullable|string|max:255',
            'month_year_establishment' => 'nullable|date',
            'attachments.*' => 'nullable|file|max:20480',
        ]);
        unset($validated['attachments']);

        $site->update($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $site->addMedia($file)->toMediaCollection('attachments');
            }
        }

        return back()->with('success', 'MHP site updated successfully.');
    }


}
