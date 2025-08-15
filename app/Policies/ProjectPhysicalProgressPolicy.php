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
        return $user->can('physical_progress_manage');
    }

    public function create(User $user): bool
    {
        return $user->can('physical_progress_manage');
    }

    public function update(User $user, ProjectPhysicalProgress $progress): bool
    {
        if (! $user->can('physical_progress_manage')) {
            return false;
        }

        // Head Office roles can manage any progress report.
        if ($user->hasAnyRole(['Super Admin', 'M&E-HO'])) {
            return true;
        }

        // District roles can only manage progress for projects in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $progress->projectable->cbo->district_id;
        }

        return false;
    }

    public function delete(User $user, ProjectPhysicalProgress $progress): bool
    {
        if (! $user->can('physical_progress_manage')) {
            return false;
        }

        // Head Office roles can manage any progress report.
        if ($user->hasAnyRole(['Super Admin', 'M&E-HO'])) {
            return true;
        }

        // District roles can only manage progress for projects in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $progress->projectable->cbo->district_id;
        }

        return false;
    }
}
