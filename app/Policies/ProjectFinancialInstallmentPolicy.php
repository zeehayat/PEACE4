<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ProjectFinancialInstallment;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectFinancialInstallmentPolicy
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
        return $user->can('manage mhp financial installment') || $user->can('manage irrigation financial installment');
    }

    public function create(User $user): bool
    {
        return $user->can('manage mhp financial installment') || $user->can('manage irrigation financial installment');
    }

    public function update(User $user, ProjectFinancialInstallment $installment): bool
    {
        if ($user->hasAnyRole(['Admin', 'M&E-HO'])) {
            return true;
        }

        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $installment->projectable->cbo->district_id;
        }

        return false;
    }

    public function delete(User $user, ProjectFinancialInstallment $installment): bool
    {
        if ($user->hasAnyRole(['Admin', 'M&E-HO'])) {
            return true;
        }

        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $installment->projectable->cbo->district_id;
        }

        return false;
    }
}
