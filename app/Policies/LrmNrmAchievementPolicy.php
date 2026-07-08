<?php

namespace App\Policies;

use App\Models\LrmNrmAchievement;
use App\Models\User;

class LrmNrmAchievementPolicy extends BasePolicy
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
        return $user->can('lrm_nrm_achievement_view');
    }

    public function view(User $user, LrmNrmAchievement $achievement): bool
    {
        if (! $user->can('lrm_nrm_achievement_view')) {
            return false;
        }

        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO', 'Super Admin'])) {
            return true;
        }

        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->district && $achievement->lrmCommittee->cbo->district === $user->district->name;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('lrm_nrm_achievement_create');
    }

    public function update(User $user, LrmNrmAchievement $achievement): bool
    {
        if (! $user->can('lrm_nrm_achievement_update')) {
            return false;
        }

        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district && $achievement->lrmCommittee->cbo->district === $user->district->name;
        }

        return false;
    }

    public function delete(User $user, LrmNrmAchievement $achievement): bool
    {
        if (! $user->can('lrm_nrm_achievement_delete')) {
            return false;
        }

        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district && $achievement->lrmCommittee->cbo->district === $user->district->name;
        }

        return false;
    }
}
