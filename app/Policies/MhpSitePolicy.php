<?php

namespace App\Policies;

use App\Models\User;
use App\Models\MhpSite;
use Illuminate\Auth\Access\HandlesAuthorization;

class MhpSitePolicy extends BasePolicy
{
    use HandlesAuthorization;

    /**
     * The 'before' method handles the Root user. This remains unchanged.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    /**
     * Determine whether the user can view any MHP sites.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('mhp_site_view');
    }

    /**
     * Determine whether the user can view a specific MHP site.
     */
    public function view(User $user, MhpSite $mhpSite): bool
    {
        if (! $user->can('mhp_site_view')) {
            return false;
        }

        // Head Office roles can view any site.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO', 'Super Admin'])) {
            return true;
        }

        // District roles can only view sites in their assigned district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->district_id === $mhpSite->cbo->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can create MHP sites.
     */
    public function create(User $user): bool
    {
        return $user->can('mhp_site_create');
    }

    /**
     * Determine whether the user can update an MHP site.
     */
    public function update(User $user, MhpSite $mhpSite): bool
    {
        if (! $user->can('mhp_site_update')) {
            return false;
        }

        // Head Office roles can update any site.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        // District roles can only update sites in their district.
        if ($user->hasRole('Engineer-DISTRICT')) {
            return $user->district_id === $mhpSite->cbo->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete an MHP site.
     */
    public function delete(User $user, MhpSite $mhpSite): bool
    {
        if (! $user->can('mhp_site_delete')) {
            return false;
        }

        // Head Office roles can delete any site.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'Super Admin'])) {
            return true;
        }

        // District roles can only delete sites in their district.
        if ($user->hasRole('Engineer-DISTRICT')) {
            return $user->district_id === $mhpSite->cbo->district_id;
        }

        return false;
    }
}
