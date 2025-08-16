<?php

namespace App\Policies;

use App\Models\IrrigationSchemeContract;
use App\Models\IrrigationScheme;
use App\Models\User;

class IrrigationSchemeContractPolicy extends BasePolicy
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
    public function viewAny(User $user): bool
    {
        // A user can view contracts if they can view any irrigation scheme.
        return $user->can('irrigation_scheme_view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, IrrigationSchemeContract $contract): bool
    {
        return $user->can('view', $contract->irrigationScheme);
    }

    /**
     * Determine whether the user can create models for a specific scheme.
     */
    public function create(User $user, IrrigationScheme $irrigationScheme): bool
    {
        return $user->can('update', $irrigationScheme);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, IrrigationSchemeContract $contract): bool
    {
        return $user->can('update', $contract->irrigationScheme);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, IrrigationSchemeContract $contract): bool
    {
        return $user->can('update', $contract->irrigationScheme);
    }
}
