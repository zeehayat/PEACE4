<?php

namespace App\Policies;

use App\Models\EmeInfo;
use App\Models\MhpSite;
use App\Models\User;

class EmeInfoPolicy
{
    /**
     * Determine whether a user can create or update an EME info record for a given MHP site.
     */
    public function storeOrUpdate(User $user, MhpSite $mhpSite): bool
    {
        // A user can manage EME info if they can update the parent site.
        return $user->can('update', $mhpSite);
    }
}
