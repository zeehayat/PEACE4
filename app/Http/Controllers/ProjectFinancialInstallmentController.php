<?php

namespace App\Http\Controllers;

use App\Models\IrrigationScheme;
use App\Models\MhpSite;
use App\Models\ProjectFinancialInstallment;
use App\Http\Requests\ProjectFinancialInstallmentRequest; // Assuming this request handles validation
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProjectFinancialInstallmentController extends Controller
{
    public function index(Request $request)
    {
        // This index method might need adjustment later based on how you want to list them
        // (e.g., by MHP site, by Irrigation scheme, or all together)
        $items = ProjectFinancialInstallment::latest()->paginate(10);
        return inertia('ProjectFinancialInstallment/Index', compact('items')); // Ensure this Inertia page exists or adjust
    }
    public function store(Request $request)
    {
        $rules = [
            'projectable_id' => 'required',
            'projectable_type' => 'required|string',
            'installment_number' => 'required|integer|min:1',
            'installment_date' => 'required|date',
            'installment_amount' => 'required|numeric|min:0',
            'category' => 'nullable|string|max:255',
            'remarks' => 'nullable|string|max:1000',
            'progress_type' => 'required|in:Civil,T&D',
            'attachments.*' => 'nullable|file|max:20480',
            'removed_attachments' => 'nullable|array',
            'removed_attachments.*' => 'exists:media,id',
        ];

        if ($request->input('progress_type') === 'T&D') {
            $rules['date_of_initiation_of_t_and_d_works'] = 'nullable|date';
            $rules['step_up_transformers'] = 'nullable|array';
            $rules['step_up_transformers.*.kva'] = 'nullable|integer';
            $rules['step_up_transformers.*.count'] = 'nullable|integer';
            $rules['step_down_transformers'] = 'nullable|array';
            $rules['step_down_transformers.*.kva'] = 'nullable|integer';
            $rules['step_down_transformers.*.count'] = 'nullable|integer';
            $rules['ht_poles'] = 'nullable|integer';
            $rules['lt_poles'] = 'nullable|integer';
            $rules['ht_conductor_length_acsr_km'] = 'nullable|numeric';
            $rules['ht_conductor_dia'] = 'nullable|string|max:255';
            $rules['uaac_lt_conductor_length_km'] = 'nullable|numeric';
            $rules['uaac_lt_conductor_dia'] = 'nullable|string|max:255';
        }

        $validatedData = $request->validate($rules);

        try {
            DB::transaction(function () use ($request, $validatedData) {
                $attachments = $request->file('attachments') ?? [];
                $removedAttachments = $validatedData['removed_attachments'] ?? [];

                unset($validatedData['attachments']);
                unset($validatedData['removed_attachments']);

                $tAndDWorkData = [];
                if ($validatedData['progress_type'] === 'T&D') {
                    $tAndDWorkData = [
                        'date_of_initiation_of_t_and_d_works' => $validatedData['date_of_initiation_of_t_and_d_works'] ?? null,
                        'step_up_transformers' => $validatedData['step_up_transformers'] ?? null,
                        // FIX: Corrected syntax from 'step_down_transformers'] = to 'step_down_transformers' =>
                        'step_down_transformers' => $validatedData['step_down_transformers'] ?? null,
                        'ht_poles' => $validatedData['ht_poles'] ?? null,
                        // FIX: Corrected syntax from 'lt_poles'] = to 'lt_poles' =>
                        'lt_poles' => $validatedData['lt_poles'] ?? null,
                        'ht_conductor_length_acsr_km' => $validatedData['ht_conductor_length_acsr_km'] ?? null,
                        'ht_conductor_dia' => $validatedData['ht_conductor_dia'] ?? null,
                        'uaac_lt_conductor_length_km' => $validatedData['uaac_lt_conductor_length_km'] ?? null,
                        // FIX: Corrected syntax from 'uaac_lt_conductor_dia'] = to 'uaac_lt_conductor_dia' =>
                        'uaac_lt_conductor_dia' => $validatedData['uaac_lt_conductor_dia'] ?? null,
                        'remarks' => $validatedData['remarks'] ?? null,
                    ];
                    unset($validatedData['date_of_initiation_of_t_and_d_works']);
                    unset($validatedData['step_up_transformers']);
                    unset($validatedData['step_down_transformers']);
                    unset($validatedData['ht_poles']);
                    unset($validatedData['lt_poles']);
                    unset($validatedData['ht_conductor_length_acsr_km']);
                    unset($validatedData['ht_conductor_dia']);
                    unset($validatedData['uaac_lt_conductor_length_km']);
                    unset($validatedData['uaac_lt_conductor_dia']);
                }

                $projectableModel = null;
                if ($validatedData['projectable_type'] === MhpSite::class) {
                    $projectableModel = MhpSite::findOrFail($validatedData['projectable_id']);
                } elseif ($validatedData['projectable_type'] === IrrigationScheme::class) {
                    $projectableModel = IrrigationScheme::findOrFail($validatedData['projectable_id']);
                }

                if (!$projectableModel) {
                    throw new \Exception("Projectable model not found.");
                }

                $tAndDWork = null;
                if ($validatedData['progress_type'] === 'T&D') {
                    $tAndDWork = $projectableModel->tAndDWorks()->create($tAndDWorkData);
                    $validatedData['t_and_d_work_id'] = $tAndDWork->id;
                }

                $installment = $projectableModel->financialInstallments()->create($validatedData);

                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        if ($file instanceof \Illuminate\Http\UploadedFile) {
                            $installment->addMedia($file)->toMediaCollection('attachments');
                        }
                    }
                }
            });

            return redirect()->back()->with(['success' => 'Financial Installment created successfully!']);
        } catch (\Exception $e) {
            Log::error('Error creating Financial Installment: ' . $e->getMessage() . ' - File: ' . $e->getFile() . ' - Line: ' . $e->getLine());
            return redirect()->back()->with('error', 'Failed to create Financial Installment: ' . $e->getMessage());
        }
    }

    public function update(Request $request, ProjectFinancialInstallment $projectFinancialInstallment)
    {
        $rules = [
            'projectable_id' => 'required',
            'projectable_type' => 'required|string',
            'installment_number' => 'required|integer|min:1',
            'installment_date' => 'required|date',
            'installment_amount' => 'required|numeric|min:0',
            'category' => 'nullable|string|max:255',
            'remarks' => 'nullable|string|max:1000',
            'progress_type' => 'required|in:Civil,T&D',
            'attachments.*' => 'nullable|file|max:20480',
            'removed_attachments' => 'nullable|array',
            'removed_attachments.*' => 'exists:media,id',
        ];

        if ($request->input('progress_type') === 'T&D') {
            $rules['date_of_initiation_of_t_and_d_works'] = 'nullable|date';
            $rules['step_up_transformers'] = 'nullable|array';
            $rules['step_up_transformers.*.kva'] = 'nullable|integer';
            $rules['step_up_transformers.*.count'] = 'nullable|integer';
            $rules['step_down_transformers'] = 'nullable|array';
            $rules['step_down_transformers.*.kva'] = 'nullable|integer';
            $rules['step_down_transformers.*.count'] = 'nullable|integer';
            $rules['ht_poles'] = 'nullable|integer';
            $rules['lt_poles'] = 'nullable|integer';
            $rules['ht_conductor_length_acsr_km'] = 'nullable|numeric';
            $rules['ht_conductor_dia'] = 'nullable|string|max:255';
            $rules['uaac_lt_conductor_length_km'] = 'nullable|numeric';
            $rules['uaac_lt_conductor_dia'] = 'nullable|string|max:255';
        }

        $validatedData = $request->validate($rules);

        try {
            DB::transaction(function () use ($request, $projectFinancialInstallment, $validatedData) {
                $attachments = $request->file('attachments') ?? [];
                $removedAttachments = $validatedData['removed_attachments'] ?? [];

                unset($validatedData['attachments']);
                unset($validatedData['removed_attachments']);

                $tAndDWorkData = [];
                if ($validatedData['progress_type'] === 'T&D') {
                    $tAndDWorkData = [
                        'date_of_initiation_of_t_and_d_works' => $validatedData['date_of_initiation_of_t_and_d_works'] ?? null,
                        'step_up_transformers' => $validatedData['step_up_transformers'] ?? null,
                        // FIX: Corrected syntax
                        'step_down_transformers' => $validatedData['step_down_transformers'] ?? null,
                        'ht_poles' => $validatedData['ht_poles'] ?? null,
                        // FIX: Corrected syntax
                        'lt_poles' => $validatedData['lt_poles'] ?? null,
                        'ht_conductor_length_acsr_km' => $validatedData['ht_conductor_length_acsr_km'] ?? null,
                        'ht_conductor_dia' => $validatedData['ht_conductor_dia'] ?? null,
                        'uaac_lt_conductor_length_km' => $validatedData['uaac_lt_conductor_length_km'] ?? null,
                        // FIX: Corrected syntax
                        'uaac_lt_conductor_dia' => $validatedData['uaac_lt_conductor_dia'] ?? null,
                        'remarks' => $validatedData['remarks'] ?? null,
                    ];
                    unset($validatedData['date_of_initiation_of_t_and_d_works']);
                    unset($validatedData['step_up_transformers']);
                    unset($validatedData['step_down_transformers']);
                    unset($validatedData['ht_poles']);
                    unset($validatedData['lt_poles']);
                    unset($validatedData['ht_conductor_length_acsr_km']);
                    unset($validatedData['ht_conductor_dia']);
                    unset($validatedData['uaac_lt_conductor_length_km']);
                    unset($validatedData['uaac_lt_conductor_dia']);
                }

                $progressData = $validatedData;
                if ($progressData['progress_type'] === 'Civil') {
                    $progressData['t_and_d_work_id'] = null;
                }
                $projectFinancialInstallment->update($progressData);

                if ($validatedData['progress_type'] === 'T&D') {
                    if ($projectFinancialInstallment->t_and_d_work_id) {
                        $projectFinancialInstallment->tAndDWork->update($tAndDWorkData);
                    } else {
                        $projectableModel = null;
                        if ($projectFinancialInstallment->projectable_type === MhpSite::class) {
                            $projectableModel = MhpSite::findOrFail($projectFinancialInstallment->projectable_id);
                        } elseif ($projectFinancialInstallment->projectable_type === IrrigationScheme::class) {
                            $projectableModel = IrrigationScheme::findOrFail($projectFinancialInstallment->projectable_id);
                        }
                        if ($projectableModel) {
                            $tAndDWork = $projectableModel->tAndDWorks()->create($tAndDWorkData);
                            $projectFinancialInstallment->update(['t_and_d_work_id' => $tAndDWork->id]);
                        }
                    }
                }

                if (!empty($removedAttachments)) {
                    Media::whereIn('id', $removedAttachments)
                        ->where('model_type', get_class($projectFinancialInstallment))
                        ->where('model_id', $projectFinancialInstallment->id)
                        ->delete();
                }

                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        if ($file instanceof \Illuminate\Http\UploadedFile) {
                            $projectFinancialInstallment->addMedia($file)->toMediaCollection('attachments');
                        }
                    }
                }
            });

            return redirect()->back()->with(['success' => 'Financial Installment updated successfully!']);
        } catch (\Exception $e) {
            Log::error('Error updating Financial Installment: ' . $e->getMessage() . ' - File: ' . $e->getFile() . ' - Line: ' . $e->getLine());
            return redirect()->back()->with('error', 'Failed to update Financial Installment: ' . $e->getMessage());
        }
    }

    public function destroy(ProjectFinancialInstallment $projectFinancialInstallment)
    {
        try {
            DB::transaction(function () use ($projectFinancialInstallment) {
                $projectFinancialInstallment->delete();
            });
            return redirect()->back()->with('success', 'Financial Installment deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Financial Installment: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Financial Installment: ' . $e->getMessage());
        }
    }

    public function show(int $id)
    {
        $item = ProjectFinancialInstallment::with('media')->find($id); // Eager load media
        if (!$item) {
            abort(404);
        }
        return inertia('ProjectFinancialInstallment/Show', compact('item'));
    }
}
