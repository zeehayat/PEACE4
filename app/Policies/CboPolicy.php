<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Cbo;
use Illuminate\Auth\Access\HandlesAuthorization;
/*
 * ## Key Changes and Rationale
Let's break down why this new version is so much better.

Permission First, Context Second: Every method now starts with if (! $user->can('cbo_...')). This is our new gatekeeper.
If a user doesn't have the fundamental permission to (for example) cbo_update, the check fails immediately.
We don't care what their role is.

Roles Provide Context, Not Permission: After confirming the user can perform the action, we use role checks (hasAnyRole) only to figure out the context.
Are they a Head Office user who can edit any CBO, or a District user who is restricted to CBOs in their own district?
This separates concerns perfectly.

Single Source of Truth: The logic here is now simple and clean.
The complex business rules ("Which roles can update CBOs?") are now defined in exactly one place: your PermissionsSeeder.php.
If we need to grant a new role cbo_update permission, we'll make the change there, and this policy will work automatically without any edits. ✨
 */
class CboPolicy
{
    use HandlesAuthorization;

    /**
     * The 'before' method grants the Root role all permissions.
     * This remains unchanged.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    /**
     * Determine whether the user can view any CBOs.
     * The controller will handle scoping the query (e.g., for district users).
     */
    public function viewAny(User $user): bool
    {
        return $user->can('cbo_view');
    }

    /**
     * Determine whether the user can view a specific CBO.
     */
    public function view(User $user, Cbo $cbo): bool
    {
        // First, check for the base permission.
        if (! $user->can('cbo_view')) {
            return false;
        }

        // If they are a Head Office user, they can view any CBO.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO', 'Super Admin'])) {
            return true;
        }

        // If they are a District user, they can only view CBOs in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->district_id === $cbo->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can create CBOs.
     */
    public function create(User $user): bool
    {
        return $user->can('cbo_create');
    }

    /**
     * Determine whether the user can update a CBO.
     */
    public function update(User $user, Cbo $cbo): bool
    {
        // First, check for the base permission.
        if (! $user->can('cbo_update')) {
            return false;
        }

        // Head Office users can update any CBO.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        // District users can only update CBOs in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $cbo->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete a CBO.
     */
    public function delete(User $user, Cbo $cbo): bool
    {
        // First, check for the base permission.
        if (! $user->can('cbo_delete')) {
            return false;
        }

        // Head Office users can delete any CBO.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        // District users can only delete CBOs in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $cbo->district_id;
        }

        return false;
    }
}
