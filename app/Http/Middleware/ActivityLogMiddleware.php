<?php

namespace App\Http\Middleware;

use App\Models\ActivityLog;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityLogMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        try {
            $user = Auth::user();
            ActivityLog::create([
                'user_id' => $user?->id,
                'district_id' => $user?->district_id,
                'action' => $request->route()?->getName() ?: $request->path(),
                'method' => $request->method(),
                'route' => $request->fullUrl(),
                'ip' => $request->ip(),
                'meta' => [
                    'status' => $response->getStatusCode(),
                    'payload_keys' => array_keys($request->except(['password', 'password_confirmation'])),
                ],
            ]);
        } catch (\Throwable $e) {
            // Do not block the request on log failure.
        }

        return $response;
    }
}
