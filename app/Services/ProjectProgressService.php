<?php

namespace App\Services;

use App\Models\ProjectPhysicalProgress;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

class ProjectProgressService
{
    public function createPhysicalProgress(Model $projectable, array $data): ProjectPhysicalProgress
    {
        // Never let client override polymorphic keys
        unset($data['projectable_type'], $data['projectable_id']);

        // Create THROUGH the morph relation -> writes alias from enforceMorphMap()
        $progress = $projectable->physicalProgresses()->create($data);

        if (!empty($data['attachments']) && is_array($data['attachments'])) {
            foreach ($data['attachments'] as $file) {
                if ($file instanceof UploadedFile) {
                    $progress->addMedia($file)->toMediaCollection('attachments');
                }
            }
        }

        return $progress;
    }

    public function update(ProjectPhysicalProgress $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProjectPhysicalProgress $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProjectPhysicalProgress
    {
        return ProjectPhysicalProgress::find($id);
    }
}
