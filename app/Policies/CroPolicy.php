<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Cro;
use Illuminate\Auth\Access\HandlesAuthorization;

class CroPolicy extends BasePolicy
{
    use HandlesAuthorization;

    /**
     * The 'before' method grants the Root role all permissions.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    /**
     * Determine whether the user can view any CROs.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('cro_view');
    }

    /**
     * Determine whether the user can view a specific CRO.
     */
    public function view(User $user, Cro $cro): bool
    {
        // First, check for the base permission.
        if (! $user->can('cro_view')) {
            return false;
        }

        // If they are a Head Office user, they can view any CRO.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO', 'Super Admin'])) {
            return true;
        }

        // If they are a District user, they can only view CROs in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->district_id === $cro->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can create CROs.
     */
    public function create(User $user): bool
    {
        return $user->can('cro_create');
    }

    /**
     * Determine whether the user can update a CRO.
     */
    public function update(User $user, Cro $cro): bool
    {
        // First, check for the base permission.
        if (! $user->can('cro_update')) {
            return false;
        }

        // Head Office users can update any CRO.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        // District users can only update CROs in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $cro->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete a CRO.
     */
    public function delete(User $user, Cro $cro): bool
    {
        // First, check for the base permission.
        if (! $user->can('cro_delete')) {
            return false;
        }

        // Head Office users can delete any CRO.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        // District users can only delete CROs in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $cro->district_id;
        }

        return false;
    }
}
