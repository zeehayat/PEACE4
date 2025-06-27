<?php

namespace App\Services;

use App\Models\ProjectFinancialInstallment;
use Illuminate\Support\Facades\Log;

class ProjectFinancialInstallmentService
{
    public function create(array $data): ProjectFinancialInstallment
    {
        return ProjectFinancialInstallment::create($data);
    }

    public function update(ProjectFinancialInstallment $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProjectFinancialInstallment $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProjectFinancialInstallment
    {
        return ProjectFinancialInstallment::find($id);
    }
}
