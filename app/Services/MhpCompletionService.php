<?php

namespace App\Services;

use App\Models\MhpCompletion;
use Illuminate\Support\Facades\Log;

class MhpCompletionService
{
    public function create(array $data): MhpCompletion
    {
        return MhpCompletion::create($data);
    }

    public function update(MhpCompletion $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(MhpCompletion $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?MhpCompletion
    {
        return MhpCompletion::find($id);
    }
}
