<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     */
    public function before(User $user, string $ability): bool|null
    {
        // Root can do anything
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    /**
     * Determine whether the user can view any users.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('manage users');
    }

    /**
     * Determine whether the user can view a specific user.
     */
    public function view(User $user, User $model): bool
    {
        return $user->can('manage users');
    }

    /**
     * Determine whether the user can create users.
     */
    public function create(User $user): bool
    {
        return $user->can('manage users');
    }

    /**
     * Determine whether the user can update a user.
     */
    public function update(User $user, User $model): bool
    {
        // An Admin cannot update the Root user.
        if ($user->hasRole('Admin') && $model->hasRole('Root')) {
            return false;
        }
        // An Admin cannot update themselves, but a Root user can update anyone.
        if ($user->id === $model->id && $user->hasRole('Admin')) {
            return false;
        }

        return $user->can('manage users');
    }

    /**
     * Determine whether the user can delete a user.
     */
    public function delete(User $user, User $model): bool
    {
        // An Admin cannot delete the Root user.
        if ($user->hasRole('Admin') && $model->hasRole('Root')) {
            return false;
        }
        // A user cannot delete themselves.
        if ($user->id === $model->id) {
            return false;
        }

        return $user->can('manage users');
    }
}
