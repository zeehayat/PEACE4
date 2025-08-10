<?php

namespace App\Policies;

use App\Models\User;
use App\Models\LrmCommittee;
use Illuminate\Auth\Access\HandlesAuthorization;

class LrmCommitteePolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    /**
     * Determine whether the user can view any LRM committees.
     */
    public function viewAny(User $user): bool
    {
        // All roles with the general 'view lrm committee' permission can access.
        return $user->can('view lrm committee');
    }

    /**
     * Determine whether the user can view a specific LRM committee.
     */
    public function view(User $user, LrmCommittee $lrmCommittee): bool
    {
        // HO roles can view any LRM committee.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO'])) {
            return true;
        }
        // District roles can only view committees in their assigned district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->district_id === $lrmCommittee->cbo->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can create LRM committees.
     */
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['KPO-DISTRICT', 'Engineer-HO']);
    }

    /**
     * Determine whether the user can update an LRM committee.
     */
    public function update(User $user, LrmCommittee $lrmCommittee): bool
    {
        // Admin and HO roles can update any LRM committee.
        if ($user->hasAnyRole(['Admin', 'M&E-HO', 'Engineer-HO'])) {
            return true;
        }
        // District roles can only update committees in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $lrmCommittee->cbo->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete an LRM committee.
     */
    public function delete(User $user, LrmCommittee $lrmCommittee): bool
    {
        // Admin and HO roles can delete any LRM committee.
        if ($user->hasAnyRole(['Admin', 'M&E-HO', 'Engineer-HO'])) {
            return true;
        }
        // District roles can only delete committees in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $lrmCommittee->cbo->district_id;
        }

        return false;
    }
}
