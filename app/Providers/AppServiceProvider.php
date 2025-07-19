<?php

namespace App\Providers;

use App\Models\Cbo;
use App\Models\MhpAdminApproval;
use App\Models\MhpSite;
use App\Models\ProjectFinancialInstallment;
use App\Models\ProjectPhysicalProgress;
use App\Models\TAndDWork;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('flash', function () {
            return [
                'success' => session('success'),
                'error' => session('error'),
            ];
        });

        Relation::enforceMorphMap([
            'cbo' => Cbo::class,
            'mhp_site' => MhpSite::class,
            't_and_d_work' => TAndDWork::class,
            'physical_progress' => ProjectPhysicalProgress::class, // The type used for activity() morph
            'financial_installment' => ProjectFinancialInstallment::class, // The type used for activity() morph
            'mhp_admin_approval'=>MhpAdminApproval::class
            // Add other models that are polymorphic 'projectable' types if they exist (e.g., 'irrigation_scheme' => App\Models\IrrigationScheme::class)
        ]);
    }
}
