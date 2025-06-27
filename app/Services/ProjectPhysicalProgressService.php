<?php

namespace App\Services;

use App\Models\ProjectPhysicalProgress;
use Illuminate\Support\Facades\Log;

class ProjectPhysicalProgressService
{
    public function create(array $data): ProjectPhysicalProgress
    {
        return ProjectPhysicalProgress::create($data);
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
