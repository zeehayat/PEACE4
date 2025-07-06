<?php

use App\Http\Controllers\MhpAdminApprovalController;
use App\Http\Controllers\MhpCompletionController;
use App\Http\Controllers\MhpSiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// MHP

Route::resource('mhp-sites', MhpSiteController::class);
Route::get('/mhp-site/create',[MhpSiteController::class,'create'])->name('mhp-site.create');
Route::put('/mhp-site/{id}',[MhpSiteController::class,'update'])->name('mhp-site.update');
// Admin Approval of MHP
Route::middleware(['role:mhp|mhp-irrigation|cbo-mhp-irrigation|root|admin'])->prefix('mhp')->name('mhp.')->group(function () {
    Route::resource('sites', MhpSiteController::class);
    Route::resource('admin-approvals', MhpAdminApprovalController::class);
});
Route::get('/index',[MhpSiteController::class,'index'])->name('mhp.index');
Route::post('/mhp-admin-approvals',[MhpAdminApprovalController::class,'store'])->name('mhp-admin-approvals.store');
Route::put('/mhp-admin-approvals/{id}',[MhpAdminApprovalController::class,'update'])->name('mhp-admin-approvals.update');
Route::put('/revise-cost/{mhpSite}/{field}', [MhpAdminApprovalController::class, 'updateRevisedCost'])
    ->name('mhp.revise-cost');

Route::post('/mhp-completion/store',[MhpCompletionController::class,'store'])->name('mhp-completion.store');
