<?php

use App\Http\Middleware\TrustCloudflareProxies;
use App\Http\Middleware\TrustProxies;
use App\Providers\ServiceBindingProvider;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

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
            Route::middleware('web')
                ->prefix('lrm')
                ->name('lrm.')
                ->group(base_path('routes/lrm_routes.php'));
            Route::middleware('web')
                ->prefix('cro')
                ->name('cro.')
                ->group(base_path('routes/cro_routes.php'));
            Route::middleware(['web','auth'])
                ->prefix('admin')
                ->name('admin.')
                ->group(base_path('routes/admin_routes.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        // ⬇️ run proxy trust FIRST so the rest of the stack sees https
        $middleware->prepend(TrustProxies::class);
        $middleware->trustProxies(at: '*');

        // Jetstream/Inertia
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \App\Http\Middleware\ActivityLogMiddleware::class,
        ]);

        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
    })


    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Illuminate\Auth\Access\AuthorizationException $e, \Illuminate\Http\Request $request) {
            return \App\Support\ForbiddenResponse::make($request, $e->getMessage());
        });
        // Laravel's Handler::prepareException() converts an unhandled
        // AuthorizationException into AccessDeniedHttpException *before*
        // render callbacks are consulted, so the callback above only
        // fires for AuthorizationException instances with an explicit
        // ->response()/status() set. Catch the common (status-less) case
        // via its converted form too.
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException $e, \Illuminate\Http\Request $request) {
            return \App\Support\ForbiddenResponse::make($request, $e->getMessage());
        });
        $exceptions->render(function (\Spatie\Permission\Exceptions\UnauthorizedException $e, \Illuminate\Http\Request $request) {
            return \App\Support\ForbiddenResponse::make($request, $e->getMessage());
        });
    })
    ->withProviders([
        ServiceBindingProvider::class, // 👈 Add your custom provider here
        App\Providers\AuthServiceProvider::class,

    ])
    ->create();
