<?php

namespace App\Policies;

use App\Models\IrrigationCompletion;
use App\Models\IrrigationScheme;
use App\Models\User;

class IrrigationCompletionPolicy extends BasePolicy
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
    public function view(User $user, IrrigationCompletion $irrigationCompletion): bool
    {
        return $user->can('view', $irrigationCompletion->irrigationScheme);
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
    public function update(User $user, IrrigationCompletion $irrigationCompletion): bool
    {
        return $user->can('update', $irrigationCompletion->irrigationScheme);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, IrrigationCompletion $irrigationCompletion): bool
    {
        return $user->can('update', $irrigationCompletion->irrigationScheme);
    }
}
