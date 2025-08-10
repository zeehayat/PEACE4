<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LrmCommitteeController;

// All routes within this file will inherit the 'web' middleware
Route::middleware(['web'])->group(function () {
    // ... other routes ...

    // LRM module routes
    Route::resource('lrm-committees', LrmCommitteeController::class)->names('committees'); // Namespaced route names
});
