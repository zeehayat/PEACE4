<?php

namespace App\Services;

use App\Models\MhpEmePhysicalProgress;
use Illuminate\Support\Facades\Log;

class MhpEmeProgressService
{
    public function create(array $data): MhpEmePhysicalProgress
    {

        return MhpEmePhysicalProgress::create($data);
    }

    public function update(MhpEmePhysicalProgress $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(MhpEmePhysicalProgress $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?MhpEmePhysicalProgress
    {
        return MhpEmePhysicalProgress::find($id);
    }
}
