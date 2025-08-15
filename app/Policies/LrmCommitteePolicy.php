<?php

namespace App\Policies;

use App\Models\User;
use App\Models\LrmCommittee;
use Illuminate\Auth\Access\HandlesAuthorization;

class LrmCommitteePolicy
{
    use HandlesAuthorization;

    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    public function viewAny(User $user): bool
    {
        return $user->can('lrm_committee_view');
    }

    public function view(User $user, LrmCommittee $lrmCommittee): bool
    {
        if (! $user->can('lrm_committee_view')) {
            return false;
        }

        // Head Office roles can view any committee.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO', 'Super Admin'])) {
            return true;
        }

        // District roles can only view committees in their assigned district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->district_id === $lrmCommittee->cbo->district_id;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('lrm_committee_create');
    }

    public function update(User $user, LrmCommittee $lrmCommittee): bool
    {
        if (! $user->can('lrm_committee_update')) {
            return false;
        }

        // Head Office roles can update any committee.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        // District roles can only update committees in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $lrmCommittee->cbo->district_id;
        }

        return false;
    }

    public function delete(User $user, LrmCommittee $lrmCommittee): bool
    {
        if (! $user->can('lrm_committee_delete')) {
            return false;
        }

        // Head Office roles can delete any committee.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        // District roles can only delete committees in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $lrmCommittee->cbo->district_id;
        }

        return false;
    }
}
