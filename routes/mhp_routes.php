<?php

use Illuminate\Support\Facades\Route;

// Import all controllers for the MHP module
use App\Http\Controllers\MhpSiteController;
use App\Http\Controllers\MhpAdminApprovalController;
use App\Http\Controllers\TAndDWorkController;
use App\Http\Controllers\ProjectPhysicalProgressController;
use App\Http\Controllers\ProjectFinancialInstallmentController;
use App\Http\Controllers\MhpCompletionController;
use App\Http\Controllers\VendorController;

// All routes are placed in a group to apply common middleware
Route::middleware(['web', 'auth'])->group(function () {

    // --- Vendor Auto-Search ---
    // This is a global endpoint and should not be nested under MHP sites.
    Route::get('vendors/auto-search', [VendorController::class, 'getVendors'])->name('vendors.auto-search');

    // --- MHP Sites (Main Resource) ---
    // The core resource for MHP Sites.
    Route::resource('sites', MhpSiteController::class)->names('mhp.sites')->except(['show']);

    // Custom route for fetching sites for searchable selects
    Route::get('sites/auto-search', [MhpSiteController::class, 'getSites'])->name('mhp.sites.auto-search');

    // --- Nested Resources under MHP Sites ---
    // The `->parameters()` call is crucial. It ensures the route segments
    // (e.g., 'sites' and 't-and-d-works') are correctly mapped to controller
    // method parameters ($site and $tAndDWork).

    // MHP Admin Approvals
    Route::resource('sites.admin-approvals', MhpAdminApprovalController::class)->names('mhp.admin-approvals')->parameters([
        'admin-approvals' => 'admin_approval',
        'sites' => 'site',
    ]);

    // T&D Works
    Route::resource('sites.t-and-d-works', TAndDWorkController::class)->names('mhp.t-and-d-works')->parameters([
        't-and-d-works' => 't_and_d_work',
        'sites' => 'site',
    ]);

    // Project Physical Progress
    Route::resource('sites.physical-progresses', ProjectPhysicalProgressController::class)->names('mhp.physical-progresses')->parameters([
        'physical-progresses' => 'physical_progress',
        'sites' => 'site',
    ]);

    // Project Financial Installments
    Route::resource('sites.financial-installments', ProjectFinancialInstallmentController::class)->names('mhp.financial-installments')->parameters([
        'financial-installments' => 'financial_installment',
        'sites' => 'site',
    ]);

    // MHP Completion
    Route::resource('sites.completion', MhpCompletionController::class)->names('mhp.completion')->parameters([
        'completion' => 'completion',
        'sites' => 'site',
    ]);

    // --- General Media Deletion ---
    Route::delete('media/{media}', function (\Spatie\MediaLibrary\MediaCollections\Models\Media $media) {
        // You would add permission checks here, e.g., can('delete media', $media->model)
        $media->delete();
        return response()->json(['success' => true]);
    })->name('media.destroy');
});
