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

        // CORRECTED PERMISSION NAMES
        $permissions = [
            'user_manage',
            'role_manage',
            'cbo_view', 'cbo_create', 'cbo_update', 'cbo_delete',
            'mhp_site_view', 'mhp_site_create', 'mhp_site_update', 'mhp_site_delete',
            'irrigation_scheme_view', 'irrigation_scheme_create', 'irrigation_scheme_update', 'irrigation_scheme_delete',
            'lrm_committee_view', 'lrm_committee_create', 'lrm_committee_update', 'lrm_committee_delete',
            'vendor_view', 'vendor_create', 'vendor_update', 'vendor_delete',
            'financial_installment_manage',
            'physical_progress_manage',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Find the Super Admin role and assign it the correct permissions
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']);
        $superAdmin->syncPermissions(['user_manage', 'role_manage']);

        // ... assign other permissions to your other roles as needed ...
    }
}
