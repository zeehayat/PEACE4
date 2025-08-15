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
        return $user->can('financial_installment_manage');
    }



    public function create(User $user): bool
    {
        return $user->can('financial_installment_manage');
    }

    public function update(User $user, ProjectFinancialInstallment $installment): bool
    {
        if (! $user->can('financial_installment_manage')) {
            return false;
        }

        // Head Office roles can manage any installment.
        if ($user->hasAnyRole(['Super Admin', 'M&E-HO'])) {
            return true;
        }

        // District roles can only manage installments in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $installment->projectable->cbo->district_id;
        }

        return false;
    }

    public function delete(User $user, ProjectFinancialInstallment $installment): bool
    {
        if (! $user->can('financial_installment_manage')) {
            return false;
        }

        // Head Office roles can manage any installment.
        if ($user->hasAnyRole(['Super Admin', 'M&E-HO'])) {
            return true;
        }

        // District roles can only manage installments in their district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT'])) {
            return $user->district_id === $installment->projectable->cbo->district_id;
        }

        return false;
    }
}
