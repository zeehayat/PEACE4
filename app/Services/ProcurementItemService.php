<?php

namespace App\Services;

use App\Models\ProcurementItem;
use Illuminate\Support\Facades\Log;

class ProcurementItemService
{
    public function create(array $data): ProcurementItem
    {
        return ProcurementItem::create($data);
    }

    public function update(ProcurementItem $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(ProcurementItem $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?ProcurementItem
    {
        return ProcurementItem::find($id);
    }
}
