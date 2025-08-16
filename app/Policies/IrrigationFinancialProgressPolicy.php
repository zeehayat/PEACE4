<?php

namespace App\Policies;

use App\Models\ProjectFinancialInstallment;
use App\Models\IrrigationScheme;
use App\Models\User;

class IrrigationFinancialProgressPolicy extends BasePolicy
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
     * Determine whether the user can view any financial progress records for a scheme.
     */
    public function viewAny(User $user, IrrigationScheme $irrigationScheme): bool
    {
        return $user->can('view', $irrigationScheme);
    }

    /**
     * Determine whether the user can create financial progress records for a scheme.
     */
    public function create(User $user, IrrigationScheme $irrigationScheme): bool
    {
        return $user->can('update', $irrigationScheme);
    }

    /**
     * Determine whether the user can update a financial progress record.
     */
    public function update(User $user, ProjectFinancialInstallment $financialProgress): bool
    {
        // The 'projectable' relationship on ProjectFinancialInstallment points to the IrrigationScheme
        return $user->can('update', $financialProgress->projectable);
    }

    /**
     * Determine whether the user can delete a financial progress record.
     */
    public function delete(User $user, ProjectFinancialInstallment $financialProgress): bool
    {
        return $user->can('update', $financialProgress->projectable);
    }
}
