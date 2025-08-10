<?php

namespace App\Policies;

use App\Models\User;
use App\Models\MhpSite;
use Illuminate\Auth\Access\HandlesAuthorization;

class MhpSitePolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     * The Root role can perform any action.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true; // Root can do anything
        }
        return null;
    }

    /**
     * Determine whether the user can view any MHP sites.
     */
    public function viewAny(User $user): bool
    {
        // HO roles can view all sites. District roles' views are scoped by the controller.
        return $user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO', 'M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT']);
    }

    /**
     * Determine whether the user can view a specific MHP site.
     */
    public function view(User $user, MhpSite $mhpSite): bool
    {
        // HO roles can view any site.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO'])) {
            return true;
        }
        // District roles can only view sites in their assigned district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            // Assumes MhpSite has a Cbo relationship that has a district_id
            return $user->district_id === $mhpSite->cbo->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can create MHP sites.
     */
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['KPO-DISTRICT', 'Engineer-HO', 'Engineer-DISTRICT']);
    }

    /**
     * Determine whether the user can update a MHP site.
     */
    public function update(User $user, MhpSite $mhpSite): bool
    {
        // Admin and HO Engineers can update any site.
        if ($user->hasAnyRole(['Admin', 'M&E-HO', 'Engineer-HO'])) {
            return true;
        }
        // District Engineers can only update sites in their district.
        if ($user->hasRole('Engineer-DISTRICT')) {
            return $user->district_id === $mhpSite->cbo->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete a MHP site.
     */
    public function delete(User $user, MhpSite $mhpSite): bool
    {
        // Admin and HO Engineers can delete any site.
        if ($user->hasAnyRole(['Admin', 'M&E-HO', 'Engineer-HO'])) {
            return true;
        }
        // District Engineers can only delete sites in their district.
        if ($user->hasRole('Engineer-DISTRICT')) {
            return $user->district_id === $mhpSite->cbo->district_id;
        }

        return false;
    }
}
