<?php

namespace App\Services;

use App\Models\CboDialogue;
use Illuminate\Support\Facades\Log;

class CboDialogueService
{
    public function create(array $data): CboDialogue
    {
        return CboDialogue::create($data);
    }

    public function update(CboDialogue $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(CboDialogue $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?CboDialogue
    {
        return CboDialogue::find($id);
    }
}
