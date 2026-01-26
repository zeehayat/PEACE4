<?php

use App\Http\Controllers\CroController;
use Illuminate\Support\Facades\Route;

// Prefix: /cro
// Name: cro.
Route::middleware(['web'])->group(function () {
    // Report Routes
    Route::get('reports', [\App\Http\Controllers\CroReportController::class, 'index'])->name('reports.index');
    Route::get('reports/export', [\App\Http\Controllers\CroReportController::class, 'export'])->name('reports.export');

    Route::resource('cros', CroController::class);
});
