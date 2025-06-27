<?php

namespace App\Services;

use App\Models\ProcurementOrder;
use Illuminate\Support\Facades\Log;

class ProcurementOrderService
{
    public function create(array $data): ProcurementOrder
    {
        return ProcurementOrder::create($data);
    }

    public function update(ProcurementOrder $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProcurementOrder $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProcurementOrder
    {
        return ProcurementOrder::find($id);
    }
}
