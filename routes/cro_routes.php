<?php

use App\Http\Controllers\CroController;
use Illuminate\Support\Facades\Route;

// Prefix: /cro
// Name: cro.
Route::middleware(['web'])->group(function () {
    Route::resource('cros', CroController::class);
    // Add any other specific CRO routes here
});
