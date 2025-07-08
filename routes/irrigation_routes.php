<?php

use App\Http\Controllers\IrrigationSchemeContractController;
use App\Http\Controllers\IrrigationSchemeController; // Import the controller
use App\Http\Controllers\IrrigationAdminApprovalController;
use App\Http\Controllers\IrrigationCompletionController;
use Illuminate\Support\Facades\Route;

// Irrigation Routes
//Route::middleware(['role:irrigation|mhp-irrigation|cbo-mhp-irrigation|root|admin'])->group(function () {
    Route::resource('irrigation-schemes', IrrigationSchemeController::class);

    // TODO: Add irrigation specific resource routes for admin approvals and completions when implemented
    // Route::resource('admin-approvals', IrrigationAdminApprovalController::class);
    // Route::resource('completions', IrrigationCompletionController::class);
//});

Route::resource('irrigation-schemes', IrrigationSchemeController::class);
Route::resource('irrigation-scheme-contracts', IrrigationSchemeContractController::class); // New resource route

// Existing irrigation-specific resource routes
Route::resource('admin-approvals', IrrigationAdminApprovalController::class);
Route::resource('completions', IrrigationCompletionController::class); // Assuming this is also a resource

// A route for the main index page, if different from resource index
Route::get('/index', [IrrigationSchemeController::class, 'index'])->name('index');
