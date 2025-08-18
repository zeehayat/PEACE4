<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class UserAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // --- 1. DEFINE & CREATE PERMISSIONS (This block was missing) ---
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
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // --- 2. DEFINE ROLES ---
        $rootRole = Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']);
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);

        // --- 3. ASSIGN PERMISSIONS TO ROLES ---
        $superAdminRole->syncPermissions(['user_manage', 'role_manage']);
        $rootRole->syncPermissions(Permission::all()); // Syncs all permissions created above

        // --- 4. CREATE THE ROOT USER ---
        $rootUser = User::updateOrCreate(
            ['email' => 'root@srsp.pk'],
            [
                'name' => 'Root User',
                'password' => Hash::make('password'),
            ]
        );

        // --- 5. ASSIGN THE ROLE TO THE USER ---
        $rootUser->assignRole($rootRole);
    }
}
