<?php

namespace App\Providers;

use App\Models\Cbo;
use App\Models\IrrigationScheme;
use App\Models\LrmCommittee;
use App\Models\MhpAdminApproval;
use App\Models\MhpCompletion;
use App\Models\MhpEmeFinancialProgress;
use App\Models\MhpEmePhysicalProgress;
use App\Models\MhpSite;
use App\Models\ProjectFinancialInstallment;
use App\Models\ProjectPhysicalProgress;
use App\Models\User;
use App\Models\Vendor;
use App\Policies\CboPolicy;
use App\Policies\IrrigationSchemePolicy;
use App\Policies\LrmCommitteePolicy;
use App\Policies\MhpAdminApprovalPolicy;
use App\Policies\MhpCompletionPolicy;
use App\Policies\MhpEmeFinancialProgressPolicy;
use App\Policies\MhpEmePhysicalProgressPolicy;
use App\Policies\MhpFinancialInstallmentPolicy;
use App\Policies\MhpProjectPhysicalProgressPolicy;
use App\Policies\MhpSitePolicy;
use App\Policies\ProjectFinancialInstallmentPolicy;
use App\Policies\ProjectPhysicalProgressPolicy;
use App\Policies\UserPolicy;
use App\Policies\VendorPolicy;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }
    protected array $policies = [
        Cbo::class => CboPolicy::class,
        MhpSite::class => MhpSitePolicy::class,
        IrrigationScheme::class => IrrigationSchemePolicy::class,
        LrmCommittee::class => LrmCommitteePolicy::class,
        ProjectFinancialInstallment::class => MhpFinancialInstallmentPolicy::class,
        ProjectPhysicalProgress::class => ProjectPhysicalProgressPolicy::class,
        User::class => UserPolicy::class,
        Vendor::class => VendorPolicy::class,
        MhpAdminApproval::class => MhpAdminApprovalPolicy::class,
        MhpEmeFinancialProgress::class => MhpEmeFinancialProgressPolicy::class,
        MhpEmePhysicalProgress::class => MhpEmePhysicalProgressPolicy::class,
        MhpCompletion::class => MhpCompletionPolicy::class,


        // We will add all our other policies here as we refactor them
    ];
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // This Gate rule grants full access to specified roles
        Gate::before(function (User $user, string $ability) {
            // ADD 'Root' TO THIS ARRAY
            if ($user->hasAnyRole(['Super Admin', 'Root'])) {
                return true;
            }
            return null;
        });
    }
}
