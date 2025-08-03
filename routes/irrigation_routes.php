<?php

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

    // Nested resources for ProjectPhysicalProgress and ProjectFinancialInstallment
    Route::resource('schemes.physical-progresses', ProjectPhysicalProgressController::class)->parameters([
        'physical-progresses' => 'physical_progress',
        'schemes' => 'scheme', // Explicitly name parent parameter for binding
    ]);
    Route::resource('schemes.financial-installments', ProjectFinancialInstallmentController::class)->parameters([
        'financial-installments' => 'financial_installment',
        'schemes' => 'scheme', // Explicitly name parent parameter for binding
    ]);

    // Nested resources for Admin Approvals and their Cost Revisions
    Route::resource('schemes.admin-approvals', IrrigationAdminApprovalController::class)->parameters([
        'admin-approvals' => 'admin_approval',
        'schemes' => 'scheme',
    ]);
    Route::resource('admin-approvals.cost-revisions', IrrigationCostRevisionController::class)->parameters([
        'cost-revisions' => 'cost_revision',
        'admin-approvals' => 'admin_approval',
    ]);

});
