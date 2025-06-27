<?php

namespace App\Services;

use App\Models\ProcurementDelivery;
use Illuminate\Support\Facades\Log;

class ProcurementDeliveryService
{
    public function create(array $data): ProcurementDelivery
    {
        return ProcurementDelivery::create($data);
    }

    public function update(ProcurementDelivery $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProcurementDelivery $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProcurementDelivery
    {
        return ProcurementDelivery::find($id);
    }
}
