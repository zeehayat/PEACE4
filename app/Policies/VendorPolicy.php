<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vendor;
use Illuminate\Auth\Access\HandlesAuthorization;

class VendorPolicy extends BasePolicy
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
        return $user->can('vendor_view');
    }

    public function view(User $user, Vendor $vendor): bool
    {
        return $user->can('vendor_view');
    }

    public function create(User $user): bool
    {
        return $user->can('vendor_create');
    }

    public function update(User $user, Vendor $vendor): bool
    {
        return $user->can('vendor_update');
    }

    public function delete(User $user, Vendor $vendor): bool
    {
        return $user->can('vendor_delete');
    }
}
