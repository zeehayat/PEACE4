<?php

namespace App\Providers;

use App\Models\Cbo;
use App\Models\CboDialogue;
use App\Models\CboExposureVisit;
use App\Models\CboTraining;
use App\Models\IrrigationAdminApproval;
use App\Models\IrrigationCostRevision;
use App\Models\IrrigationScheme;
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
            'cbo_dialogue' => CboDialogue::class,
            'cbo_exposure_visit' => CboExposureVisit::class,
            'cbo_training' => CboTraining::class,
            'mhp_site' => MhpSite::class,
            't_and_d_work' => TAndDWork::class,
            'physical_progress' => ProjectPhysicalProgress::class,
            'financial_installment' => ProjectFinancialInstallment::class,
            'mhp_admin_approval' => MhpAdminApproval::class,
            'irrigation_scheme' => IrrigationScheme::class,
            'irrigation_admin_approval' => IrrigationAdminApproval::class, // <--- ADD THIS LINE
            'irrigation_cost_revision' => IrrigationCostRevision::class, // <--- ADD THIS LINE
        ]);
    }
}
