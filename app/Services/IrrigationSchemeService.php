<?php

namespace App\Services;

use App\Models\IrrigationScheme;
use Illuminate\Support\Facades\Log;

class IrrigationSchemeService
{
    public function create(array $data): IrrigationScheme
    {
        return IrrigationScheme::create($data);
    }

    public function update(IrrigationScheme $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(IrrigationScheme $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?IrrigationScheme
    {
        return IrrigationScheme::find($id);
    }
}
