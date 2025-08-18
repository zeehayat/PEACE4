<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct()
    {
        // This will apply the UserPolicy and check for 'role_manage' permission.
        // Make sure your seeder assigns this permission to the Super Admin role.
        //$this->middleware('can:role_manage');
    }

    public function index()
    {
        //dd(Auth::user()->getPermissionNames());

        // Get all roles with their assigned permissions
        $roles = Role::with('permissions')->get();

        // Get all available permissions
        $permissions = Permission::all();

        // Group permissions by their prefix (e.g., 'user_create' -> 'user') for a cleaner UI
        $groupedPermissions = $permissions->groupBy(function ($permission) {
            return explode('_', $permission->name)[0];
        });

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'groupedPermissions' => $groupedPermissions,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'nullable|array'
        ]);

        DB::transaction(function () use ($request) {
            $role = Role::create(['name' => $request->name]);
            $role->syncPermissions($request->input('permissions', []));
        });

        return redirect()->route('admin.roles.index')->with('success', 'Role created successfully.');
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permissions' => 'nullable|array'
        ]);

        DB::transaction(function () use ($request, $role) {
            $role->update(['name' => $request->name]);
            $role->syncPermissions($request->input('permissions', []));
        });

        return redirect()->route('admin.roles.index')->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        // Prevent deletion of critical roles
        if (in_array($role->name, ['Super Admin', 'Root'])) {
            return redirect()->route('admin.roles.index')->with('error', 'Cannot delete critical system roles.');
        }

        $role->delete();

        return redirect()->route('admin.roles.index')->with('success', 'Role deleted successfully.');
    }
}
