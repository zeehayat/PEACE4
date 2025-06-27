<?php

namespace App\Services;

use App\Models\ProjectCostRevision;
use Illuminate\Support\Facades\Log;

class ProjectCostRevisionService
{
    public function create(array $data): ProjectCostRevision
    {
        return ProjectCostRevision::create($data);
    }

    public function update(ProjectCostRevision $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProjectCostRevision $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProjectCostRevision
    {
        return ProjectCostRevision::find($id);
    }
}
