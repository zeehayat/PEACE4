<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LrmCommitteeController;
use App\Http\Controllers\LrmNrmAchievementController;

Route::middleware(['web', 'auth'])->group(function () {
    Route::resource('lrm-committees', LrmCommitteeController::class)->names('committees');

    Route::resource('lrm-committees.achievements', LrmNrmAchievementController::class)
        ->parameters(['achievements' => 'achievement'])
        ->except(['create', 'edit', 'show'])
        ->names('committees.achievements');
});
