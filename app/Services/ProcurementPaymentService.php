<?php

namespace App\Services;

use App\Models\ProcurementPayment;
use Illuminate\Support\Facades\Log;

class ProcurementPaymentService
{
    public function create(array $data): ProcurementPayment
    {
        return ProcurementPayment::create($data);
    }

    public function update(ProcurementPayment $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProcurementPayment $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProcurementPayment
    {
        return ProcurementPayment::find($id);
    }
}
