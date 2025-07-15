<?php

namespace App\Http\Controllers;

use App\Models\IrrigationScheme;
use App\Models\MhpSite;
use Illuminate\Http\Request;
use App\Models\ProjectPhysicalProgress;
use App\Services\ProjectPhysicalProgressService; // Assuming this service exists
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media; // Import Media model

class ProjectPhysicalProgressController extends Controller
{
    protected ProjectPhysicalProgressService $service;

    public function __construct(ProjectPhysicalProgressService $service)
    {
        $this->service = $service;
    }

    public function index()
    {

        // This index method might need adjustment later based on how you want to list them
        // (e.g., by MHP site, by Irrigation scheme, or all together)

        $query = ProjectPhysicalProgress::query()->with(['projectable', 'media', 'tAndDWork']); // Eager load tAndDWork

        // You might add filters for progress_type here later
        // if ($request->filled('progress_type')) {
        //     $query->where('progress_type', $request->progress_type);
        // }

        $progresses = $query->latest()->paginate(10); // Or paginate from a specific projectable

        return Inertia::render('ProjectPhysicalProgress/Index', [
            'progresses' => $progresses,
        ]);
    }
    public function show(ProjectPhysicalProgress $projectPhysicalProgress)
    {
        $projectPhysicalProgress->load('media', 'tAndDWork'); // Eager load tAndDWork for show
        return response()->json($projectPhysicalProgress); // Or Inertia render
    }
    public function store(Request $request)
    {
        $rules = [
            'projectable_id' => 'required',
            'projectable_type' => 'required|string',
            'progress_percentage' => 'required|numeric|min:0|max:100',
            'progress_date' => 'required|date',
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

                $progress = $projectableModel->physicalProgresses()->create($validatedData);

                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        if ($file instanceof \Illuminate\Http\UploadedFile) {
                            $progress->addMedia($file)->toMediaCollection('attachments');
                        }
                    }
                }
            });

            return redirect()->back()->with(['success' => 'Physical Progress created successfully!']);
        } catch (\Exception $e) {
            Log::error('Error creating Physical Progress: ' . $e->getMessage() . ' - File: ' . $e->getFile() . ' - Line: ' . $e->getLine());
            return redirect()->back()->with('error', 'Failed to create Physical Progress: ' . $e->getMessage());
        }
    }

    public function update(Request $request, ProjectPhysicalProgress $projectPhysicalProgress)
    {
        $rules = [
            'projectable_id' => 'required',
            'projectable_type' => 'required|string',
            'progress_percentage' => 'required|numeric|min:0|max:100',
            'progress_date' => 'required|date',
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
            DB::transaction(function () use ($request, $projectPhysicalProgress, $validatedData) {
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
                $projectPhysicalProgress->update($progressData);

                if ($validatedData['progress_type'] === 'T&D') {
                    if ($projectPhysicalProgress->t_and_d_work_id) {
                        $projectPhysicalProgress->tAndDWork->update($tAndDWorkData);
                    } else {
                        $projectableModel = null;
                        if ($projectPhysicalProgress->projectable_type === MhpSite::class) {
                            $projectableModel = MhpSite::findOrFail($projectPhysicalProgress->projectable_id);
                        } elseif ($projectPhysicalProgress->projectable_type === IrrigationScheme::class) {
                            $projectableModel = IrrigationScheme::findOrFail($projectPhysicalProgress->projectable_id);
                        }
                        if ($projectableModel) {
                            $tAndDWork = $projectableModel->tAndDWorks()->create($tAndDWorkData);
                            $projectPhysicalProgress->update(['t_and_d_work_id' => $tAndDWork->id]);
                        }
                    }
                }

                if (!empty($removedAttachments)) {
                    Media::whereIn('id', $removedAttachments)
                        ->where('model_type', get_class($projectPhysicalProgress))
                        ->where('model_id', $projectPhysicalProgress->id)
                        ->delete();
                }

                if (!empty($attachments)) {
                    foreach ($attachments as $file) {
                        if ($file instanceof \Illuminate\Http\UploadedFile) {
                            $projectPhysicalProgress->addMedia($file)->toMediaCollection('attachments');
                        }
                    }
                }
            });

            return redirect()->back()->with(['success' => 'Physical Progress updated successfully!']);
        } catch (\Exception $e) {
            Log::error('Error updating Physical Progress: ' . $e->getMessage() . ' - File: ' . $e->getFile() . ' - Line: ' . $e->getLine());
            return redirect()->back()->with('error', 'Failed to update Physical Progress: ' . $e->getMessage());
        }
    }


    public function destroy(ProjectPhysicalProgress $projectPhysicalProgress)
    {
        try {
            DB::transaction(function () use ($projectPhysicalProgress) {
                // If this physical progress is linked to a T&D work, consider what to do with the T&D work.
                // For simplicity, we'll leave the T&D work record in place unless it's only linked to this one progress record.
                // Or you might decide to delete T&D work if no other progress points to it.
                $projectPhysicalProgress->delete();
            });
            return redirect()->back()->with('success', 'Physical Progress deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting Physical Progress: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Physical Progress: ' . $e->getMessage());
        }
    }


}
