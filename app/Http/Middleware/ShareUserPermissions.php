<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

            // Get all user permissions and format them into an object like:
            // { 'user_manage': true, 'role_manage': true, ... }
            $permissions = $user->getAllPermissions()->mapWithKeys(function ($permission) {
                return [$permission->name => true];
            });

            // Share the permissions with all Inertia views.
            inertia()->share('auth.user.can', $permissions);
        }

        return $next($request);
    }
}
