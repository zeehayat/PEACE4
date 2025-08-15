<?php

namespace App\Policies;

use App\Models\MhpSite;
use App\Models\User;

class MhpProjectPhysicalProgressPolicy
{
    /**
     * Determine whether the user can create physical progress for a site.
     */
    public function create(User $user, MhpSite $mhpSite): bool
    {
        // A user can add physical progress if they can update the parent site.
        return $user->can('update', $mhpSite);
    }
}
