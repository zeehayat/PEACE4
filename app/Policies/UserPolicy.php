<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy extends BasePolicy
{
    use HandlesAuthorization;

    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('user_manage');
    }

    public function view(User $user, User $model): bool
    {
        return $user->hasPermissionTo('user_manage');
    }

    public function create(User $user): bool
    {
       // return true;

        return $user->hasPermissionTo('user_manage');
    }

    public function update(User $user, User $model): bool
    {
        // Prevent a non-Root user from editing the Root user.
        if ($model->hasRole('Root') && !$user->hasRole('Root')) {
            return false;
        }

        // A user cannot update themselves.
        if ($user->id === $model->id) {
            return false;
        }

        return $user->hasPermissionTo('user_manage');
    }

    public function delete(User $user, User $model): bool
    {
        // Prevent a non-Root user from deleting the Root user.
        if ($model->hasRole('Root') && !$user->hasRole('Root')) {
            return false;
        }

        // A user cannot delete themselves.
        if ($user->id === $model->id) {
            return false;
        }

        return $user->hasPermissionTo('user_manage');
    }
}
