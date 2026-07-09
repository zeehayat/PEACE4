<?php

namespace App\Policies;

use App\Models\LrmCro;
use App\Models\User;

class LrmCroPolicy extends BasePolicy
{
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    public function viewAny(User $user): bool
    {
        return $user->can('lrm_cro_view');
    }

    public function view(User $user, LrmCro $cro): bool
    {
        if (! $user->can('lrm_cro_view')) {
            return false;
        }

        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO', 'Super Admin'])) {
            return true;
        }

        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->district && $cro->lrmCommittee->cbo->district === $user->district->name;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('lrm_cro_create');
    }

    public function update(User $user, LrmCro $cro): bool
    {
        if (! $user->can('lrm_cro_update')) {
            return false;
        }

        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district && $cro->lrmCommittee->cbo->district === $user->district->name;
        }

        return false;
    }

    public function delete(User $user, LrmCro $cro): bool
    {
        if (! $user->can('lrm_cro_delete')) {
            return false;
        }

        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district && $cro->lrmCommittee->cbo->district === $user->district->name;
        }

        return false;
    }
}
