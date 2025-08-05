<?php

namespace App\Services;

use App\Models\LrmCommittee;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\HasMedia; // Import HasMedia for type hinting
use Throwable;

/**
 * Service class for handling all business logic related to the LRM module.
 * This includes CRUD operations and file attachments for LrmCommittee records.
 */
class LrmService
{
    /**
     * Handles the attachment of new media and the deletion of existing media
     * for a given model that uses the HasMedia trait.
     *
     * @param HasMedia $model The model instance (e.g., LrmCommittee).
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
                    Log::info('LrmService: Media deleted.', ['model' => get_class($model), 'id' => $model->id, 'media_id' => $mediaId]);
                } catch (Throwable $e) {
                    // Log the error but do not throw, as we may want to continue deleting other files.
                    Log::error('LrmService: Error deleting media.', ['model' => get_class($model), 'id' => $model->id, 'media_id' => $mediaId, 'error' => $e->getMessage()]);
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
                        Log::info('LrmService: Media added.', ['model' => get_class($model), 'id' => $model->id, 'file' => $attachment->getClientOriginalName()]);
                    } catch (Throwable $e) {
                        Log::error('LrmService: Error adding media.', ['model' => get_class($model), 'id' => $model->id, 'file' => $attachment->getClientOriginalName(), 'error' => $e->getMessage()]);
                        // Throw exception to roll back the transaction if a new file fails to upload
                        throw $e;
                    }
                }
            }
        }
    }

    /**
     * Create a new LRM Committee record.
     *
     * @param array $data A validated array containing LRM Committee fields and attachments.
     * @return LrmCommittee The newly created LrmCommittee model instance.
     * @throws Throwable If any database operation or attachment handling fails.
     */
    public function createLrmCommittee(array $data): LrmCommittee
    {
        Log::info('LrmService: createLrmCommittee triggered.');

        return DB::transaction(function () use ($data) {
            // Create the main LrmCommittee model.
            // The JSON fields ('forest_plants' and 'fruit_plants') are correctly
            // handled by Laravel's model casting, as they are arrays in the form data.
            $lrmCommittee = LrmCommittee::create($data);
            Log::info('LrmCommittee created.', ['lrm_committee_id' => $lrmCommittee->id]);

            // Handle attachments for the LRM Committee.
            $this->handleAttachments($lrmCommittee, $data);

            return $lrmCommittee;
        });
    }

    /**
     * Update an existing LRM Committee record.
     *
     * @param LrmCommittee $lrmCommittee The LrmCommittee model instance to be updated.
     * @param array $data A validated array with updated fields and attachment instructions.
     * @return LrmCommittee The updated LrmCommittee model instance.
     * @throws Throwable If any database operation or attachment handling fails.
     */
    public function updateLrmCommittee(LrmCommittee $lrmCommittee, array $data): LrmCommittee
    {
        Log::info('LrmService: updateLrmCommittee triggered.', ['lrm_committee_id' => $lrmCommittee->id]);

        return DB::transaction(function () use ($lrmCommittee, $data) {
            // Update the main LrmCommittee model.
            $lrmCommittee->update($data);
            Log::info('LrmCommittee updated.', ['lrm_committee_id' => $lrmCommittee->id]);

            // Handle attachments for the LRM Committee.
            $this->handleAttachments($lrmCommittee, $data);

            return $lrmCommittee;
        });
    }

    /**
     * Delete an LRM Committee record.
     *
     * @param LrmCommittee $lrmCommittee The LrmCommittee model instance to delete.
     * @return bool
     * @throws Throwable If any database operation fails.
     */
    public function deleteLrmCommittee(LrmCommittee $lrmCommittee): bool
    {
        Log::info('LrmService: deleteLrmCommittee triggered.', ['lrm_committee_id' => $lrmCommittee->id]);
        return DB::transaction(function () use ($lrmCommittee) {
            // The model's boot method (or Spatie Media Library's trait) handles deleting associated media files.
            return $lrmCommittee->delete();
        });
    }
}
