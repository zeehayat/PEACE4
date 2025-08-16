<?php

namespace App\Policies;

use App\Models\MhpCompletion;
use App\Models\MhpSite;
use App\Models\User;

class MhpCompletionPolicy extends BasePolicy
{
    /**
     * The 'before' method handles the Root user.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    /**
     * Determine whether the user can view the completion record.
     */
    public function view(User $user, MhpCompletion $mhpCompletion): bool
    {
        return $user->can('view', $mhpCompletion->mhpSite);
    }

    /**
     * Determine whether the user can create a completion record for a site.
     */
    public function create(User $user, MhpSite $mhpSite): bool
    {
        return $user->can('update', $mhpSite);
    }

    /**
     * Determine whether the user can update the completion record.
     */
    public function update(User $user, MhpCompletion $mhpCompletion): bool
    {
        return $user->can('update', $mhpCompletion->mhpSite);
    }

    /**
     * Determine whether the user can delete the completion record.
     */
    public function delete(User $user, MhpCompletion $mhpCompletion): bool
    {
        return $user->can('update', $mhpCompletion->mhpSite);
    }
}
