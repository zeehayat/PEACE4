<?php

namespace App\Services;

use App\Models\Vendor;
use Illuminate\Support\Facades\Log;

class VendorService
{
    public function create(array $data): Vendor
    {
        return Vendor::create($data);
    }

    public function update(Vendor $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(Vendor $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?Vendor
    {
        return Vendor::find($id);
    }
}
