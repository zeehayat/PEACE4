<?php

namespace App\Services;

use App\Models\CboExposureVisit;
use Illuminate\Support\Facades\Log;

class CboExposureVisitService
{
    public function create(array $data): CboExposureVisit
    {
        return CboExposureVisit::create($data);
    }

    public function update(CboExposureVisit $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(CboExposureVisit $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?CboExposureVisit
    {
        return CboExposureVisit::find($id);
    }
}
