<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ProjectPhysicalProgress;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectPhysicalProgressPolicy
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
        return $user->can('manage mhp physical progress') || $user->can('manage irrigation physical progress');
    }

    public function create(User $user): bool
    {
        return $user->can('manage mhp physical progress') || $user->can('manage irrigation physical progress');
    }

    public function update(User $user, ProjectPhysicalProgress $progress): bool
    {
        if ($user->hasAnyRole(['Admin', 'M&E-HO'])) {
            return true;
        }

        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            // Check if the related project (MHP or Irrigation) is in the user's district.
            return $user->district_id === $progress->projectable->cbo->district_id;
        }

        return false;
    }

    public function delete(User $user, ProjectPhysicalProgress $progress): bool
    {
        if ($user->hasAnyRole(['Admin', 'M&E-HO'])) {
            return true;
        }

        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $progress->projectable->cbo->district_id;
        }

        return false;
    }
}
