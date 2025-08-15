<?php

namespace App\Policies;

use App\Models\MhpAdminApproval;
use App\Models\MhpSite;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MhpAdminApprovalPolicy
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
     * Determine whether the user can view the model.
     * Logic: Can the user view the parent MHP site?
     */
    public function view(User $user, MhpAdminApproval $mhpAdminApproval): bool
    {
        return $user->can('view', $mhpAdminApproval->mhpSite);
    }

    /**
     * Determine whether the user can create models.
     * Logic: Can the user update the parent MHP site?
     * Note: We check 'update' permission on the MhpSite for creating an approval.
     */
    public function create(User $user, MhpSite $mhpSite): bool
    {
        return $user->can('update', $mhpSite);
    }

    /**
     * Determine whether the user can update the model.
     * Logic: Can the user update the parent MHP site?
     */
    public function update(User $user, MhpAdminApproval $mhpAdminApproval): bool
    {
        return $user->can('update', $mhpAdminApproval->mhpSite);
    }

    /**
     * Determine whether the user can delete the model.
     * Logic: Can the user update the parent MHP site?
     */
    public function delete(User $user, MhpAdminApproval $mhpAdminApproval): bool
    {
        return $user->can('update', $mhpAdminApproval->mhpSite);
    }
}
