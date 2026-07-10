<?php

namespace App\Policies;

use App\Models\District;
use App\Models\User;

class DistrictPolicy extends BasePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('district_manage');
    }

    public function create(User $user): bool
    {
        return $user->can('district_manage');
    }
}
