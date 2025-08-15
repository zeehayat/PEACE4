<?php

namespace App\Policies;

use App\Models\User;
use App\Models\IrrigationScheme;
use Illuminate\Auth\Access\HandlesAuthorization;

class IrrigationSchemePolicy
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
        return $user->can('irrigation_scheme_view');
    }

    public function view(User $user, IrrigationScheme $irrigationScheme): bool
    {
        if (! $user->can('irrigation_scheme_view')) {
            return false;
        }

        // Head Office roles can view any scheme.
        if ($user->hasAnyRole(['M&E-HO', 'Engineer-HO', 'KPO-HO', 'Viewer-HO', 'Super Admin'])) {
            return true;
        }

        // District roles can only view schemes in their assigned district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            return $user->district_id === $irrigationScheme->cbo->district_id;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('irrigation_scheme_create');
    }

    public function update(User $user, IrrigationScheme $irrigationScheme): bool
    {
        if (! $user->can('irrigation_scheme_update')) {
            return false;
        }

        // Admin and HO Engineers can update any scheme.
        if ($user->hasAnyRole(['Super Admin', 'Engineer-HO'])) {
            return true;
        }

        // District Engineers can only update schemes in their district.
        if ($user->hasRole('Engineer-DISTRICT')) {
            return $user->district_id === $irrigationScheme->cbo->district_id;
        }

        return false;
    }

    public function delete(User $user, IrrigationScheme $irrigationScheme): bool
    {
        if (! $user->can('irrigation_scheme_delete')) {
            return false;
        }

        // Admin and HO Engineers can delete any scheme.
        if ($user->hasAnyRole(['Super Admin', 'Engineer-HO'])) {
            return true;
        }

        // District Engineers can only delete schemes in their district.
        if ($user->hasRole('Engineer-DISTRICT')) {
            return $user->district_id === $irrigationScheme->cbo->district_id;
        }

        return false;
    }
}
