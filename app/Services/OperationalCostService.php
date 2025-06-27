<?php

namespace App\Services;

use App\Models\OperationalCost;
use Illuminate\Support\Facades\Log;

class OperationalCostService
{
    public function create(array $data): OperationalCost
    {
        return OperationalCost::create($data);
    }

    public function update(OperationalCost $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(OperationalCost $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?OperationalCost
    {
        return OperationalCost::find($id);
    }
}
