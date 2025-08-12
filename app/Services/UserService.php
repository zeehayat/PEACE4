<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Throwable;

class UserService
{
    /**
     * Create a new user and assign roles/permissions.
     */
    public function createUser(array $data): User
    {
        Log::info('UserService: createUser triggered.');

        return DB::transaction(function () use ($data) {
            $roles = $data['roles'] ?? [];
            unset($data['roles']);

            $data['password'] = Hash::make($data['password']);
            $user = User::create($data);
            $user->syncRoles($roles);

            Log::info('User created.', ['user_id' => $user->id]);
            return $user;
        });
    }

    /**
     * Update an existing user and their roles/permissions.
     */
    public function updateUser(User $user, array $data): User
    {
        Log::info('UserService: updateUser triggered.', ['user_id' => $user->id]);

        return DB::transaction(function () use ($user, $data) {
            $roles = $data['roles'] ?? null;
            $permissions = $data['permissions'] ?? null;

            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }
            if (isset($data['password_confirmation'])) {
                unset($data['password_confirmation']);
            }

            $user->update($data);

            if ($roles !== null) {
                $user->syncRoles($roles);
            }
            if ($permissions !== null) {
                $user->syncPermissions($permissions);
            }

            Log::info('User updated.', ['user_id' => $user->id]);
            return $user;
        });
    }

    /**
     * Delete a user.
     */
    public function deleteUser(User $user): bool
    {
        Log::info('UserService: deleteUser triggered.', ['user_id' => $user->id]);
        return DB::transaction(function () use ($user) {
            return $user->delete();
        });
    }
}
