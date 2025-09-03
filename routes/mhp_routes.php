<?php

use App\Http\Controllers\EmeInfoController;

use Illuminate\Support\Facades\Route;

// Import all controllers for the MHP module
use App\Http\Controllers\MhpSiteController;
use App\Http\Controllers\MhpAdminApprovalController;
use App\Http\Controllers\TAndDWorkController;
use App\Http\Controllers\ProjectPhysicalProgressController;
use App\Http\Controllers\ProjectFinancialInstallmentController;
use App\Http\Controllers\MhpCompletionController;
use App\Http\Controllers\VendorController;
// use App\Http\Controllers\MhpSchemeContractController;


// All routes are placed in a group to apply common middleware
Route::middleware(['web', 'auth'])->group(function () {

    // Vendor Auto-Search
    Route::get('vendors/auto-search', [VendorController::class, 'getVendors'])->name('vendors.auto-search');

    // FIX: Custom route for fetching CBOs for searchable selects
    Route::get('sites/get-cbos', [MhpSiteController::class, 'getCbos'])->name('sites.getCbos');

    // MHP Sites (Main Resource)
    // FIX: Removed the redundant 'mhp.' from the names() method.
    Route::resource('sites', MhpSiteController::class)->names('sites');

    // Custom route for fetching sites for searchable selects
    Route::get('sites/auto-search', [MhpSiteController::class, 'getSites'])->name('sites.auto-search');

    // Nested Resources under MHP Sites
    // FIX: Removed the redundant 'mhp.' prefix from the names() method.
    Route::resource('sites.admin-approvals', MhpAdminApprovalController::class)->names('admin-approvals')->parameters([
        'admin-approvals' => 'admin_approval',
        'sites' => 'site',
    ]);

    // T&D Works
    // FIX: Removed the redundant 'mhp.' prefix from the names() method.
    Route::resource('sites.t-and-d-works', TAndDWorkController::class)->names('sites.t-and-d-works')->parameters([
        't-and-d-works' => 't_and_d_work',
        'sites' => 'site',
    ]);

    // Project Physical Progress
    // FIX: Removed the redundant 'mhp.' prefix from the names() method.
    Route::resource('sites.physical-progresses', ProjectPhysicalProgressController::class)
        ->shallow()
        ->parameters([
            'physical-progresses' => 'physical_progress',
            'sites' => 'site',
        ]);

    // Project Financial Installments
    // FIX: Removed the redundant 'mhp.' prefix from the names() method.
    Route::resource('sites.financial-installments', ProjectFinancialInstallmentController::class)->names('financial-installments')->parameters([
        'financial-installments' => 'financial_installment',
        'sites' => 'site',
    ]);

    // MHP Completion
    // FIX: Removed the redundant 'mhp.' prefix from the names() method.
    Route::resource('sites.completion', MhpCompletionController::class)->names('sites.completion')->parameters([
        'completion' => 'completion',
        'sites' => 'site',
    ]);

    // MHP Scheme Contract
    // FIX: Removed the redundant 'mhp.' prefix from the names() method.
    // Route::resource('sites.contracts', MhpSchemeContractController::class)->names('contracts')->parameters([
    //     'contracts' => 'contract',
    //     'sites' => 'site',
    // ]);

    // General Media Deletion
    Route::delete('media/{media}', function (\Spatie\MediaLibrary\MediaCollections\Models\Media $media) {
        $media->delete();
        return response()->json(['success' => true]);
    })->name('media.destroy');
    Route::post('sites/{site}/eme-info', [EmeInfoController::class, 'store'])->name('sites.eme-info.store');

});
