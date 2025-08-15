<?php

namespace App\Policies;

use App\Models\MhpEmeFinancialProgress;
use App\Models\MhpSite;
use App\Models\User;

class MhpEmeFinancialProgressPolicy
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
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, MhpSite $mhpSite): bool
    {
        // Logic: Can the user view the parent MHP site?
        return $user->can('view', $mhpSite);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, MhpSite $mhpSite): bool
    {
        // Logic: Can the user update the parent MHP site?
        return $user->can('update', $mhpSite);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, MhpEmeFinancialProgress $mhpEmeFinancialProgress): bool
    {
        // Logic: Can the user update the parent MHP site?
        return $user->can('update', $mhpEmeFinancialProgress->mhpSite);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, MhpEmeFinancialProgress $mhpEmeFinancialProgress): bool
    {
        // Logic: Can the user update the parent MHP site?
        return $user->can('update', $mhpEmeFinancialProgress->mhpSite);
    }
}
