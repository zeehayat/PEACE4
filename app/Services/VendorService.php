<?php

namespace App\Services;

use App\Models\Vendor;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\HasMedia; // Import HasMedia for type hinting
use Throwable;

/**
 * Service class for handling all business logic related to the Vendor module.
 * This includes CRUD operations and file attachments.
 */
class VendorService
{
    /**
     * Handles the attachment of new media and the deletion of existing media
     * for a given model that uses the HasMedia trait.
     *
     * @param HasMedia $model The model instance (e.g., Vendor).
     * @param array $data A validated array containing 'attachments' (for new files)
     * and 'attachments_to_delete' (for existing media IDs).
     * @return void
     * @throws Throwable Throws an exception if a new file upload fails, causing
     * the encompassing database transaction to roll back.
     */
    private function handleAttachments(HasMedia $model, array $data): void
    {
        // 1. Delete specified attachments by their ID.
        if (isset($data['attachments_to_delete']) && is_array($data['attachments_to_delete'])) {
            foreach ($data['attachments_to_delete'] as $mediaId) {
                try {
                    $model->deleteMedia($mediaId);
                    Log::info('VendorService: Media deleted.', ['model' => get_class($model), 'id' => $model->id, 'media_id' => $mediaId]);
                } catch (Throwable $e) {
                    // Log the error but do not throw, as we may want to continue deleting other files.
                    Log::error('VendorService: Error deleting media.', ['model' => get_class($model), 'id' => $model->id, 'media_id' => $mediaId, 'error' => $e->getMessage()]);
                }
            }
        }

        // 2. Add new file attachments.
        if (isset($data['attachments']) && is_array($data['attachments'])) {
            foreach ($data['attachments'] as $attachment) {
                // Ensure the item is a valid UploadedFile instance
                if ($attachment instanceof UploadedFile) {
                    try {
                        $model->addMedia($attachment)->toMediaCollection('attachments');
                        Log::info('VendorService: Media added.', ['model' => get_class($model), 'id' => $model->id, 'file' => $attachment->getClientOriginalName()]);
                    } catch (Throwable $e) {
                        Log::error('VendorService: Error adding media.', ['model' => get_class($model), 'id' => $model->id, 'file' => $attachment->getClientOriginalName(), 'error' => $e->getMessage()]);
                        // Throw exception to roll back the transaction if a new file fails to upload
                        throw $e;
                    }
                }
            }
        }
    }

    /**
     * Create a new Vendor record.
     *
     * @param array $data A validated array containing vendor fields and attachments.
     * @return Vendor The newly created Vendor model instance.
     * @throws Throwable If any database operation or attachment handling fails.
     */
    public function createVendor(array $data): Vendor
    {
        Log::info('VendorService: createVendor triggered.');

        return DB::transaction(function () use ($data) {
            // Create the main Vendor model.
            $vendor = Vendor::create($data);
            Log::info('Vendor created.', ['vendor_id' => $vendor->id]);

            // Handle attachments for the vendor.
            $this->handleAttachments($vendor, $data);

            return $vendor;
        });
    }

    /**
     * Update an existing Vendor record.
     *
     * @param Vendor $vendor The Vendor model instance to be updated.
     * @param array $data A validated array with updated fields and attachment instructions.
     * @return Vendor The updated Vendor model instance.
     * @throws Throwable If any database operation or attachment handling fails.
     */
    public function updateVendor(Vendor $vendor, array $data): Vendor
    {
        Log::info('VendorService: updateVendor triggered.', ['vendor_id' => $vendor->id]);

        return DB::transaction(function () use ($vendor, $data) {
            // Update the main Vendor model.
            $vendor->update($data);
            Log::info('Vendor updated.', ['vendor_id' => $vendor->id]);

            // Handle attachments for the vendor.
            $this->handleAttachments($vendor, $data);

            return $vendor;
        });
    }

    /**
     * Delete a Vendor record.
     *
     * @param Vendor $vendor The Vendor model instance to delete.
     * @return bool
     * @throws Throwable If any database operation fails.
     */
    public function deleteVendor(Vendor $vendor): bool
    {
        Log::info('VendorService: deleteVendor triggered.', ['vendor_id' => $vendor->id]);
        return DB::transaction(function () use ($vendor) {
            // The model's boot method (or Spatie Media Library's trait) handles deleting associated media files.
            // If Vendor had any HasMany relationships that are NOT cascade deleted by DB,
            // you'd add $vendor->relatedModels->each(fn($model) => $model->delete()); here.
            return $vendor->delete();
        });
    }
}
