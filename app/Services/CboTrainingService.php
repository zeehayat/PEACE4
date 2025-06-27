<?php

namespace App\Services;

use App\Models\CboTraining;
use Illuminate\Support\Facades\Log;

class CboTrainingService
{
    public function create(array $data): CboTraining
    {
        return CboTraining::create($data);
    }

    public function update(CboTraining $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(CboTraining $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?CboTraining
    {
        return CboTraining::find($id);
    }
}
