<?php

namespace App\Policies;

use App\Models\ProjectFinancialInstallment;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class ProjectFinancialInstallmentPolicy extends BasePolicy
{
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('Root')) {
            return true;
        }
        return null;
    }

    public function viewAny(User $user, Model $project): bool
    {
        return $user->can('view', $project);
    }

    public function create(User $user, Model $project): bool
    {
        return $user->can('update', $project);
    }

    public function update(User $user, ProjectFinancialInstallment $installment): bool
    {
        // 'projectable' will be either an MhpSite or an IrrigationScheme model.
        // We pass it to the gate, which finds the correct policy for the parent model.
        return $user->can('update', $installment->projectable);
    }

    public function delete(User $user, ProjectFinancialInstallment $installment): bool
    {
        return $user->can('update', $installment->projectable);
    }
}
