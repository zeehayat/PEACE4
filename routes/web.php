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
use App\Http\Controllers\VendorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/test-r2-upload', function() {
    $testContent = 'Hello from Laravel to Cloudflare R2! ' . now();
    $testFileName = 'test_upload_' . time() . '.txt';

    try {
        // Attempt to put file directly using the 'cloudflare_r2' disk
        $success = Storage::disk('cloudflare_r2')->put($testFileName, $testContent);

        if ($success) {
            Log::info('R2 Direct Upload Success!', ['file' => $testFileName, 'url' => Storage::disk('cloudflare_r2')->url($testFileName)]);
            return "Direct upload to R2 succeeded! Check your R2 bucket. File: " . $testFileName;
        } else {
            Log::error('R2 Direct Upload Failed! (returned false)');
            return "Direct upload to R2 failed (returned false). Check Laravel logs for more info.";
        }
    } catch (\Exception $e) {
        Log::error('R2 Direct Upload Exception:', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);
        return "Direct upload to R2 threw an exception: " . $e->getMessage() . " (Check logs)";
    }
});

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

Route::middleware(['web'])->group(function(){
    Route::get('vendors/auto-search', [VendorController::class, 'getVendors'])->name('vendors.auto-search');

});



// All routes within this file will inherit the 'web' middleware
Route::middleware(['web'])->group(function () {
    // ... other routes ...

    // Vendor module routes
    Route::resource('vendors', VendorController::class)->names('vendor.vendors'); // Namespaced route names

    // Specific API endpoint for searchable select (already provided, ensuring consistency)
    Route::get('vendors/auto-search', [VendorController::class, 'getVendors'])->name('vendors.auto-search');
});
