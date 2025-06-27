<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ServiceBindingProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $services = [
            'Attachment', 'Cbo', 'CboDialogue', 'CboExposureVisit', 'CboTraining',
            'IrrigationAdminApproval', 'IrrigationCompletion', 'IrrigationScheme',
            'MhpAdminApproval', 'MhpCompletion', 'MhpEmeProgress', 'MhpSite',
            'OmCost', 'OperationalCost', 'ProjectCostRevision', 'ProjectFinancialInstallment', 'ProjectPhysicalProgress',
            'RevenueRecord', 'User',
            'ProcurementCommitteeMember', 'ProcurementCommitteeReview', 'ProcurementDelivery', 'ProcurementFinalApproval',
            'ProcurementItem', 'ProcurementOrder', 'ProcurementPayment', 'ProcurementQuotation', 'ProcurementRequisition', 'Vendor'
        ];

        foreach ($services as $name) {
            $this->app->bind(
                "App\\Services\\{$name}Service",
                "App\\Services\\{$name}Service"
            );
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
