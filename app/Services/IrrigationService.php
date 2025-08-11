<?php

namespace App\Services;

use App\Models\IrrigationScheme;
use App\Models\IrrigationSchemeProfile;
use App\Models\IrrigationAdminApproval;
use App\Models\IrrigationCostRevision;
use App\Models\IrrigationSchemeContract;
use App\Models\IrrigationCompletion;
use App\Models\ProjectPhysicalProgress;
use App\Models\ProjectFinancialInstallment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\HasMedia;
use Throwable;

/**
 * Service class for handling all business logic related to the Irrigation module.
 * This includes CRUD operations, nested resource management, and file attachments.
 */
class IrrigationService
{
    /**
     * Handles the attachment of new media and the deletion of existing media
     * for a given model that uses the HasMedia trait.
     *
     * @param HasMedia $model The model instance (e.g., IrrigationScheme, IrrigationSchemeProfile, etc.).
     * @param array $data A validated array containing 'attachments' (for new files)
     * and 'attachments_to_delete' (for existing media IDs).
     * @return void
     * @throws Throwable Throws an exception if a new file upload fails, causing
     * the encompassing database transaction to roll back.
     */
    private function handleAttachments(HasMedia $model, array $data): void
    {
        // Delete specified attachments by their ID. This is typically done for update actions.
        if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
            foreach ($data['attachments_to_delete'] as $mediaId) {
                try {
                    $model->deleteMedia($mediaId);
                    Log::info('Media deleted.', ['model' => get_class($model), 'id' => $model->id, 'media_id' => $mediaId]);
                } catch (Throwable $e) {
                    // Log the error but do not throw, as we may want to continue deleting other files.
                    Log::error('Error deleting media.', ['model' => get_class($model), 'id' => $model->id, 'media_id' => $mediaId, 'error' => $e->getMessage()]);
                }
            }
        }

