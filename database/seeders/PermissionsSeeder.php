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
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // -----------------
        // DEFINE PERMISSIONS
        // -----------------
        $permissions = [
            // User & Role Management
            'user_manage', 'role_manage',

            // CBO Permissions
            'cbo_view', 'cbo_create', 'cbo_update', 'cbo_delete',

            // MHP Site Permissions
            'mhp_site_view', 'mhp_site_create', 'mhp_site_update', 'mhp_site_delete',

            // Irrigation Scheme Permissions
            'irrigation_scheme_view', 'irrigation_scheme_create', 'irrigation_scheme_update', 'irrigation_scheme_delete',

            // LRM Committee Permissions
            'lrm_committee_view', 'lrm_committee_create', 'lrm_committee_update', 'lrm_committee_delete',

            // Vendor Permissions
            'vendor_view', 'vendor_create', 'vendor_update', 'vendor_delete',

            // Financial & Physical Progress Permissions
            'financial_installment_manage', 'physical_progress_manage',
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        echo "Permissions created successfully.\n";

        // ----------------------
        // DEFINE ROLES & ASSIGN PERMISSIONS
        // ----------------------

        // We use firstOrCreate to avoid creating duplicate roles on subsequent seeding
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']); // Has all access via AuthServiceProvider
        $root = Role::firstOrCreate(['name' => 'Root']); // Has all access via policy 'before' method

        // Head Office Roles
        $engineerHO = Role::firstOrCreate(['name' => 'Engineer-HO']);
        $engineerHO->syncPermissions([
            'cbo_view', 'cbo_update', 'cbo_delete',
            'mhp_site_view', 'mhp_site_create', 'mhp_site_update', 'mhp_site_delete',
            'irrigation_scheme_view', 'irrigation_scheme_create', 'irrigation_scheme_update', 'irrigation_scheme_delete',
            'lrm_committee_view', 'lrm_committee_create', 'lrm_committee_update', 'lrm_committee_delete',
        ]);

        $meHO = Role::firstOrCreate(['name' => 'M&E-HO']);
        $meHO->syncPermissions([
            'cbo_view', 'cbo_update', 'cbo_delete',
            'mhp_site_view', 'mhp_site_update', 'mhp_site_delete',
            'financial_installment_manage', 'physical_progress_manage',
        ]);

        $kpoHO = Role::firstOrCreate(['name' => 'KPO-HO']);
        $kpoHO->syncPermissions(['cbo_view', 'mhp_site_view', 'irrigation_scheme_view', 'lrm_committee_view']);

        // District Roles
        $engineerDistrict = Role::firstOrCreate(['name' => 'Engineer-DISTRICT']);
        $engineerDistrict->syncPermissions([
            'cbo_view', 'cbo_update', 'cbo_delete',
            'mhp_site_view', 'mhp_site_create', 'mhp_site_update', 'mhp_site_delete',
            'irrigation_scheme_view', 'irrigation_scheme_create', 'irrigation_scheme_update', 'irrigation_scheme_delete',
            'financial_installment_manage', 'physical_progress_manage',
        ]);

        $meDistrict = Role::firstOrCreate(['name' => 'M&E-DISTRICT']);
        $meDistrict->syncPermissions([
            'cbo_view', 'cbo_update', 'cbo_delete',
            'mhp_site_view', 'mhp_site_update',
            'financial_installment_manage', 'physical_progress_manage',
        ]);

        $kpoDistrict = Role::firstOrCreate(['name' => 'KPO-DISTRICT']);
        $kpoDistrict->syncPermissions([
            'cbo_view', 'cbo_create',
            'mhp_site_view', 'mhp_site_create',
            'irrigation_scheme_view', 'irrigation_scheme_create',
            'lrm_committee_view', 'lrm_committee_create',
        ]);

        echo "Roles and permissions synced successfully.\n";
    }
}
