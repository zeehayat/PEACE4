<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $this->authorizeAdmin($request);

        $filters = [
            'user_id' => $request->input('user_id'),
            'method' => $request->input('method'),
            'search' => $request->input('search'),
        ];

        $logs = ActivityLog::with(['user:id,name,email', 'district:id,name'])
            ->latest()
            ->when($filters['user_id'], fn($query, $userId) => $query->where('user_id', $userId))
            ->when($filters['method'], fn($query, $method) => $query->where('method', $method))
            ->when($filters['search'], function ($query, $search) {
                $query->where(function ($nested) use ($search) {
                    $nested->where('action', 'like', "%{$search}%")
                        ->orWhere('route', 'like', "%{$search}%")
                        ->orWhere('ip', 'like', "%{$search}%");
                });
            })
            ->paginate(25)
            ->withQueryString();

        $stats = [
            'total' => ActivityLog::count(),
            'today' => ActivityLog::whereDate('created_at', now()->toDateString())->count(),
            'unique_users' => ActivityLog::distinct('user_id')->count('user_id'),
        ];

        return Inertia::render('Admin/Dashboard', [
            'logs' => $logs,
            'users' => User::orderBy('name')->get(['id', 'name', 'email']),
            'methods' => ActivityLog::select('method')->distinct()->pluck('method'),
            'filters' => $filters,
            'stats' => $stats,
        ]);
    }

    private function authorizeAdmin(Request $request): void
    {
        abort_unless($request->user()?->hasAnyRole(['Admin', 'Root']), 403);
    }
}
