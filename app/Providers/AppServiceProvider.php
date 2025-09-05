<?php

namespace App\Providers;

use App\Models\Cbo;
use App\Models\CboDialogue;
use App\Models\CboExposureVisit;
use App\Models\CboTraining;
use App\Models\IrrigationAdminApproval;
use App\Models\IrrigationCompletion;
use App\Models\IrrigationCostRevision;
use App\Models\IrrigationScheme;
use App\Models\IrrigationSchemeContract;
use App\Models\IrrigationSchemeProfile;
use App\Models\LrmCommittee;
use App\Models\MhpAdminApproval;
use App\Models\MhpCompletion;
use App\Models\MhpSite;
use App\Models\ProjectFinancialInstallment;
use App\Models\ProjectPhysicalProgress;
use App\Models\TAndDWork;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\URL;

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
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
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
            'irrigation_admin_approval' => IrrigationAdminApproval::class,
            'irrigation_cost_revision' => IrrigationCostRevision::class,
            'irrigation_completion' => IrrigationCompletion::class,
            'irrigation_scheme_profile' => IrrigationSchemeProfile::class,
            'vendor' => Vendor::class,
            'lrm_committee' => LrmCommittee::class,
            'user' => User::class,
            'irrigation_scheme_contract' => IrrigationSchemeContract::class,
            'completion'=>MhpCompletion::class,
            'operational_cost' => 'App\Models\OperationalCost',




        ]);
    }
}
