<?php

namespace App\Services;

use App\Models\MhpSite;
use Illuminate\Support\Facades\Log;

class MhpSiteService
{
    public function create(array $data): MhpSite
    {
        return MhpSite::create($data);
    }

    public function update(MhpSite $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(MhpSite $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?MhpSite
    {
        return MhpSite::find($id);
    }
}
