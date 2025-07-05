<?php

use App\Providers\ServiceBindingProvider;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        // Adding MHP Routes
        then: function (){
            Route::middleware('web')
                ->prefix('mhp')
                ->name('mhp.')
                ->group(base_path('routes/mhp_routes.php'));
            Route::middleware('web')
                ->prefix('irrigation')
                ->name('irrigation.')
                ->group(base_path('routes/irrigation_routes.php'));
            Route::middleware('web')
                ->prefix('cbo')
                ->name('cbo.')
                ->group(base_path('routes/cbo_routes.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
        $middleware->append(\App\Http\Middleware\HandleInertiaRequests::class);

    })

    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->withProviders([
        ServiceBindingProvider::class, // 👈 Add your custom provider here
    ])
    ->create();
