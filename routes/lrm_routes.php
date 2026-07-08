<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LrmCommitteeController;
use App\Http\Controllers\LrmNrmAchievementController;
use App\Http\Controllers\LrmReportController;

Route::middleware(['web', 'auth'])->group(function () {
    Route::resource('lrm-committees', LrmCommitteeController::class)->names('committees');

    Route::resource('lrm-committees.achievements', LrmNrmAchievementController::class)
        ->parameters(['achievements' => 'achievement'])
        ->except(['create', 'edit', 'show'])
        ->names('committees.achievements');

    Route::get('lrm-report', [LrmReportController::class, 'index'])->name('report.index');
    Route::get('lrm-report/export', [LrmReportController::class, 'export'])->name('report.export');
});
