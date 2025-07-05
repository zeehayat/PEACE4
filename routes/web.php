<?php

use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CboController;
use App\Http\Controllers\CboDialogueController;
use App\Http\Controllers\CboExposureVisitController;
use App\Http\Controllers\CboTrainingController;
use App\Http\Controllers\MhpAdminApprovalController;
use App\Http\Controllers\MhpSiteController;
use App\Http\Controllers\ProjectCostRevisionController;
use App\Http\Controllers\ProjectFinancialInstallmentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



// Procurment Stub
Route::middleware(['role:procurement|mhp|mhp-irrigation|cbo-mhp-irrigation|root|admin'])->prefix('procurement')->name('procurement.')->group(function () {
    Route::resource('cost-revisions', ProjectCostRevisionController::class);
    Route::resource('installments', ProjectFinancialInstallmentController::class);
});

// Generic Routes
Route::middleware(['role:admin|root'])->group(function () {
    Route::resource('users', UserController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::resource('attachments', AttachmentController::class)->only(['store', 'destroy', 'show']);
});

// Login




Route::get('/login', function () {
    //return response()->json(['message' => 'hello from login']);

    return Inertia::render('Auth/Login');
})->middleware('guest')->name('login');
Route::get('/', function () {
    return redirect()->route(auth()->check() ? 'dashboard' : 'login');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware('auth')->name('dashboard');

// Handle login form submission
Route::post('/login', [LoginController::class, 'login'])->middleware('guest');

// Optional: logout
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth');

// Auto Search
Route::get('/cbos/auto-search', [MhpSiteController::class, 'autoSearch']);
