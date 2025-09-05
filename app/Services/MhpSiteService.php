<?php

namespace App\Services;

use App\Models\MhpSite;
use App\Models\MhpAdminApproval;
use App\Models\OperationalCost;
use App\Models\TAndDWork;
use App\Models\ProjectPhysicalProgress;
use App\Models\ProjectFinancialInstallment;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Throwable;
// Import the Spatie Media model if you want to use it for type hinting within the loop
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Support\Facades\Log; // Ensure Log is imported
use Illuminate\Support\Str;

class MhpSiteService
{
    /**
     * ... (createMhpSite method remains the same) ...
     */
    public function createMhpSite(array $data): MhpSite
    {
        return DB::transaction(function () use ($data) {
            $site = MhpSite::create($data);
            Log::info('MhpSite created:', ['site_id' => $site->id, 'attachments_count_in_data' => count($data['attachments'] ?? [])]);
            Log::info('R2 Config at Runtime:', [
                'key' => Config::get('filesystems.disks.cloudflare_r2.key'),
                'secret' => Config::get('filesystems.disks.cloudflare_r2.secret'),
                'endpoint' => Config::get('filesystems.disks.cloudflare_r2.endpoint'),
                'bucket' => Config::get('filesystems.disks.cloudflare_r2.bucket'),
                'media_disk_name' => Config::get('media-library.disk_name'),
                'throw_exceptions' => Config::get('filesystems.disks.cloudflare_r2.throw'), // Verify this is true
            ]);
            if (isset($data['attachments']) && is_array($data['attachments'])) {
                foreach ($data['attachments'] as $index => $attachment) {
                    try {
                        Log::info('Attempting to add media for site:', ['site_id' => $site->id, 'file_name' => $attachment->getClientOriginalName(), 'index' => $index]);
                        $media = $site->addMedia($attachment)->toMediaCollection('attachments');
                        Log::info('Media added successfully:', ['media_id' => $media->id, 'file_name' => $media->file_name]);
                    } catch (Throwable $e) {
                        Log::error('Explicit Media Add Error:', [ // Add explicit error log here
                            'site_id' => $site->id,
                            'file_name' => $attachment->getClientOriginalName() ?? 'N/A',
                            'error' => $e->getMessage(),
                            'trace' => $e->getTraceAsString(),
                        ]);
                        throw $e;
                    }
                }
            } else {
                Log::info('No attachments found in data for MhpSite creation.');
            }
            return $site;
        });
    }


    /**
     * Update an existing MHP Site and its related data.
     *
     * @param MhpSite $site The MhpSite instance to update.
     * @param array $data Data for MhpSite update.
     * @return MhpSite
     * @throws Throwable
     */
    public function updateMhpSite(MhpSite $site, array $data): MhpSite
    {
        return DB::transaction(function () use ($site, $data) {
            $site->update($data);

            if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
                // MODIFIED: Iterate over the array and delete each media item by ID
                foreach ($data['attachments_to_delete'] as $mediaId) {
                    // Spatie Media Library's deleteMedia method on the model
                    // accepts an ID or a Media object.
                    $site->deleteMedia($mediaId);
                }
            }
            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $site->addMedia($attachment)->toMediaCollection('attachments');
                }
            }

