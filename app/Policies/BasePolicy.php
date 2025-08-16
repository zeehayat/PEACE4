<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BasePolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     * This method will be inherited by all other policies.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasAnyRole(['Super Admin', 'Root'])) {
            return true;
        }

        return null; // Return null to fall through to the policy's specific method
    }
}
