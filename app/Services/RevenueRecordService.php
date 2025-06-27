<?php

namespace App\Services;

use App\Models\RevenueRecord;
use Illuminate\Support\Facades\Log;

class RevenueRecordService
{
    public function create(array $data): RevenueRecord
    {
        return RevenueRecord::create($data);
    }

    public function update(RevenueRecord $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(RevenueRecord $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?RevenueRecord
    {
        return RevenueRecord::find($id);
    }
}
