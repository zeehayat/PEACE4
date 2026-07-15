<?php

namespace App\Policies;

use App\Models\ProjectVisit;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class ProjectVisitPolicy extends BasePolicy
{
    public function viewAny(User $user, Model $project): bool
    {
        return $user->can('view', $project);
    }

    public function create(User $user, Model $project): bool
    {
        return $user->can('update', $project);
    }

    public function update(User $user, ProjectVisit $visit): bool
    {
        return $user->can('update', $visit->visitable);
    }

    public function delete(User $user, ProjectVisit $visit): bool
    {
        return $user->can('update', $visit->visitable);
    }
}
