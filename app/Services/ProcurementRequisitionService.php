<?php

namespace App\Services;

use App\Models\ProcurementRequisition;
use Illuminate\Support\Facades\Log;

class ProcurementRequisitionService
{
    public function create(array $data): ProcurementRequisition
    {
        return ProcurementRequisition::create($data);
    }

    public function update(ProcurementRequisition $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProcurementRequisition $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProcurementRequisition
    {
        return ProcurementRequisition::find($id);
    }
}
