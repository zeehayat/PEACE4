<?php

namespace App\Services;

use App\Models\MhpAdminApproval;
use Illuminate\Support\Facades\Log;

class MhpAdminApprovalService
{
    public function create(array $data): MhpAdminApproval
    {
        return MhpAdminApproval::create($data);
    }

    public function update(MhpAdminApproval $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(MhpAdminApproval $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?MhpAdminApproval
    {
        return MhpAdminApproval::find($id);
    }
}
