<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\AccessControlController;
use App\Http\Controllers\AdminDashboardController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for your admin panel.
| These routes are loaded by the bootstrap/app.php file and are
| automatically prefixed with '/admin' and given the 'admin.' name prefix.
|
*/

Route::middleware(['role:Admin|Root'])->group(function () {
    // Route for the main admin dashboard
    Route::get('/', AdminDashboardController::class)->name('dashboard');

    // User Management Routes
    Route::resource('users', UserController::class);

    // Role & Permission Management Routes
    Route::resource('roles', RoleController::class)->except(['show']);

    // District-scoped access control + audit
    Route::get('access-control', [AccessControlController::class, 'index'])->name('access-control.index');
    Route::post('access-control', [AccessControlController::class, 'store'])->name('access-control.store');
});

Route::get('/test-auth', function () {
    if (auth()->user()->hasRole('Root')) {
        return "User has Root role. Checking permission...";
    }
    return "User does NOT have Root role.";
});
