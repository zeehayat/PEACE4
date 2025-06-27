<?php

namespace App\Services;

use App\Models\Attachment;
use Illuminate\Support\Facades\Log;

class AttachmentService
{
    public function create(array $data): Attachment
    {
        return Attachment::create($data);
    }

    public function update(Attachment $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(Attachment $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?Attachment
    {
        return Attachment::find($id);
    }
}
