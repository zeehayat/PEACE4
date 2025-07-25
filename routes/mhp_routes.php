<?php

use App\Http\Controllers\MhpAdminApprovalController;
use App\Http\Controllers\MhpCompletionController;
use App\Http\Controllers\MhpEmeFinancialProgressController; // Keep if these controllers are still used
use App\Http\Controllers\MhpEmePhysicalProgressController;   // Keep if these controllers are still used
use App\Http\Controllers\OperationalCostController;          // Keep if this controller is still used

use App\Http\Controllers\MhpSiteController;
use App\Http\Controllers\ProjectPhysicalProgressController;
use App\Http\Controllers\ProjectFinancialInstallmentController;
use App\Http\Controllers\TAndDWorkController;

use Illuminate\Support\Facades\Route;

// All routes within this file will inherit the 'mhp' prefix and 'mhp.' name
// from the configuration in bootstrap/app.php.
// This group is solely for applying the role-based middleware.
//Route::middleware(['role:mhp|mhp-irrigation|cbo-mhp-irrigation|root|admin'])->group(function () {

    // --- MHP Sites (Main Resource) ---
    // Accessible via /mhp/sites, named mhp.sites.index, mhp.sites.store, etc.
Route::get('sites/get-cbos', [MhpSiteController::class, 'getCbos'])->name('sites.getCbos');
    Route::resource('sites', MhpSiteController::class)->names([
        'index' => 'sites.index',
        'create' => 'sites.create',
        'store' => 'sites.store',
        'show' => 'sites.show',
        'edit' => 'sites.edit',
        'update' => 'sites.update',
        'destroy' => 'sites.destroy',
    ]);

    // Custom MHP Index (if a dedicated landing page for /mhp is needed, otherwise sites.index may suffice)
    // Accessible via /mhp/, named mhp.index
    Route::get('/', [MhpSiteController::class, 'index'])->name('index');

    // --- MHP Admin Approvals Resource ---
    // Accessible via /mhp/admin-approvals, named mhp.admin-approvals.index, mhp.admin-approvals.store, etc.
    Route::resource('admin-approvals', MhpAdminApprovalController::class)->except(['create', 'edit'])
        ->names([
            'index' => 'admin-approvals.index',
            'store' => 'admin-approvals.store',
            'show' => 'admin-approvals.show',
            'update' => 'admin-approvals.update',
            'destroy' => 'admin-approvals.destroy',
        ]);

    // --- MHP Completion ---
    // Accessible via /mhp/sites/{mhpSite}/completion, named mhp.sites.completion.store, etc.
    Route::post('sites/{mhpSite}/completion', [MhpCompletionController::class, 'store'])->name('sites.completion.store');
    Route::put('sites/{mhpSite}/completion/{completion}', [MhpCompletionController::class, 'update'])->name('sites.completion.update');
    Route::get('sites/{mhpSite}/completion/{completion}', [MhpCompletionController::class, 'show'])->name('sites.completion.show');
    Route::delete('sites/{mhpSite}/completion/{completion}', [MhpCompletionController::class, 'destroy'])->name('sites.completion.destroy');

    // --- T&D Works Resource (Nested under sites) ---
    // Accessible via /mhp/sites/{site}/t-and-d-works, named mhp.sites.t-and-d-works.index, etc.
    Route::resource('sites.t-and-d-works', TAndDWorkController::class);

    // --- Project Physical Progress (Nested under sites) ---
    // Accessible via /mhp/sites/{site}/physical-progresses, named mhp.sites.physical-progresses.index, etc.
    Route::resource('sites.physical-progresses', ProjectPhysicalProgressController::class);

    // --- Project Financial Installments (Nested under sites) ---
    // Accessible via /mhp/sites/{site}/financial-installments, named mhp.sites.financial-installments.index, etc.
    Route::resource('sites.financial-installments', ProjectFinancialInstallmentController::class);

    // --- CBO Auto-Search ---
    // Accessible via /mhp/sites/get-cbos, named mhp.sites.getCbos


    // --- Custom Update Revised Cost (Specific to MhpAdminApprovalController) ---
    // Accessible via /mhp/revise-cost/{mhpSite}/{field}, named mhp.revise-cost
    Route::put('/revise-cost/{mhpSite}/{field}', [MhpAdminApprovalController::class, 'updateRevisedCost'])->name('revise-cost');

    // --- General Media Deletion ---
    // Accessible via /mhp/media/{media}, named mhp.media.destroy
    Route::delete('media/{media}', function (\Spatie\MediaLibrary\MediaCollections\Models\Media $media) {
        $media->delete();
        return response()->json(['success' => true]);
    })->name('media.destroy');

    // --- IMPORTANT: Legacy/Old MHP EME/Operational Cost Routes ---
    // Please confirm if these are still actively used or should be removed.
    Route::resource('eme-physical-progresses', MhpEmePhysicalProgressController::class)->names([
        'index' => 'eme-physical-progresses.index', 'store' => 'eme-physical-progresses.store',
        'show' => 'eme-physical-progresses.show', 'update' => 'eme-physical-progresses.update',
        'destroy' => 'eme-physical-progresses.destroy',
    ]);
    Route::resource('eme-financial-progresses', MhpEmeFinancialProgressController::class)->names([
        'index' => 'eme-financial-progresses.index', 'store' => 'eme-financial-progresses.store',
        'show' => 'eme-financial-progresses.show', 'update' => 'eme-financial-progresses.update',
        'destroy' => 'eme-financial-progresses.destroy',
    ]);
    Route::resource('operational-costs', OperationalCostController::class)->names([
        'index' => 'operational-costs.index', 'store' => 'operational-costs.store',
        'show' => 'operational-costs.show', 'update' => 'operational-costs.update',
        'destroy' => 'operational-costs.destroy',
    ]);
    Route::get('expense-types', [OperationalCostController::class, 'expenseTypes'])->name('expense-types');


//}); // End of the single middleware group
Route::middleware([
    // Removed roles, but if you re-add 'web' middleware later, ensure it's here
    \Illuminate\Session\Middleware\StartSession::class, // Keep this for session
])->group(function () {

    // ... (MHP Sites, Admin Approvals, Completion routes) ...

    // --- T&D Works Resource (Nested under sites) ---
    // Explicitly name the parent parameter 'site' to match the model binding
    Route::resource('sites.t-and-d-works', TAndDWorkController::class)->parameters([
        't-and-d-works' => 't_and_d_work', // <--- Explicitly define the child parameter name
        'sites' => 'site',
    ]);

    // --- Project Physical Progress (Nested under sites) ---
    // Explicitly name the parent parameter 'site'
    Route::resource('sites.physical-progresses', ProjectPhysicalProgressController::class)->parameters([
        'physical-progresses' => 'physical_progress', // default
        'sites' => 'site', // <--- ADD THIS LINE
    ]);

    // --- Project Financial Installments (Nested under sites) ---
    // Explicitly name the parent parameter 'site'
    Route::resource('sites.financial-installments', ProjectFinancialInstallmentController::class)->parameters([
        'financial-installments' => 'financial_installment', // default
        'sites' => 'site', // <--- ADD THIS LINE
    ]);

    // ... (other routes) ...

});
