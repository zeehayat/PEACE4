<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissionNames = [
            'user_manage',
            'role_manage',
            'view_reports',
            'cbo_view', 'cbo_create', 'cbo_update', 'cbo_delete',
            'mhp_site_view', 'mhp_site_create', 'mhp_site_update', 'mhp_site_delete',
            'irrigation_scheme_view', 'irrigation_scheme_create', 'irrigation_scheme_update', 'irrigation_scheme_delete',
            'lrm_committee_view', 'lrm_committee_create', 'lrm_committee_update', 'lrm_committee_delete',
            'vendor_view', 'vendor_create', 'vendor_update', 'vendor_delete',
        ];

        $permissions = collect($permissionNames)
            ->map(fn ($name) => Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web']))
            ->values();

        // Keep Super Admin in sync with the full set (mirrors Root)
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);
        $superAdmin->syncPermissions($permissions);
    }
}
