<?php

namespace App\Services;

use App\Models\ProcurementFinalApproval;
use Illuminate\Support\Facades\Log;

class ProcurementFinalApprovalService
{
    public function create(array $data): ProcurementFinalApproval
    {
        return ProcurementFinalApproval::create($data);
    }

    public function update(ProcurementFinalApproval $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProcurementFinalApproval $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProcurementFinalApproval
    {
        return ProcurementFinalApproval::find($id);
    }
}
