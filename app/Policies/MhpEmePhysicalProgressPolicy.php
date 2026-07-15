<?php

namespace App\Policies;

use App\Models\MhpEmePhysicalProgress;
use App\Models\MhpSite;
use App\Models\User;

class MhpEmePhysicalProgressPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, MhpSite $mhpSite): bool
    {
        return $user->can('view', $mhpSite);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, MhpSite $mhpSite): bool
    {
        return $user->can('update', $mhpSite);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, MhpEmePhysicalProgress $mhpEmePhysicalProgress): bool
    {
        return $user->can('update', $mhpEmePhysicalProgress->mhpSite);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, MhpEmePhysicalProgress $mhpEmePhysicalProgress): bool
    {
        return $user->can('update', $mhpEmePhysicalProgress->mhpSite);
    }
}
