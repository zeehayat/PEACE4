<?php

namespace App\Policies;

use App\Models\IrrigationCostRevision;
use App\Models\IrrigationScheme;
use App\Models\User;

class IrrigationCostRevisionPolicy extends BasePolicy
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
     * Determine whether the user can create cost revisions for a scheme.
     */
    public function create(User $user, IrrigationScheme $irrigationScheme): bool
    {
        return $user->can('update', $irrigationScheme);
    }

    /**
     * Determine whether the user can update the cost revision.
     */
    public function update(User $user, IrrigationCostRevision $irrigationCostRevision): bool
    {
        return $user->can('update', $irrigationCostRevision->irrigationScheme);
    }

    /**
     * Determine whether the user can delete the cost revision.
     */
    public function delete(User $user, IrrigationCostRevision $irrigationCostRevision): bool
    {
        return $user->can('update', $irrigationCostRevision->irrigationScheme);
    }
}
