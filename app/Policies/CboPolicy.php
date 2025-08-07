<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Cbo;
use Illuminate\Auth\Access\HandlesAuthorization;

class CboPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     * Root and HO roles can view all. District roles view their own.
     */
    public function viewAny(User $user): bool
    {
        // Root can do anything
        if ($user->hasRole('Root')) {
            return true;
        }

        // HO roles can view any CBO
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO'])) {
            return $user->can('view cbo'); // Check if they have the permission
        }

        // District roles can view CBOs (will be scoped to their district by a global scope/query)
        // They just need the basic 'view cbo' permission
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->can('view cbo');
        }

        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Cbo $cbo): bool
    {
        // Root can do anything
        if ($user->hasRole('Root')) {
            return true;
        }

        // HO roles can view any CBO
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO'])) {
            return $user->can('view cbo');
        }

        // District roles can only view CBOs in their district
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->can('view cbo') && ($user->district_id === $cbo->district_id);
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Root and KPO-DISTRICT/Engineer-DISTRICT/M&E-DISTRICT can create CBOs
        return $user->hasRole('Root') || $user->can('create cbo');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Cbo $cbo): bool
    {
        // Root and Admin can update any CBO
        if ($user->hasAnyRole(['Root', 'Admin', 'M&E-HO', 'Engineer-HO'])) {
            return $user->can('update cbo');
        }

        // M&E-DISTRICT and Engineer-DISTRICT can update CBOs in their district
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->can('update cbo') && ($user->district_id === $cbo->district_id);
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Cbo $cbo): bool
    {
        // Root and Admin can delete any CBO
        if ($user->hasAnyRole(['Root', 'Admin', 'M&E-HO', 'Engineer-HO'])) {
            return $user->can('delete cbo');
        }

        // M&E-DISTRICT and Engineer-DISTRICT can delete CBOs in their district
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->can('delete cbo') && ($user->district_id === $cbo->district_id);
        }

        return false;
    }
}
