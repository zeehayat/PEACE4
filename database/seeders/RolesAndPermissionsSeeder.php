<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Cbo;
use App\Models\District; // Import District model
use Illuminate\Support\Facades\Log;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // --- Permissions ----------------------------------------------------
        $permissionNames = [
            // core access control
            'user_manage',
            'role_manage',
            'view_reports',

            // CBO module
            'cbo_view',
            'cbo_create',
            'cbo_update',
            'cbo_delete',

            // MHP module
            'mhp_site_view',
            'mhp_site_create',
            'mhp_site_update',
            'mhp_site_delete',

            // Irrigation module
            'irrigation_scheme_view',
            'irrigation_scheme_create',
            'irrigation_scheme_update',
            'irrigation_scheme_delete',

            // LRM module (keep existing)
            'lrm_committee_view',
            'lrm_committee_create',
            'lrm_committee_update',
            'lrm_committee_delete',

            // Vendor module (keep existing)
            'vendor_view',
            'vendor_create',
            'vendor_update',
            'vendor_delete',
        ];

        $permissions = collect($permissionNames)
            ->map(fn ($name) => Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web']))
            ->keyBy('name');

        // --- Roles ----------------------------------------------------------
        $roles = collect([
            'Root',
            'Admin',
            'Super Admin',
            'M&E-HO',
            'Engineer-HO',
            'KPO-HO',
            'Viewer-HO',
            'M&E-DISTRICT',
            'Engineer-DISTRICT',
            'KPO-DISTRICT',
            'Viewer-DISTRICT',
        ])->map(fn ($name) => Role::firstOrCreate(['name' => $name, 'guard_name' => 'web']))
          ->keyBy('name');

        // --- Role → Permission assignments ----------------------------------
        // Root and Super Admin: everything
        $roles['Root']->syncPermissions($permissions->values());
        $roles['Super Admin']->syncPermissions($permissions->values());

        // Admin: full functional access + user/role management
        $roles['Admin']->syncPermissions([
            'user_manage',
            'role_manage',
            'view_reports',
            // full CBO/MHP/Irrigation CRUD
            'cbo_view', 'cbo_create', 'cbo_update', 'cbo_delete',
            'mhp_site_view', 'mhp_site_create', 'mhp_site_update', 'mhp_site_delete',
            'irrigation_scheme_view', 'irrigation_scheme_create', 'irrigation_scheme_update', 'irrigation_scheme_delete',
            // supporting modules
            'lrm_committee_view', 'lrm_committee_create', 'lrm_committee_update', 'lrm_committee_delete',
            'vendor_view', 'vendor_create', 'vendor_update', 'vendor_delete',
        ]);

        // Global (HO) roles
        $roles['Viewer-HO']->syncPermissions([
            'view_reports',
            'cbo_view',
            'mhp_site_view',
            'irrigation_scheme_view',
            'lrm_committee_view',
            'vendor_view',
        ]);

        $roles['KPO-HO']->syncPermissions(array_merge(
            $roles['Viewer-HO']->permissions->pluck('name')->all(),
            [
                'cbo_create',
                'mhp_site_create',
                'irrigation_scheme_create',
            ],
        ));

        $roles['M&E-HO']->syncPermissions(array_merge(
            $roles['Viewer-HO']->permissions->pluck('name')->all(),
            [
                'cbo_create', 'cbo_update', 'cbo_delete',
                'mhp_site_create', 'mhp_site_update', 'mhp_site_delete',
            ],
        ));

        $roles['Engineer-HO']->syncPermissions(array_merge(
            $roles['Viewer-HO']->permissions->pluck('name')->all(),
            [
                'cbo_create', 'cbo_update', 'cbo_delete',
                'mhp_site_create', 'mhp_site_update', 'mhp_site_delete',
                'irrigation_scheme_create', 'irrigation_scheme_update', 'irrigation_scheme_delete',
            ],
        ));

        // District roles (scoped later at query/policy level)
        $roles['Viewer-DISTRICT']->syncPermissions($roles['Viewer-HO']->permissions);

        $roles['KPO-DISTRICT']->syncPermissions(array_merge(
            $roles['Viewer-DISTRICT']->permissions->pluck('name')->all(),
            [
                'cbo_create',
                'mhp_site_create',
                'irrigation_scheme_create',
            ],
        ));

        $roles['M&E-DISTRICT']->syncPermissions(array_merge(
            $roles['Viewer-DISTRICT']->permissions->pluck('name')->all(),
            [
                'cbo_create', 'cbo_update', 'cbo_delete',
                'mhp_site_create',
            ],
        ));

        $roles['Engineer-DISTRICT']->syncPermissions(array_merge(
            $roles['Viewer-DISTRICT']->permissions->pluck('name')->all(),
            [
                'cbo_create', 'cbo_update', 'cbo_delete',
                'mhp_site_create', 'mhp_site_update', 'mhp_site_delete',
                'irrigation_scheme_create', 'irrigation_scheme_update', 'irrigation_scheme_delete',
            ],
        ));

        // --- Seed baseline users -------------------------------------------
        $psuDistrict = District::firstOrCreate(['name' => 'PSU']);

        $rootUser = User::firstOrCreate(
            ['email' => 'root@example.com'],
            [
                'name' => 'Root User',
                'password' => Hash::make('password'),
                'district_id' => $psuDistrict->id,
            ]
        );
        $rootUser->syncRoles([$roles['Root']]);
        Log::info('Root user created/assigned.');

        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'district_id' => $psuDistrict->id,
            ]
        );
        $adminUser->syncRoles([$roles['Admin']]);
        Log::info('Admin user created/assigned.');
    }
}
