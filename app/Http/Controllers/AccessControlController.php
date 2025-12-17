<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\District;
use App\Models\DistrictPermission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AccessControlController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizeAdmin();

        $users = User::with('roles', 'district')
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'district_id']);

        $districts = District::orderBy('name')->get(['id', 'name']);

        $permissions = DistrictPermission::all();

        $audit = ActivityLog::latest()
            ->when($request->filled('user_id'), fn($q) => $q->where('user_id', $request->user_id))
            ->take(100)
            ->get();

        return Inertia::render('Admin/AccessControl', [
            'users' => $users,
            'districts' => $districts,
            'permissions' => $permissions,
            'auditLogs' => $audit,
            'filters' => $request->only('user_id'),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizeAdmin();

        $data = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'permissions' => ['required', 'array'],
            'permissions.*.district_id' => ['required', 'exists:districts,id'],
            'permissions.*.can_read' => ['boolean'],
            'permissions.*.can_create' => ['boolean'],
            'permissions.*.can_update' => ['boolean'],
            'permissions.*.can_delete' => ['boolean'],
        ]);

        DB::transaction(function () use ($data) {
            foreach ($data['permissions'] as $perm) {
                DistrictPermission::updateOrCreate(
                    [
                        'user_id' => $data['user_id'],
                        'district_id' => $perm['district_id'],
                    ],
                    [
                        'can_read' => $perm['can_read'] ?? false,
                        'can_create' => $perm['can_create'] ?? false,
                        'can_update' => $perm['can_update'] ?? false,
                        'can_delete' => $perm['can_delete'] ?? false,
                    ]
                );
            }
        });

        return redirect()->back()->with('success', 'Permissions updated.');
    }

    private function authorizeAdmin(): void
    {
        abort_unless(auth()->user()?->hasAnyRole(['Admin', 'Root']), 403);
    }
}
