<?php


use App\Http\Controllers\CboController;
use App\Http\Controllers\CboDialogueController;
use App\Http\Controllers\CboExposureVisitController;
use App\Http\Controllers\CboTrainingController;
use App\Http\Controllers\ReportController;

Route::prefix('cbos')->name('cbo.')->group(function () {
    Route::get('/', [CboController::class, 'index'])->name('index');         // List page
    Route::get('/create', [CboController::class, 'create'])->name('create'); // Create page (if needed)
    Route::post('/', [CboController::class, 'store'])->name('store');        // Store new CBO

    Route::get('/{cbo}/edit', [CboController::class, 'edit'])->name('edit'); // Edit page
    Route::put('/{cbo}', [CboController::class, 'update'])->name('update');  // Update CBO

    Route::get('/{cbo}/details', [CboController::class, 'details'])->name('details'); // Details for modal
});


// REPORT
Route::get('/cbo/report', [ReportController::class, 'cboReport'])->name('cbo.report');
Route::get('/cbo/report/export', [ReportController::class, 'exportCboReport'])->name('cbo.report.export');

Route::get('cbo/dialogues/create', [CboDialogueController::class, 'create'])->name('dialogues.create');
Route::post('cbo/dialogues/store', [CboDialogueController::class, 'store'])->name('dialogues.store');
Route::get('/cbos/{id}/details', [CboController::class, 'details'])->name('cbos.details');
Route::get('/cbos/{cbo}/edit', [\App\Http\Controllers\CboController::class, 'edit'])->name('cbos.edit');

Route::get('/cbo/dialogues/{dialogue}/edit', [CboDialogueController::class, 'edit'])->name('dialogues.edit');
Route::put('/cbo/dialogues/{dialogue}', [CboDialogueController::class, 'update'])->name('dialogues.update');
Route::get('/cbos/{cbo}/dialogues', [CboController::class, 'show'])->name('cbo.show');
Route::get('/cbos', [CboController::class, 'index'])->name('cbos.index');
Route::post('/cbotrainings', [CboTrainingController::class, 'store'])->name('cbotrainings.store');


Route::prefix('cbo')->name('cbo.')->middleware(['role:cbo|cbo-mhp-irrigation|root|admin'])->group(function () {
    Route::get('exposure-visits', [CboExposureVisitController::class, 'index'])->name('exposure-visits.index');
    Route::get('exposure-visits/create', [CboExposureVisitController::class, 'create'])->name('exposure-visits.create');
    Route::post('exposure-visits', [CboExposureVisitController::class, 'store'])->name('exposure-visits.store');
    Route::get('exposure-visits/{exposureVisit}/edit', [CboExposureVisitController::class, 'edit'])->name('exposure-visits.edit');
    Route::put('exposure-visits/{visit}', [CboExposureVisitController::class, 'update'])->name('exposure-visits.update');

});


Route::prefix('cbo')->name('cbo.')->group(function () { //middleware(['role:cbo|cbo-mhp-irrigation|root|admin'])


    Route::get('/', [CboController::class, 'index'])->name('index');
    Route::get('/create', [CboController::class, 'create'])->name('cbo.create');
    Route::post('/store', [CboController::class, 'store'])->name('cbo.store');
    Route::resource('dialogues', CboDialogueController::class);
//    Route::get('/dialogues/create', [CboDialogueController::class, 'create'])->name('dialogues.create');
//    Route::post('/dialogues/store', [CboDialogueController::class, 'store'])->name('dialogues.store');



    Route::resource('exposure-visits', CboExposureVisitController::class);
    Route::resource('trainings', CboTrainingController::class);
});
// MHP Module Stub
