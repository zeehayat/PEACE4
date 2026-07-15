<?php

namespace App\Support;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ForbiddenResponse
{
    public static function make(Request $request, string $message): Response
    {
        try {
            ActivityLog::create([
                'user_id' => $request->user()?->id,
                'district_id' => $request->user()?->district_id,
                'action' => $request->route()?->getName() ?: $request->path(),
                'method' => $request->method(),
                'route' => $request->fullUrl(),
                'ip' => $request->ip(),
                'meta' => [
                    'status' => 403,
                    'type' => 'authorization_denied',
                    'message' => $message,
                ],
            ]);
        } catch (\Throwable $e) {
            // Do not block the 403 response on log failure.
        }

        return Inertia::render('Errors/Forbidden', [
            'userName' => $request->user()?->name,
        ])->toResponse($request)->setStatusCode(403);
    }
}
