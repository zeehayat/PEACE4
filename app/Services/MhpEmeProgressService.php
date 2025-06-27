<?php

namespace App\Services;

use App\Models\MhpEmeProgress;
use Illuminate\Support\Facades\Log;

class MhpEmeProgressService
{
    public function create(array $data): MhpEmeProgress
    {
        return MhpEmeProgress::create($data);
    }

    public function update(MhpEmeProgress $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(MhpEmeProgress $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?MhpEmeProgress
    {
        return MhpEmeProgress::find($id);
    }
}
