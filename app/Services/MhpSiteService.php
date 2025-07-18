<?php

namespace App\Services;

use App\Models\MhpSite;
use App\Models\MhpAdminApproval;
use App\Models\TAndDWork;
use App\Models\ProjectPhysicalProgress;
use App\Models\ProjectFinancialInstallment;
use Illuminate\Support\Facades\DB;
use Throwable;

class MhpSiteService
{
    /**
     * Create a new MHP Site and its related data.
     *
     * @param array $data Data for MhpSite creation.
     * @return MhpSite
     * @throws Throwable
     */
    public function createMhpSite(array $data): MhpSite
    {
        return DB::transaction(function () use ($data) {
            $site = MhpSite::create($data);

            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $site->addMedia($attachment)->toMediaCollection('attachments');
                }
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

            if (isset($data['attachments_to_delete'])) {
                $site->deleteMedia($data['attachments_to_delete']);
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

            if (isset($data['attachments_to_delete'])) {
                $approval->deleteMedia($data['attachments_to_delete']);
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
        return DB::transaction(function () use ($site, $data) {
            $tAndDWork = $site->tAndDWorks()->create($data); // Automatically sets projectable_id/type

            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $tAndDWork->addMedia($attachment)->toMediaCollection('attachments');
                }
            }

            return $tAndDWork;
        });
    }

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

            if (isset($data['attachments_to_delete'])) {
                $tAndDWork->deleteMedia($data['attachments_to_delete']);
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
        return DB::transaction(function () use ($site, $data) {
            // Set projectable for the progress record
            $data['projectable_id'] = $site->id;
            $data['projectable_type'] = MhpSite::class;

            // Handle activity polymorphic relation based on payment_for
            if ($data['payment_for'] === 'T&D') {
                // activity_id and activity_type should be set by the request
                // We validate this in the form request
                // Ensure activity_type is correctly mapped for TAndDWork
                if (!isset($data['activity_type']) || $data['activity_type'] !== TAndDWork::class) {
                    $data['activity_type'] = TAndDWork::class;
                }
            } else {
                // For EME and Civil, there's no linked activity_id/type
                $data['activity_id'] = null;
                $data['activity_type'] = null;
            }

            $progress = ProjectPhysicalProgress::create($data);

            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $progress->addMedia($attachment)->toMediaCollection('attachments');
                }
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

            if (isset($data['attachments_to_delete'])) {
                $progress->deleteMedia($data['attachments_to_delete']);
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
        return DB::transaction(function () use ($site, $data) {
            // Set projectable for the installment record
            $data['projectable_id'] = $site->id;
            $data['projectable_type'] = MhpSite::class;

            // Handle activity polymorphic relation based on payment_for
            if ($data['payment_for'] === 'T&D') {
                // Ensure activity_type is correctly mapped for TAndDWork
                if (!isset($data['activity_type']) || $data['activity_type'] !== TAndDWork::class) {
                    $data['activity_type'] = TAndDWork::class;
                }
            } else {
                $data['activity_id'] = null;
                $data['activity_type'] = null;
            }

            $installment = ProjectFinancialInstallment::create($data);

            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $installment->addMedia($attachment)->toMediaCollection('attachments');
                }
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

            if (isset($data['attachments_to_delete'])) {
                $installment->deleteMedia($data['attachments_to_delete']);
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

            if (isset($data['attachments_to_delete'])) {
                $completion->deleteMedia($data['attachments_to_delete']);
            }
            if (isset($data['attachments'])) {
                foreach ($data['attachments'] as $attachment) {
                    $completion->addMedia($attachment)->toMediaCollection('attachments');
                }
            }

            return $completion;
        });
    }

    // Add methods for deleting entities if they have complex logic (e.g., related data cleanup)
    // For simple deletes, it can often be handled directly in the controller or a policy.
    public function deleteMhpSite(MhpSite $site): bool
    {
        return DB::transaction(function () use ($site) {
            // Spatie Media Library automatically handles media deletion on model delete
            // due to InteractsWithMedia trait when using model events, but explicit is also fine.
            // $site->clearMediaCollection('attachments');

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

    // You might add similar delete methods for PhysicalProgress, FinancialInstallment etc.
}
