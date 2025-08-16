<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

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

// Route for the main admin dashboard (if you have one)
Route::get('/', function () {
    return inertia('Admin/Dashboard');
})->name('dashboard');

// User Management Routes
Route::resource('users', UserController::class);

// Role & Permission Management Routes
Route::resource('roles', RoleController::class)->except(['show']);
