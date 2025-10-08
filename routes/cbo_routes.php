<?php


use App\Http\Controllers\CboController;
use App\Http\Controllers\CboDialogueController;
use App\Http\Controllers\CboExposureVisitController;
use App\Http\Controllers\CboReportController;
use App\Http\Controllers\CboTrainingController;
use App\Http\Controllers\MhpSiteController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

// IMPORTANT: All routes in this file already have
// a URL prefix of '/cbo' (e.g., /cbo/...)
// and a named route prefix of 'cbo.' (e.g., cbo....)
// applied by bootstrap/app.php.
// DO NOT ADD 'cbo/' to URIs or 'cbo.' to names directly here.

Route::middleware(['web'])->group(function () {
    // --- CBO (Main Resource) ---
    // URI: /cbo/cbos, Names: cbo.cbos.index, cbo.cbos.show, etc.
    Route::middleware(['web'])->group(function () { // Add specific middleware if needed
        Route::resource('cbos', CboController::class); // Main CBO resource
        Route::get('cbos/auto-search', [CboController::class, 'getCbos'])->name('cbos.auto-search'); // For frontend searchables
    });
    Route::resource('cbos.dialogues', CboDialogueController::class)->parameters([
        'dialogues' => 'dialogue', // Explicitly name child parameter
        'cbos' => 'cbo', // Explicitly name parent parameter
    ]);

    Route::resource('cbos.exposure-visits', CboExposureVisitController::class)->parameters([
        'exposure-visits' => 'exposure_visit', // Explicitly name child parameter
        'cbos' => 'cbo', // Explicitly name parent parameter
    ]);

    Route::resource('cbos.trainings', CboTrainingController::class)->parameters([
        'trainings' => 'training', // Explicitly name child parameter
        'cbos' => 'cbo', // Explicitly name parent parameter
    ]);

    // Custom route for CBO Details (if it fetches full details for modals)
    // URI: /cbo/cbos/{cbo}/details, Name: cbo.cbos.details
    Route::get('/cbos/{cbo}/details', [CboController::class, 'index'])->name('cbos.details');

    // CBO Search for Combobox
    // URI: /cbo/cbos/auto-search, Name: cbo.cbos.auto-search
    Route::get('/cbos/auto-search', [CboController::class, 'autoSearch'])->name('cbos.auto-search');


    // --- CBO Dialogues ---
    // URI: /cbo/dialogues, Names: cbo.dialogues.index, cbo.dialogues.show, etc.
    // Assuming 'create' and 'edit' are handled by modals, so 'except' them.
    Route::resource('dialogues', CboDialogueController::class)->except(['create', 'edit'])
        ->names([
            'index' => 'dialogues.index',
            'store' => 'dialogues.store',
            'show' => 'dialogues.show',
            'update' => 'dialogues.update',
            'destroy' => 'dialogues.destroy',
        ]);

    // --- CBO Trainings ---
    // URI: /cbo/trainings, Names: cbo.trainings.index, cbo.trainings.show, etc.
    // Assuming 'create' and 'edit' are handled by modals, so 'except' them.
    Route::resource('trainings', CboTrainingController::class)->except(['create', 'edit'])
        ->names([
            'index' => 'trainings.index',
            'store' => 'trainings.store',
            'show' => 'trainings.show',
            'update' => 'trainings.update',
            'destroy' => 'trainings.destroy',
        ]);

    // --- CBO Exposure Visits ---
    // URI: /cbo/exposure-visits, Names: cbo.exposure-visits.index, cbo.exposure-visits.show, etc.
    // Assuming 'create' and 'edit' are handled by modals, so 'except' them.
    Route::resource('exposure-visits', CboExposureVisitController::class)->except(['create', 'edit'])
        ->names([
            'index' => 'exposure-visits.index',
            'store' => 'exposure-visits.store',
            'show' => 'exposure-visits.show',
            'update' => 'exposure-visits.update',
            'destroy' => 'exposure-visits.destroy',
        ]);

    // --- CBO Report ---
    // URI: /cbo/report, Name: cbo.report
    Route::get('/report', [ReportController::class, 'cboReport'])->name('report');
    // URI: /cbo/report/export, Name: cbo.report.export
    Route::get('/report/export', [ReportController::class, 'exportCboReport'])->name('report.export');

    // Redirect for old base /cbo route if necessary, or remove from frontend
    // If you want /cbo to go to cbo.cbos.index:
    Route::get('/', function () {
        return redirect()->route('cbo.cbos.index');
    });
});


/// Unauthenticated
///
Route::get('report', [CboReportController::class, 'index'])->name('reports.cbo.index');
Route::get('report/export', [CboReportController::class, 'export'])->name('reports.cbo.export');





