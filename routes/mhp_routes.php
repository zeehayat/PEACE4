<?php

use App\Http\Controllers\MhpAdminApprovalController;
use App\Http\Controllers\MhpCompletionController;
use App\Http\Controllers\MhpEmeFinancialProgressController;
use App\Http\Controllers\MhpEmePhysicalProgressController;

use App\Http\Controllers\MhpSiteController;
use App\Http\Controllers\OperationalCostController;
use App\Http\Controllers\ProjectFinancialInstallmentController;
use App\Http\Controllers\ProjectPhysicalProgressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// MHP

// IMPORTANT: This file is already prefixed with '/mhp' and named 'mhp.'
// by bootstrap/app.php. DO NOT add 'mhp/' to URIs or 'mhp.' to names here.

// TEMPORARY DEVELOPMENT CHANGE: Removing specific role middleware and 'auth' for easy testing.
// REVERT THIS BEFORE PRODUCTION DEPLOYMENT!
// Original (likely): Route::middleware(['role:mhp|mhp-irrigation|cbo-mhp-irrigation|root|admin'])->group(function () {
// Modified:
Route::middleware(['web'])->group(function () { // Removed specific role middleware and 'auth' if it was there
    // --- MHP Sites (Main Resource) ---
    Route::resource('sites', MhpSiteController::class)->names([
        'index' => 'sites.index',
        'create' => 'sites.create',
        'store' => 'sites.store',
        'show' => 'sites.show',
        'edit' => 'sites.edit',
        'update' => 'sites.update',
        'destroy' => 'sites.destroy',
    ]);

    // Custom MHP Index (if you have a separate landing page, otherwise use sites.index)
    Route::get('/', [MhpSiteController::class, 'index'])->name('index'); // URI: /mhp/ , Name: mhp.index

    // --- MHP Admin Approvals Resource ---
    Route::resource('admin-approvals', MhpAdminApprovalController::class)->except(['create', 'edit'])
        ->names([
            'index' => 'admin-approvals.index',
            'store' => 'admin-approvals.store',
            'show' => 'admin-approvals.show',
            'update' => 'admin-approvals.update',
            'destroy' => 'admin-approvals.destroy',
        ]);

    // --- MHP Completion ---
    Route::post('/mhp-completion/store', [MhpCompletionController::class, 'store'])->name('mhp-completion.store');

    // --- MHP EME Physical Progress ---
    Route::resource('eme-physical-progresses', MhpEmePhysicalProgressController::class)->names([
        'index' => 'eme-physical-progresses.index',
        'store' => 'eme-physical-progresses.store',
        'show' => 'eme-physical-progresses.show',
        'update' => 'eme-physical-progresses.update',
        'destroy' => 'eme-physical-progresses.destroy',
    ]);

    // --- MHP EME Financial Progress ---
    Route::resource('eme-financial-progresses', MhpEmeFinancialProgressController::class)->names([
        'index' => 'eme-financial-progresses.index',
        'store' => 'eme-financial-progresses.store',
        'show' => 'eme-financial-progresses.show',
        'update' => 'eme-financial-progresses.update',
        'destroy' => 'eme-financial-progresses.destroy',
    ]);

    // --- Operational Costs ---
    Route::resource('operational-costs', OperationalCostController::class)->names([
        'index' => 'operational-costs.index',
        'store' => 'operational-costs.store',
        'show' => 'operational-costs.show',
        'update' => 'operational-costs.update',
        'destroy' => 'operational-costs.destroy',
    ]);
    Route::get('expense-types', [OperationalCostController::class, 'expenseTypes'])->name('expense-types');

    // --- Polymorphic Project Progress (Generic) ---
    Route::resource('project-physical-progress', ProjectPhysicalProgressController::class)->only(['index', 'store', 'show', 'update', 'destroy'])
        ->names([
            'index' => 'project-physical-progress.index',
            'store' => 'project-physical-progress.store',
            'show' => 'project-physical-progress.show',
            'update' => 'project-physical-progress.update',
            'destroy' => 'project-physical-progress.destroy',
        ]);
    Route::resource('project-financial-installments', ProjectFinancialInstallmentController::class)->only(['index', 'store', 'show', 'update', 'destroy'])
        ->names([
            'index' => 'project-financial-installments.index',
            'store' => 'project-financial-installments.store',
            'show' => 'project-financial-installments.show',
            'update' => 'project-financial-installments.update',
            'destroy' => 'project-financial-installments.destroy',
        ]);

    // --- Custom Update Revised Cost (Specific to MhpAdminApprovalController) ---
    Route::put('/revise-cost/{mhpSite}/{field}', [MhpAdminApprovalController::class, 'updateRevisedCost'])->name('revise-cost');

    // --- General Media Deletion ---
    Route::delete('media/{media}', function (\Spatie\MediaLibrary\MediaCollections\Models\Media $media) {
        $media->delete();
        return response()->json(['success' => true]);
    })->name('media.destroy');
});
