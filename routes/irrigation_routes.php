<?php

use Illuminate\Support\Facades\Route;

// Import all controllers for the Irrigation module
use App\Http\Controllers\IrrigationSchemeController;
use App\Http\Controllers\IrrigationAdminApprovalController;
use App\Http\Controllers\IrrigationPhysicalProgressController;
use App\Http\Controllers\IrrigationFinancialProgressController;
use App\Http\Controllers\IrrigationCostRevisionController;
use App\Http\Controllers\IrrigationSchemeContractController;
use App\Http\Controllers\IrrigationReportController;


// All routes are placed in a group to apply common middleware
Route::middleware(['web', 'auth'])->group(function () {

    // Custom route for fetching schemes for searchable selects
    // This more specific route must be defined before the general resource route
    Route::get('schemes/auto-search', [IrrigationSchemeController::class, 'getSchemes'])->name('schemes.auto-search');

    // Nested resources for Admin Approvals
    Route::resource('schemes.admin-approvals', IrrigationAdminApprovalController::class)->parameters([
        'admin-approvals' => 'admin_approval',
        'schemes' => 'scheme',
    ]);

    // Nested resources for ProjectPhysicalProgress
    Route::resource('schemes.physical-progresses', IrrigationPhysicalProgressController::class)
        ->shallow()
        ->parameters([
        'physical-progresses' => 'physical_progress',
        'schemes' => 'scheme',
    ]);

    // Nested resources for ProjectFinancialInstallment
    Route::resource('schemes.financial-installments', IrrigationFinancialProgressController::class)->parameters([
        'financial-installments' => 'financial_installment',
        'schemes' => 'scheme',
    ]);

    // Nested resources for Cost Revisions (nested under Admin Approvals)
    Route::resource('admin-approvals.cost-revisions', IrrigationCostRevisionController::class)->parameters([
        'cost-revisions' => 'cost_revision',
        'admin-approvals' => 'admin_approval',
    ])->except(['show']);
    Route::get('admin-approvals/{admin_approval}/cost-revisions', [IrrigationCostRevisionController::class, 'index'])->name('admin-approvals.cost-revisions.index');

    // Nested resources for Scheme Contracts
    Route::resource('schemes.contracts', IrrigationSchemeContractController::class)->parameters([
        'contracts' => 'contract',
        'schemes' => 'scheme',
    ]);

    Route::get('schemes/report', [IrrigationReportController::class, 'index'])->name('reports.schemes');

    // Main Irrigation Scheme resource
    // FIX: This general resource route is now placed last to avoid conflicts
    Route::resource('schemes', IrrigationSchemeController::class);
});