            return $site;
        });
    }

    /**
     * Store or update MHP Admin Approval.
     *
     * @param MhpSite $site The MhpSite instance to associate with.
     * @param array $data Data for MhpAdminApproval.
     * @return MhpAdminApproval
     * @throws Throwable
     */
    public function storeOrUpdateAdminApproval(MhpSite $site, array $data): MhpAdminApproval
    {
        return DB::transaction(function () use ($site, $data) {
            $approval = $site->adminApproval()->updateOrCreate(
                ['mhp_site_id' => $site->id],
                $data
            );

            if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
                foreach ($data['attachments_to_delete'] as $mediaId) {
                    $approval->deleteMedia($mediaId);
                }
            }
            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $approval->addMedia($attachment)->toMediaCollection('attachments');
                }
            }

            return $approval;
        });
    }

    /**
     * Create a new T&D Work record for an MHP Site.
     *
     * @param MhpSite $site The MhpSite instance.
     * @param array $data Data for TAndDWork.
     * @return TAndDWork
     * @throws Throwable
     */
    public function createTAndDWork(MhpSite $site, array $data): TAndDWork
    {
        Log::info('--- MhpSiteService: createTAndDWork triggered ---');
        Log::info('Site object received by service:', ['id' => $site->id, 'exists' => $site->exists]);
        Log::info('Initial data for T&D work (before MorphMany create):', $data);

        return DB::transaction(function () use ($site, $data) {
            // When using $site->tAndDWorks()->create($data), Laravel automatically
            // sets projectable_id and projectable_type based on the $site model.
            // Ensure $data does NOT contain projectable_id/type from the request,
            // as the relationship will set it. If it's in $data, it might conflict.
            unset($data['projectable_id']);
            unset($data['projectable_type']);

            $tAndDWork = $site->tAndDWorks()->create($data);

            Log::info('T&D Work created. Inspecting saved model:', [
                'id' => $tAndDWork->id,
                'projectable_id' => $tAndDWork->projectable_id,
                'projectable_type' => $tAndDWork->projectable_type,
                'name' => $tAndDWork->name,
            ]);

            if (isset($data['attachments']) && is_array($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    if ($attachment instanceof \Illuminate\Http\UploadedFile) {
                        try {
                            $media = $tAndDWork->addMedia($attachment)->toMediaCollection('attachments');
                            Log::info('Media added for T&D Work:', ['media_id' => $media->id, 'file_name' => $media->file_name]);
                        } catch (Throwable $e) {
                            Log::error('Error adding media for T&D Work:', [
                                'error' => $e->getMessage(),
                                'file_name' => $attachment->getClientOriginalName() ?? 'N/A',
                                'trace' => $e->getTraceAsString(),
                            ]);
                            throw $e;
                        }
                    } else {
                        Log::warning('Skipping non-UploadedFile attachment for T&D Work:', ['type' => gettype($attachment), 'attachment' => $attachment]);
                    }
                }
            } else {
                Log::info('No new attachments provided for T&D Work.');
            }

            return $tAndDWork;
        });
    }

    // ... (similar checks for createPhysicalProgress and createFinancialInstallment) ...
    // For these, you explicitly set $data['projectable_id'] and $data['projectable_type']
    //public function createPhysicalProgress

    /**
     * Update an existing T&D Work record.
     *
     * @param TAndDWork $tAndDWork The TAndDWork instance to update.
     * @param array $data Data for TAndDWork.
     * @return TAndDWork
     * @throws Throwable
     */
    public function updateTAndDWork(TAndDWork $tAndDWork, array $data): TAndDWork
    {
        return DB::transaction(function () use ($tAndDWork, $data) {
            $tAndDWork->update($data);

            if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
                foreach ($data['attachments_to_delete'] as $mediaId) {
                    $tAndDWork->deleteMedia($mediaId);
                }
            }
            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $tAndDWork->addMedia($attachment)->toMediaCollection('attachments');
                }
            }

            return $tAndDWork;
        });
    }

    /**
     * Create a new Project Physical Progress record.
     *
     * @param MhpSite $site The MhpSite instance.
     * @param array $data Data for ProjectPhysicalProgress.
     * @return ProjectPhysicalProgress
     * @throws Throwable
     */
    public function createPhysicalProgress(MhpSite $site, array $data): ProjectPhysicalProgress
    {
        Log::info('--- MhpSiteService: createPhysicalProgress triggered ---');
        Log::info('Site ID for Physical Progress:', ['site_id' => $site->id]);
        Log::info('Initial data for Physical Progress:', $data);

        return DB::transaction(function () use ($site, $data) {
            $attachments = $data['attachments'] ?? [];
            unset($data['attachments']);

            // FIX: Create a new instance and assign attributes manually
            $progress = new ProjectPhysicalProgress();

            // Manually assign the polymorphic keys from the MhpSite model
            $progress->projectable_id = $site->id;
            $progress->projectable_type = $site->getMorphClass();

            // Assign other attributes
            $progress->progress_percentage = $data['progress_percentage'];
            $progress->progress_date = $data['progress_date'];
            $progress->remarks = $data['remarks'];
            // $progress->payment_for = $data['payment_for'];
            $progress->activity_id = $data['activity_id'] ?? null;
            $progress->activity_type = $data['activity_type'] ?? null;

            // Save the model
            $progress->save();

            Log::info('Physical Progress created. Inspecting saved model:', [
                'id' => $progress->id,
                'projectable_id' => $progress->projectable_id,
                'projectable_type' => $progress->projectable_type,
                'progress_percentage' => $progress->progress_percentage,
            ]);

            if (!empty($attachments)) {
                $this->handleAttachments($progress, $attachments);
            }

            return $progress;
        });
    }



    /**
     * Update an existing Project Physical Progress record.
     *
     * @param ProjectPhysicalProgress $progress The ProjectPhysicalProgress instance to update.
     * @param array $data Data for ProjectPhysicalProgress.
     * @return ProjectPhysicalProgress
     * @throws Throwable
     */
    public function updatePhysicalProgress(ProjectPhysicalProgress $progress, array $data): ProjectPhysicalProgress
    {

        return DB::transaction(function () use ($progress, $data) {
            // Ensure projectable is not changed
            unset($data['projectable_id']);
            unset($data['projectable_type']);

            // Handle activity polymorphic relation based on payment_for
            if ($data['payment_for'] === 'T&D') {
                if (!isset($data['activity_type']) || $data['activity_type'] !== TAndDWork::class) {
                    $data['activity_type'] = TAndDWork::class;
                }
            } else {
                $data['activity_id'] = null;
                $data['activity_type'] = null;
            }

            $progress->update($data);

            if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
                foreach ($data['attachments_to_delete'] as $mediaId) {
                    $progress->deleteMedia($mediaId);
                }
            }
            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $progress->addMedia($attachment)->toMediaCollection('attachments');
                }
            }

            return $progress;
        });
    }

    /**
     * Create a new Project Financial Installment record.
     *
     * @param MhpSite $site The MhpSite instance.
     * @param array $data Data for ProjectFinancialInstallment.
     * @return ProjectFinancialInstallment
     * @throws Throwable
     */
    public function createFinancialInstallment(MhpSite $site, array $data): ProjectFinancialInstallment
    {
        Log::info('--- MhpSiteService: createFinancialInstallment triggered ---');
        Log::info('Site ID for Financial Installment:', ['site_id' => $site->id]);
        Log::info('Initial data for Financial Installment:', $data);

        return DB::transaction(function () use ($site, $data) {
            $attachments = $data['attachments'] ?? [];
            unset($data['attachments']);

            $installment = new ProjectFinancialInstallment();

            // Manually assign the polymorphic keys
            $installment->projectable_id = $site->id;
            $installment->projectable_type = $site->getMorphClass();

            // Assign other attributes from the validated data
            $installment->installment_number = $data['installment_number'];
            $installment->installment_date = $data['installment_date'];
            $installment->installment_amount = $data['installment_amount'];
            $installment->category = $data['category'] ?? null;
            $installment->remarks = $data['remarks'] ?? null;
            $installment->payment_for = $data['payment_for'];

            // Handle activity polymorphic relation based on payment_for
            if ($data['payment_for'] === 'T&D') {
                $installment->activity_id = $data['activity_id'] ?? null;
                $installment->activity_type = TAndDWork::class;
            } else {
                $installment->activity_id = null;
                $installment->activity_type = null;
            }

            $installment->save();

            Log::info('Financial Installment created. Inspecting saved model:', [
                'id' => $installment->id,
                'projectable_id' => $installment->projectable_id,
                'projectable_type' => $installment->projectable_type,
                'installment_amount' => $installment->installment_amount,
            ]);

            if (!empty($attachments)) {
                $this->handleAttachments($installment, $attachments);
            }

            return $installment;
        });
    }

    /**
     * Update an existing Project Financial Installment record.
     *
     * @param ProjectFinancialInstallment $installment The ProjectFinancialInstallment instance to update.
     * @param array $data Data for ProjectFinancialInstallment.
     * @return ProjectFinancialInstallment
     * @throws Throwable
     */
    public function updateFinancialInstallment(ProjectFinancialInstallment $installment, array $data): ProjectFinancialInstallment
    {
        Log::info('MhpSiteService: updateFinancialInstallment triggered.', ['financial_installment_id' => $installment->id, 'exists' => $installment->exists]);

        return DB::transaction(function () use ($installment, $data) {
            // Ensure projectable is not changed
            unset($data['projectable_id']);
            unset($data['projectable_type']);

            // Handle activity polymorphic relation based on payment_for
            if ($data['payment_for'] === 'T&D') {
                if (!isset($data['activity_type']) || $data['activity_type'] !== TAndDWork::class) {
                    $data['activity_type'] = TAndDWork::class;
                }
            } else {
                $data['activity_id'] = null;
                $data['activity_type'] = null;
            }

            $installment->update($data);

            if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
                foreach ($data['attachments_to_delete'] as $mediaId) {
                    $installment->deleteMedia($mediaId);
                }
            }
            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $installment->addMedia($attachment)->toMediaCollection('attachments');
                }
            }

            return $installment;
        });
    }


    /**
     * Store or update MHP Completion.
     *
     * @param MhpSite $site The MhpSite instance to associate with.
     * @param array $data Data for MhpCompletion.
     * @return MhpCompletion
     * @throws Throwable
     */
    public function storeOrUpdateMhpCompletion(MhpSite $site, array $data): MhpCompletion
    {
        return DB::transaction(function () use ($site, $data) {
            $completion = $site->completion()->updateOrCreate(
                ['mhp_site_id' => $site->id],
                $data
            );

            if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
                foreach ($data['attachments_to_delete'] as $mediaId) {
                    $completion->deleteMedia($mediaId);
                }
            }
            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $completion->addMedia($attachment)->toMediaCollection('attachments');
                }
            }

            return $completion;
        });
    }

    /**
     * Add methods for deleting entities if they have complex logic (e.g., related data cleanup)
     * For simple deletes, it can often be handled directly in the controller or a policy.
     */
    public function deleteMhpSite(MhpSite $site): bool
    {
        return DB::transaction(function () use ($site) {
            // Spatie Media Library automatically handles media deletion on model delete
            // due to InteractsWithMedia trait when using model events, but explicit is also fine.
            // $site->clearMediaCollection('attachments'); // If you want to force clear before delete
            return $site->delete();
        });
    }

    public function deleteTAndDWork(TAndDWork $tAndDWork): bool
    {
        return DB::transaction(function () use ($tAndDWork) {
            // Spatie Media Library handles media deletion.
            // Associated physical/financial progress records that pointed to this T&D work
            // will have their activity_id/activity_type set to null due to database constraints (if you set up ON DELETE SET NULL for foreign keys in migrations)
            // or you might want to explicitly handle them here if they should be deleted or reassigned.
            return $tAndDWork->delete();
        });
    }
    protected function handleAttachments(mixed $model, array $attachments): void
    {
        foreach ($attachments as $attachment) {
            $model->addMedia($attachment)
                ->usingFileName(Str::random(10) . '.' . $attachment->getClientOriginalExtension())
                ->toMediaCollection('attachments');
        }
    }

    /**
     * Store a new operational cost and its attachments.
     *
     * @param array $data
     * @return OperationalCost
     * @throws Throwable
     */
    public function storeOperationalCost(array $data): OperationalCost
    {
        return DB::transaction(function () use ($data) {
            $attachments = $data['attachments'] ?? [];
            unset($data['attachments']);

            $cost = OperationalCost::create($data);

            if (!empty($attachments)) {
                $this->handleAttachments($cost, $attachments);
            }

            return $cost;
        });
    }

    /**
     * Update an existing operational cost and handle attachments.
     *
     * @param OperationalCost $cost
     * @param array $data
     * @return OperationalCost
     * @throws Throwable
     */
    public function editOperationalCost(OperationalCost $cost, array $data): OperationalCost
    {
        return DB::transaction(function () use ($cost, $data) {
            $attachmentsToDelete = $data['attachments_to_delete'] ?? [];
            $attachments = $data['attachments'] ?? [];

            unset($data['attachments_to_delete']);
            unset($data['attachments']);

            $cost->update($data);

            if (!empty($attachmentsToDelete)) {
                foreach ($attachmentsToDelete as $mediaId) {
                    $cost->deleteMedia($mediaId);
                }
            }
            if (!empty($attachments)) {
                $this->handleAttachments($cost, $attachments);
            }

            return $cost;
        });
    }

    /**
     * Delete an operational cost and its associated media.
     *
     * @param OperationalCost $cost
     * @return bool
     * @throws Throwable
     */
    public function deleteOperationalCost(OperationalCost $cost): bool
    {
        return DB::transaction(function () use ($cost) {
            return $cost->delete();
        });
    }

    /**
     * Get a single operational cost with its relationships.
     *
     * @param int $id
     * @return OperationalCost
     */
    public function getOperationalCost(int $id): OperationalCost
    {
        return OperationalCost::with(['media', 'expenseType'])->findOrFail($id);
    }

    /**
     * Get all operational costs for a specific site.
     *
     * @param int $siteId
     * @return \Illuminate\Support\Collection
     */
    public function getOperationalCostsForSite(int $siteId)
    {
        return OperationalCost::with(['media', 'expenseType'])
            ->where('mhp_site_id', $siteId)
            ->orderBy('cost_date')
            ->get()
            ->map(function ($cost) {
                return [
                    'id' => $cost->id,
                    'cost_date' => $cost->cost_date,
                    'amount' => $cost->amount,
                    'remarks' => $cost->remarks,
                    'expense_type_id' => $cost->expense_type_id,
                    'expense_type_name' => optional($cost->expenseType)->name,
                    'media' => $cost->getMedia()->map(fn ($m) => [
                        'id' => $m->id,
                        'name' => $m->file_name,
                        'url' => $m->getFullUrl(),
                    ])
                ];
            });
    }


}
