<?php

namespace App\Services;

use App\Models\Attachment;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/**
 * Service class for Attachment related operations, supporting polymorphic relationships.
 */
class AttachmentService
{
    protected Attachment $attachment;

    /**
     * AttachmentService constructor.
     *
     * @param Attachment $attachment The Attachment model instance.
     */
    public function __construct(Attachment $attachment)
    {
        $this->attachment = $attachment;
    }

    /**
     * Get all Attachments.
     *
     * @return Collection A collection of Attachment models.
     */
    public function getAll(): Collection
    {
        return $this->attachment->all();
    }

    /**
     * Find an Attachment by its ID.
     *
     * @param int $id The ID of the Attachment.
     * @return Attachment|null The Attachment model instance, or null if not found.
     */
    public function findById(int $id): ?Attachment
    {
        return $this->attachment->find($id);
    }

    /**
     * Attach a file to a given model.
     *
     * @param Model       $model      The Eloquent model to attach the file to (e.g., CBO, CBOActivity).
     * @param UploadedFile $file      The uploaded file instance.
     * @param string|null  $description Optional description for the attachment.
     * @param string       $disk       The storage disk to use (e.g., 'public', 's3').
     * @param string       $directory  The directory within the disk to store the file.
     * @return Attachment The newly created Attachment model instance.
     *
     * @throws \Exception If file upload fails.
     */
    public function attachFile(
        Model $model,
        UploadedFile $file,
        ?string $description = null,
        string $disk = 'public',
        string $directory = 'attachments'
    ): Attachment {
        try {
            // Store the file on the specified disk
            $filePath = Storage::disk($disk)->putFile($directory, $file);

            if (!$filePath) {
                throw new \Exception('Failed to upload file.');
            }

            // Create the attachment record in the database
            return $model->attachments()->create([
                'file_path' => $filePath,
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'description' => $description,
            ]);
        } catch (\Exception $e) {
            // Log the error, or rethrow with more context
            // Log::error("Error attaching file: " . $e->getMessage());
            throw $e; // Re-throw the exception for handling in the controller
        }
    }

    /**
     * Detach (delete) an attachment record and its file from storage.
     *
     * @param int $id The ID of the attachment to delete.
     * @return bool True if the attachment and its file were deleted, false otherwise.
     */
    public function detachFile(int $id): bool
    {
        $attachment = $this->findById($id);

        if (!$attachment) {
            return false;
        }

        // Determine the disk from the file_path, assuming 'public' as default or a custom logic
        // This is a simplified approach; more robust solutions might store disk name in DB.
        $disk = Storage::getDefaultDriver(); // Default Laravel disk
        if (str_starts_with($attachment->file_path, 'public/')) {
            $disk = 'public'; // Assuming files stored via Storage::putFile('public/attachments', $file)
        }

        // Delete the file from storage
        $fileDeleted = Storage::disk($disk)->delete($attachment->file_path);

        // Delete the attachment record from the database
        $recordDeleted = $attachment->delete();

        return $fileDeleted && $recordDeleted;
    }

    /**
     * Update an existing Attachment's metadata (not the file itself).
     *
     * @param int $id The ID of the Attachment to update.
     * @param array $data The data to update the Attachment with (e.g., description).
     * @return Attachment|null The updated Attachment model instance, or null if not found.
     */
    public function updateMetadata(int $id, array $data): ?Attachment
    {
        $attachment = $this->findById($id);
        if ($attachment) {
            $attachment->update($data);
        }
        return $attachment;
    }
}
