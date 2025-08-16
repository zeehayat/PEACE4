<?php

namespace App\Policies;

use App\Models\ProjectPhysicalProgress;
use App\Models\User;
use App\Models\MhpSite;
use App\Models\IrrigationScheme;
use Illuminate\Database\Eloquent\Model;

class ProjectPhysicalProgressPolicy extends BasePolicy
{
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    public function viewAny(User $user, Model $project): bool
    {
        return $user->can('view', $project);
    }

    public function create(User $user, Model $project): bool
    {
        return $user->can('update', $project);
    }

    public function update(User $user, ProjectPhysicalProgress $progress): bool
    {
        // 'projectable' will be either an MhpSite or an IrrigationScheme model.
        // We just pass it to the gate, which will find the correct policy (MhpSitePolicy or IrrigationSchemePolicy).
        return $user->can('update', $progress->projectable);
    }

    public function delete(User $user, ProjectPhysicalProgress $progress): bool
    {
        return $user->can('update', $progress->projectable);
    }
}
