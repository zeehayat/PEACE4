<?php

namespace App\Services;

use App\Models\OmCost;
use Illuminate\Support\Facades\Log;

class OmCostService
{
    public function create(array $data): OmCost
    {
        return OmCost::create($data);
    }

    public function update(OmCost $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(OmCost $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?OmCost
    {
        return OmCost::find($id);
    }
}
