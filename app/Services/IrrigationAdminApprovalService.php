<?php

namespace App\Services;

use App\Models\IrrigationAdminApproval;
use Illuminate\Support\Facades\Log;

class IrrigationAdminApprovalService
{
    public function create(array $data): IrrigationAdminApproval
    {
        return IrrigationAdminApproval::create($data);
    }

    public function update(IrrigationAdminApproval $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(IrrigationAdminApproval $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?IrrigationAdminApproval
    {
        return IrrigationAdminApproval::find($id);
    }
}