        // Add new file attachments.
        if (isset($data['attachments']) && is_array($data['attachments'])) {
            foreach ($data['attachments'] as $attachment) {
                // Ensure the item is a valid UploadedFile instance
                if ($attachment instanceof UploadedFile) {
                    try {
                        $model->addMedia($attachment)->toMediaCollection('attachments');
                        Log::info('Media added.', ['model' => get_class($model), 'id' => $model->id, 'file' => $attachment->getClientOriginalName()]);
                    } catch (Throwable $e) {
                        Log::error('Error adding media.', ['model' => get_class($model), 'id' => $model->id, 'file' => $attachment->getClientOriginalName(), 'error' => $e->getMessage()]);
                        // Throw exception to roll back the transaction if a new file fails to upload
                        throw $e;
                    }
                }
            }
        }
    }

    // --- IrrigationScheme (Main) Operations ---

    /**
     * Create a new Irrigation Scheme and its related profile record.
     *
     * @param array $data A validated array containing fields for both the main scheme
     * and a nested 'profile' key for IrrigationSchemeProfile fields.
     * @return IrrigationScheme The newly created IrrigationScheme model instance.
     * @throws Throwable If any database operation fails, the entire transaction is rolled back.
     */
    public function createIrrigationScheme(array $data): IrrigationScheme
    {
        Log::info('IrrigationService: createIrrigationScheme triggered.');

        return DB::transaction(function () use ($data) {
            // Extract the profile data from the main data array.
            // This is necessary to prevent mass-assignment issues on the main scheme model.
            $profileData = $data['profile'] ?? [];
            unset($data['profile']);

            // 1. Create the main IrrigationScheme model.
            $scheme = IrrigationScheme::create($data);
            Log::info('IrrigationScheme created.', ['scheme_id' => $scheme->id]);

            // 2. Create the associated profile record.
            $profileData['irrigation_scheme_id'] = $scheme->id;
            $scheme->profile()->create($profileData);
            Log::info('IrrigationSchemeProfile created.', ['scheme_id' => $scheme->id]);

            // 3. Handle attachments for the main scheme.
            $this->handleAttachments($scheme, $data);

            return $scheme;
        });
    }

    /**
     * Update an existing Irrigation Scheme and its related profile record.
     *
     * @param IrrigationScheme $scheme The IrrigationScheme model instance to be updated.
     * @param array $data A validated array with updated fields for the scheme and profile.
     * @return IrrigationScheme The updated IrrigationScheme model instance.
     * @throws Throwable If any database or filesystem operation fails.
     */
    public function updateIrrigationScheme(IrrigationScheme $scheme, array $data): IrrigationScheme
    {
        Log::info('IrrigationService: updateIrrigationScheme triggered.', ['scheme_id' => $scheme->id]);

        return DB::transaction(function () use ($scheme, $data) {
            $profileData = $data['profile'] ?? [];
            unset($data['profile']);

            // 1. Update the main IrrigationScheme model.
            $scheme->update($data);

            // 2. Update the associated profile record.
            $scheme->profile()->updateOrCreate(
                ['irrigation_scheme_id' => $scheme->id],
                $profileData
            );

            // 3. Handle file attachments for the main scheme.
            $this->handleAttachments($scheme, $data);

            return $scheme;
        });
    }

    /**
     * Delete an Irrigation Scheme. The model's boot method will handle cascading deletes.
     *
     * @param IrrigationScheme $scheme The IrrigationScheme model instance to delete.
     * @return bool
     */
    public function deleteIrrigationScheme(IrrigationScheme $scheme): bool
    {
        Log::info('IrrigationService: deleteIrrigationScheme triggered.', ['scheme_id' => $scheme->id]);
        return DB::transaction(function () use ($scheme) {
            // The model's boot method handles the cascading deletion of the profile
            // and all related polymorphic children and their media.
            return $scheme->delete();
        });
    }


    // --- ProjectPhysicalProgress Operations ---

    /**
     * Create a new physical progress record for an Irrigation Scheme.
     *
     * @param IrrigationScheme $scheme The parent IrrigationScheme instance.
     * @param array $data Data for ProjectPhysicalProgress.
     * @return ProjectPhysicalProgress
     * @throws Throwable
     */
    public function createPhysicalProgress(IrrigationScheme $scheme, array $data): ProjectPhysicalProgress
    {
        Log::info('IrrigationService: createPhysicalProgress triggered.', ['scheme_id' => $scheme->id]);

        return DB::transaction(function () use ($scheme, $data) {
            // Explicitly set the polymorphic parent data from the scheme instance
            $data['projectable_id'] = $scheme->id;
            $data['projectable_type'] = IrrigationScheme::class;

            // For Civil and EME, the activity is the parent scheme itself (no specific child activity)
            if ($data['payment_for'] !== 'T&D') {
                $data['activity_id'] = null;
                $data['activity_type'] = null;
            }

            $progress = ProjectPhysicalProgress::create($data);

            // Handle attachments for the progress record
            $this->handleAttachments($progress, $data);

            return $progress;
        });
    }

    /**
     * Update an existing physical progress record.
     *
     * @param ProjectPhysicalProgress $progress The instance to update.
     * @param array $data Updated data.
     * @return ProjectPhysicalProgress
     * @throws Throwable
     */
    public function updatePhysicalProgress(ProjectPhysicalProgress $progress, array $data): ProjectPhysicalProgress
    {
        Log::info('IrrigationService: updatePhysicalProgress triggered.', ['progress_id' => $progress->id]);

        return DB::transaction(function () use ($progress, $data) {
            // Remove polymorphic keys from data to prevent accidental modification via mass-assignment
            unset($data['projectable_id']);
            unset($data['projectable_type']);

            if ($data['payment_for'] !== 'T&D') {
                $data['activity_id'] = null;
                $data['activity_type'] = null;
            }

            $progress->update($data);

            // Handle attachments for the progress record
            $this->handleAttachments($progress, $data);

            return $progress;
        });
    }


    // --- ProjectFinancialInstallment Operations ---

    /**
     * Create a new financial installment record for an Irrigation Scheme.
     *
     * @param IrrigationScheme $scheme The parent IrrigationScheme instance.
     * @param array $data Data for ProjectFinancialInstallment.
     * @return ProjectFinancialInstallment
     * @throws Throwable
     */
    public function createFinancialInstallment(IrrigationScheme $scheme, array $data): ProjectFinancialInstallment
    {
        Log::info('IrrigationService: createFinancialInstallment triggered.', ['scheme_id' => $scheme->id]);

        return DB::transaction(function () use ($scheme, $data) {
            // Explicitly set the polymorphic parent data from the scheme instance
            $data['projectable_id'] = $scheme->id;
            $data['projectable_type'] = IrrigationScheme::class;

            if ($data['payment_for'] !== 'T&D') {
                $data['activity_id'] = null;
                $data['activity_type'] = null;
            }

            $installment = ProjectFinancialInstallment::create($data);

            // Handle attachments for the installment record
            $this->handleAttachments($installment, $data);

            return $installment;
        });
    }

    /**
     * Update an existing financial installment record.
     *
     * @param ProjectFinancialInstallment $installment The instance to update.
     * @param array $data Updated data.
     * @return ProjectFinancialInstallment
     * @throws Throwable
     */
    public function updateFinancialInstallment(ProjectFinancialInstallment $installment, array $data): ProjectFinancialInstallment
    {
        Log::info('IrrigationService: updateFinancialInstallment triggered.', ['installment_id' => $installment->id]);

        return DB::transaction(function () use ($installment, $data) {
            unset($data['projectable_id']);
            unset($data['projectable_type']);

            if ($data['payment_for'] !== 'T&D') {
                $data['activity_id'] = null;
                $data['activity_type'] = null;
            }

            $installment->update($data);

            // Handle attachments for the installment record
            $this->handleAttachments($installment, $data);

            return $installment;
        });
    }

    // --- IrrigationAdminApproval Operations ---

    /**
     * Store or update an Irrigation Admin Approval record.
     *
     * @param IrrigationScheme $scheme The parent scheme.
     * @param array $data Data for the approval record.
     * @return IrrigationAdminApproval
     * @throws Throwable
     */
    public function storeOrUpdateAdminApproval(IrrigationScheme $scheme, array $data): IrrigationAdminApproval
    {
        Log::info('IrrigationService: storeOrUpdateAdminApproval triggered.', ['scheme_id' => $scheme->id]);

        return DB::transaction(function () use ($scheme, $data) {
            $approval = $scheme->adminApproval()->updateOrCreate(
                ['irrigation_scheme_id' => $scheme->id],
                $data
            );

            $this->handleAttachments($approval, $data);

            return $approval;
        });
    }

    // --- IrrigationCostRevision Operations ---

    /**
     * Create a new cost revision for an Irrigation Admin Approval.
     *
     * @param IrrigationAdminApproval $approval The parent approval record.
     * @param array $data Data for the cost revision.
     * @return IrrigationCostRevision
     * @throws Throwable
     */
    public function createCostRevision(IrrigationAdminApproval $approval, array $data): IrrigationCostRevision
    {
        Log::info('IrrigationService: createCostRevision triggered.', ['approval_id' => $approval->id]);

        return DB::transaction(function () use ($approval, $data) {
            $revision = $approval->costRevisions()->create($data);

            $this->handleAttachments($revision, $data);

            return $revision;
        });
    }

    /**
     * Update an existing cost revision record.
     *
     * @param IrrigationCostRevision $revision The instance to update.
     * @param array $data Updated data.
     * @return IrrigationCostRevision
     * @throws Throwable
     */
    public function updateCostRevision(IrrigationCostRevision $revision, array $data): IrrigationCostRevision
    {
        Log::info('IrrigationService: updateCostRevision triggered.', ['revision_id' => $revision->id]);

        return DB::transaction(function () use ($revision, $data) {
            unset($data['approvable_id']);
            unset($data['approvable_type']);

            $revision->update($data);

            $this->handleAttachments($revision, $data);

            return $revision;
        });
    }

    // --- IrrigationSchemeContract Operations ---

    /**
     * Store or update an Irrigation Scheme Contract record.
     *
     * @param IrrigationScheme $scheme The parent scheme.
     * @param array $data Data for the contract record.
     * @return IrrigationSchemeContract
     * @throws Throwable
     */
    public function storeOrUpdateSchemeContract(IrrigationScheme $scheme, array $data): IrrigationSchemeContract
    {
        Log::info('IrrigationService: storeOrUpdateSchemeContract triggered.', ['scheme_id' => $scheme->id]);

        return DB::transaction(function () use ($scheme, $data) {
            $contract = $scheme->irrigationSchemeContract()->updateOrCreate(
                ['irrigation_scheme_id' => $scheme->id],
                $data
            );

            $this->handleAttachments($contract, $data);

            return $contract;
        });
    }
}
