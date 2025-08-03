<?php

use App\Http\Controllers\IrrigationSchemeContractController;
use Illuminate\Support\Facades\Route;

// Import all controllers
use App\Http\Controllers\IrrigationSchemeController;
use App\Http\Controllers\IrrigationAdminApprovalController;
use App\Http\Controllers\ProjectPhysicalProgressController;
use App\Http\Controllers\ProjectFinancialInstallmentController;
use App\Http\Controllers\IrrigationCostRevisionController;

// All routes within this file will inherit the 'irrigation' prefix and 'irrigation.' name from the configuration
Route::middleware(['web'])->group(function () {

    // Main Irrigation Scheme resource
    Route::resource('schemes', IrrigationSchemeController::class);

    // Get irrigation schemes for searchable select input (if needed)
    Route::get('schemes/auto-search', [IrrigationSchemeController::class, 'getSchemes'])->name('schemes.auto-search');

    // Nested resources for Admin Approvals
    Route::resource('schemes.admin-approvals', IrrigationAdminApprovalController::class)->parameters([
        'admin-approvals' => 'admin_approval',
        'schemes' => 'scheme', // <--- This parameter name must match the controller parameter
    ]);

    // Nested resources for ProjectPhysicalProgress and ProjectFinancialInstallment
    Route::resource('schemes.physical-progresses', ProjectPhysicalProgressController::class)->parameters([
        'physical-progresses' => 'physical_progress',
        'schemes' => 'scheme',
    ]);
    Route::resource('schemes.financial-installments', ProjectFinancialInstallmentController::class)->parameters([
        'financial-installments' => 'financial_installment',
        'schemes' => 'scheme',
    ]);

    // Nested resources for Cost Revisions (nested under Admin Approvals)
    Route::resource('admin-approvals.cost-revisions', IrrigationCostRevisionController::class)->parameters([
        'cost-revisions' => 'cost_revision',
        'admin-approvals' => 'admin_approval',
    ]);

    // Nested resources for Scheme Contracts
    Route::resource('schemes.contracts', IrrigationSchemeContractController::class)->parameters([
        'contracts' => 'contract', // Use 'contract' for the child model
        'schemes' => 'scheme', // Use 'scheme' for the parent model
    ]);

});
