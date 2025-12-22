<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class ShareUserPermissions extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, \Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();

            // For Root / Super Admin, grant all permissions.
            $permissionNames = ($user->hasAnyRole(['Root', 'Super Admin']))
                ? Permission::pluck('name')
                : $user->getAllPermissions()->pluck('name');

            $permissions = $permissionNames->mapWithKeys(fn ($permission) => [$permission => true]);

            // Share the permissions with all Inertia views.
            inertia()->share('auth.user.can', $permissions);
        }

        return $next($request);
    }
}
