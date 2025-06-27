<?php

namespace App\Services;

use App\Models\IrrigationCompletion;
use Illuminate\Support\Facades\Log;

class IrrigationCompletionService
{
    public function create(array $data): IrrigationCompletion
    {
        return IrrigationCompletion::create($data);
    }

    public function update(IrrigationCompletion $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(IrrigationCompletion $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?IrrigationCompletion
    {
        return IrrigationCompletion::find($id);
    }
}
