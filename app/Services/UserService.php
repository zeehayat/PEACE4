<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserService
{
    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(User $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(User $model): bool
    {
        return $model->delete();
    }

    public function find(int $id): ?User
    {
        return User::find($id);
    }
}
