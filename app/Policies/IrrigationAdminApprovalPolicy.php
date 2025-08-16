<?php

namespace App\Policies;

use App\Models\IrrigationAdminApproval;
use App\Models\IrrigationScheme;
use App\Models\User;

class IrrigationAdminApprovalPolicy extends BasePolicy
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
     */
    public function view(User $user, IrrigationAdminApproval $irrigationAdminApproval): bool
    {
        return $user->can('view', $irrigationAdminApproval->irrigationScheme);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, IrrigationScheme $irrigationScheme): bool
    {
        return $user->can('update', $irrigationScheme);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, IrrigationAdminApproval $irrigationAdminApproval): bool
    {
        return $user->can('update', $irrigationAdminApproval->irrigationScheme);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, IrrigationAdminApproval $irrigationAdminApproval): bool
    {
        return $user->can('update', $irrigationAdminApproval->irrigationScheme);
    }
}
