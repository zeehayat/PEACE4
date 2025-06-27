<?php

namespace App\Services;

use App\Models\ProcurementCommitteeMember;
use Illuminate\Support\Facades\Log;

class ProcurementCommitteeMemberService
{
    public function create(array $data): ProcurementCommitteeMember
    {
        return ProcurementCommitteeMember::create($data);
    }

    public function update(ProcurementCommitteeMember $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProcurementCommitteeMember $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProcurementCommitteeMember
    {
        return ProcurementCommitteeMember::find($id);
    }
}
