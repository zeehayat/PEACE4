<?php

namespace App\Services;

use App\Models\Cbo;
use Illuminate\Support\Facades\Log;

class CboService
{
    public function create(array $data): Cbo
    {
        return Cbo::create($data);
    }

    public function update(Cbo $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(Cbo $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?Cbo
    {
        return Cbo::find($id);
    }
}
