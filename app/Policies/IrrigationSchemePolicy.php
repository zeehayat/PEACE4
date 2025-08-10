<?php

namespace App\Policies;

use App\Models\User;
use App\Models\IrrigationScheme;
use Illuminate\Auth\Access\HandlesAuthorization;

class IrrigationSchemePolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     * The Root role can perform any action.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    /**
     * Determine whether the user can view any irrigation schemes.
     */
    public function viewAny(User $user): bool
    {
        // HO roles can view all schemes. District roles' views are scoped by the controller.
        return $user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO', 'M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT']);
    }

    /**
     * Determine whether the user can view a specific irrigation scheme.
     */
    public function view(User $user, IrrigationScheme $irrigationScheme): bool
    {
        // HO roles can view any scheme.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO'])) {
            return true;
        }
        // District roles can only view schemes in their assigned district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->district_id === $irrigationScheme->cbo->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can create irrigation schemes.
     */
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['KPO-DISTRICT', 'Engineer-HO', 'Engineer-DISTRICT']);
    }

    /**
     * Determine whether the user can update an irrigation scheme.
     */
    public function update(User $user, IrrigationScheme $irrigationScheme): bool
    {
        // Admin and HO Engineers can update any scheme.
        if ($user->hasAnyRole(['Admin', 'Engineer-HO'])) {
            return true;
        }
        // District Engineers can only update schemes in their district.
        if ($user->hasRole('Engineer-DISTRICT')) {
            return $user->district_id === $irrigationScheme->cbo->district_id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete an irrigation scheme.
     */
    public function delete(User $user, IrrigationScheme $irrigationScheme): bool
    {
        // Admin and HO Engineers can delete any scheme.
        if ($user->hasAnyRole(['Admin', 'Engineer-HO'])) {
            return true;
        }
        // District Engineers can only delete schemes in their district.
        if ($user->hasRole('Engineer-DISTRICT')) {
            return $user->district_id === $irrigationScheme->cbo->district_id;
        }

        return false;
    }
}
