<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vendor;
use Illuminate\Auth\Access\HandlesAuthorization;

class VendorPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    /**
     * Determine whether the user can view any vendors.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('view vendor');
    }

    /**
     * Determine whether the user can view a specific vendor.
     */
    public function view(User $user, Vendor $vendor): bool
    {
        return $user->can('view vendor');
    }

    /**
     * Determine whether the user can create vendors.
     */
    public function create(User $user): bool
    {
        return $user->can('create vendor');
    }

    /**
     * Determine whether the user can update a vendor.
     */
    public function update(User $user, Vendor $vendor): bool
    {
        return $user->can('update vendor');
    }

    /**
     * Determine whether the user can delete a vendor.
     */
    public function delete(User $user, Vendor $vendor): bool
    {
        return $user->can('delete vendor');
    }
}
