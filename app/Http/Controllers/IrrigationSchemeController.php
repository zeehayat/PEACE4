<?php

namespace App\Http\Controllers;

use App\Models\Cbo;
use App\Models\IrrigationScheme;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class IrrigationSchemeController extends Controller
{
    public function index(Request $request)
    {
        $query = IrrigationScheme::query()
            ->with([
                'cbo',
                'media', // For direct attachments to the scheme
                'physicalProgresses.media', // Polymorphic relation for physical progress
                'financialInstallments.media', // Polymorphic relation for financial installments
                'irrigationAdminApproval.media', // Eager load irrigation admin approval and its media
                'irrigationCompletion.media',   // Eager load irrigation completion and its media
                'irrigationSchemeContract.vendor', // Eager load contract and its vendor
            ]);

        // Add search/filter logic similar to MhpSiteController
        if ($request->filled('cbo')) {
            $query->whereHas('cbo', fn ($q) =>
            $q->where('reference_code', 'like', "%{$request->cbo}%")
            );
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) { // Added general search functionality
            $searchTerm = '%' . $request->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('id', 'like', $searchTerm)
                    ->orWhere('status', 'like', $searchTerm)
                    ->orWhere('beneficiary_farmers', 'like', $searchTerm)
                    ->orWhere('channel_length_km', 'like', $searchTerm)
                    ->orWhere('land_area_hectares', 'like', $searchTerm)
                    ->orWhereHas('cbo', fn ($qCbo) =>
                    $qCbo->where('reference_code', 'like', $searchTerm)
                        ->orWhere('district', 'like', $searchTerm)
                    );
            });
        }


        $irrigationSchemes = $query->paginate(50)->withQueryString();

        $irrigationSchemes->getCollection()->transform(function ($scheme) {
            // Scheme attachments
            $scheme->attachments = $scheme->getMedia('attachments')->map(fn ($m) => [
                'id' => $m->id, 'name' => $m->name, 'file_name' => $m->file_name, 'url' => $m->getUrl(), 'size' => $m->size,
            ]);

            // Transform irrigationAdminApproval and its media
            if ($scheme->irrigationAdminApproval) {
                $scheme->irrigationAdminApproval->attachments = $scheme->irrigationAdminApproval->getMedia('attachments')->map(fn ($m) => [
                    'id' => $m->id, 'name' => $m->name, 'file_name' => $m->file_name, 'url' => $m->getUrl(), 'size' => $m->size,
                ]);
            }
            // Transform irrigationCompletion and its media
            if ($scheme->irrigationCompletion) {
                $scheme->irrigationCompletion->attachments = $scheme->irrigationCompletion->getMedia('attachments')->map(fn ($m) => [
                    'id' => $m->id, 'name' => $m->name, 'file_name' => $m->file_name, 'url' => $m->getUrl(), 'size' => $m->size,
                ]);
            }

            // Transform physicalProgresses attachments (reusable logic)
            if ($scheme->physicalProgresses) {
                $scheme->physicalProgresses = $scheme->physicalProgresses->map(fn ($progress) => [
                    'id' => $progress->id, 'projectable_id' => $progress->projectable_id, 'projectable_type' => $progress->projectable_type,
                    'progress_percentage' => $progress->progress_percentage, 'progress_date' => $progress->progress_date,
                    'remarks' => $progress->remarks, 'project_type' => $progress->project_type, 'reference_code' => $progress->reference_code,
                    'attachments' => $progress->getMedia('attachments')->map(fn ($m) => [
                        'id' => $m->id, 'name' => $m->file_name, 'url' => $m->getUrl(),
                    ]),
                ]);
            }

            // Transform financialInstallments attachments (reusable logic)
            if ($scheme->financialInstallments) {
                $scheme->financialInstallments = $scheme->financialInstallments->map(fn ($installment) => [
                    'id' => $installment->id, 'projectable_id' => $installment->projectable_id, 'projectable_type' => $installment->projectable_type,
                    'installment_number' => $installment->installment_number, 'installment_date' => $installment->installment_date,
                    'installment_amount' => $installment->installment_amount, 'category' => $installment->category, 'remarks' => $installment->remarks,
                    'attachments' => $installment->getMedia('attachments')->map(fn ($m) => [
                        'id' => $m->id, 'name' => $m->file_name, 'url' => $m->getUrl(),
                    ]),
                ]);
            }

            // Transform irrigationSchemeContract (if exists)
            if ($scheme->irrigationSchemeContract) {
                $scheme->irrigationSchemeContract = [
                    'id' => $scheme->irrigationSchemeContract->id,
                    'vendor_name' => $scheme->irrigationSchemeContract->vendor->name ?? 'N/A',
                    'date_civil_work_initiation' => $scheme->irrigationSchemeContract->date_civil_work_initiation,
                    'contract_amount' => $scheme->irrigationSchemeContract->contract_amount,
                ];
            }


            // Project ID (adapted for irrigation scheme, using IR- prefix for clarity)
            $scheme->project_id = ($scheme->cbo->reference_code ?? 'N/A') . '/IR-' . $scheme->id;


            return $scheme;
        });

        return Inertia::render('IrrigationScheme/Index', [
            'irrigationSchemes' => $irrigationSchemes,
            'filters' => $request->only('cbo', 'status', 'search'),
        ]);
    }

    public function create()
    {
        // This method might not be directly used if creation is always via modal
        return Inertia::render('IrrigationScheme/IrrigationScheme'); // Assuming an IrrigationScheme.vue page exists
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cbo_id' => 'required|exists:cbos,id',
            'status' => 'required|in:New,Rehabilitation',
            'beneficiary_farmers' => 'nullable|integer',
            'channel_length_km' => 'nullable|numeric',
            'land_area_hectares' => 'nullable|numeric',
            // New fields from migrations
            'month_year_establishment' => 'nullable|date',
            'established_by' => 'nullable|string',
            'date_technical_surveys' => 'nullable|date',
            'date_completion_civil_works' => 'nullable|date',
            'handover_to_community_date' => 'nullable|date',
            'northening' => 'nullable|numeric',
            'easting' => 'nullable|numeric',
            'elevation' => 'nullable|numeric',
            'attachments.*' => 'nullable|file|max:20480',
        ]);

        try {
            DB::transaction(function () use ($request, $validated) {
                $scheme = new IrrigationScheme();
                $scheme->fill($validated); // Use fill() for mass assignment with new fields
                $scheme->save();

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $scheme->addMedia($file)->toMediaCollection('attachments');
                    }
                }
            });

            return redirect()->back()->with('success', 'Irrigation Scheme created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating Irrigation Scheme: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create Irrigation Scheme: ' . $e->getMessage());
        }
    }

    public function show(IrrigationScheme $irrigationScheme)
    {
        $irrigationScheme->load([
            'cbo', 'media', 'physicalProgresses.media', 'financialInstallments.media',
            'irrigationAdminApproval.media', 'irrigationCompletion.media', 'irrigationSchemeContract.vendor'
        ]);

        // Transform collections for attachments (reused logic)
        $irrigationScheme->attachments = $irrigationScheme->getMedia('attachments')->map(fn ($m) => [
            'id' => $m->id, 'name' => $m->name, 'file_name' => $m->file_name, 'url' => $m->getUrl(), 'size' => $m->size,
        ]);
        if ($irrigationScheme->irrigationAdminApproval) {
            $irrigationScheme->irrigationAdminApproval->attachments = $irrigationScheme->irrigationAdminApproval->getMedia('attachments')->map(fn ($m) => [
                'id' => $m->id, 'name' => $m->name, 'file_name' => $m->file_name, 'url' => $m->getUrl(), 'size' => $m->size,
            ]);
        }
        if ($irrigationScheme->irrigationCompletion) {
            $irrigationScheme->irrigationCompletion->attachments = $irrigationScheme->irrigationCompletion->getMedia('attachments')->map(fn ($m) => [
                'id' => $m->id, 'name' => $m->name, 'file_name' => $m->file_name, 'url' => $m->getUrl(), 'size' => $m->size,
            ]);
        }
        if ($irrigationScheme->physicalProgresses) {
            $irrigationScheme->physicalProgresses = $irrigationScheme->physicalProgresses->map(fn ($progress) => [
                'id' => $progress->id, 'progress_percentage' => $progress->progress_percentage, 'progress_date' => $progress->progress_date, 'remarks' => $progress->remarks, 'project_type' => $progress->project_type, 'reference_code' => $progress->reference_code, 'attachments' => $progress->getMedia('attachments')->map(fn ($m) => [
                    'id' => $m->id, 'name' => $m->file_name, 'url' => $m->getUrl(),
                ]),
            ]);
        }
        if ($irrigationScheme->financialInstallments) {
            $irrigationScheme->financialInstallments = $irrigationScheme->financialInstallments->map(fn ($installment) => [
                'id' => $installment->id, 'installment_number' => $installment->installment_number, 'installment_date' => $installment->installment_date, 'installment_amount' => $installment->installment_amount, 'category' => $installment->category, 'remarks' => $installment->remarks, 'attachments' => $installment->getMedia('attachments')->map(fn ($m) => [
                    'id' => $m->id, 'name' => $m->file_name, 'url' => $m->getUrl(),
                ]),
            ]);
        }
        // Transform irrigationSchemeContract (if exists)
        if ($irrigationScheme->irrigationSchemeContract) {
            $irrigationScheme->irrigationSchemeContract = [
                'id' => $irrigationScheme->irrigationSchemeContract->id,
                'vendor_name' => $irrigationScheme->irrigationSchemeContract->vendor->name ?? 'N/A',
                'date_civil_work_initiation' => $irrigationScheme->irrigationSchemeContract->date_civil_work_initiation,
                'contract_amount' => $irrigationScheme->irrigationSchemeContract->contract_amount,
            ];
        }


        $irrigationScheme->project_id = ($irrigationScheme->cbo->reference_code ?? 'N/A') . '/IR-' . $irrigationScheme->id;

        return Inertia::render('IrrigationScheme/Show', ['irrigationScheme' => $irrigationScheme]);
    }

    public function update(Request $request, IrrigationScheme $irrigationScheme)
    {
        $validated = $request->validate([
            'cbo_id' => 'required|exists:cbos,id',
            'status' => 'required|in:New,Rehabilitation',
            'beneficiary_farmers' => 'nullable|integer',
            'channel_length_km' => 'nullable|numeric',
            'land_area_hectares' => 'nullable|numeric',
            'month_year_establishment' => 'nullable|date',
            'established_by' => 'nullable|string',
            'date_technical_surveys' => 'nullable|date',
            'date_completion_civil_works' => 'nullable|date', // This field is now on completion
            'handover_to_community_date' => 'nullable|date', // This field is now on completion
            'northening' => 'nullable|numeric',
            'easting' => 'nullable|numeric',
            'elevation' => 'nullable|numeric',
            'attachments.*' => 'nullable|file|max:20480',
            'removed_attachments' => 'nullable|array',
            'removed_attachments.*' => 'exists:media,id',
        ]);

        try {
            DB::transaction(function () use ($request, $irrigationScheme, $validated) {
                // Remove fields that are no longer directly on IrrigationScheme
                unset($validated['date_completion_civil_works']);
                unset($validated['handover_to_community_date']);

                $irrigationScheme->fill($validated); // Use fill() for mass assignment
                $irrigationScheme->save();

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $irrigationScheme->addMedia($file)->toMediaCollection('attachments');
                    }
                }
                if ($request->filled('removed_attachments')) {
                    Media::whereIn('id', $request->removed_attachments)
                        ->where('model_type', get_class($irrigationScheme))
                        ->where('model_id', $irrigationScheme->id)
                        ->delete();
                }
            });
            return redirect()->back()->with('success', 'Irrigation Scheme updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating Irrigation Scheme: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update Irrigation Scheme: ' . $e->getMessage());
        }
    }

    public function destroy(IrrigationScheme $irrigationScheme)
    {
        try {
            DB::transaction(function () use ($irrigationScheme) {
                $irrigationScheme->delete();
            });
            return redirect()->back()->with('success', 'Irrigation Scheme deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting Irrigation Scheme: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Irrigation Scheme: ' . $e->getMessage());
        }
    }
}
