<?php

namespace App\Services;

use App\Models\ProcurementQuotation;
use Illuminate\Support\Facades\Log;

class ProcurementQuotationService
{
    public function create(array $data): ProcurementQuotation
    {
        return ProcurementQuotation::create($data);
    }

    public function update(ProcurementQuotation $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProcurementQuotation $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProcurementQuotation
    {
        return ProcurementQuotation::find($id);
    }
}
