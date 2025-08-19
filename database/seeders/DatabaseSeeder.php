<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//        $this->call([
//            DistrictSeeder::class, // Must run first to create districts
//            RolesAndPermissionsSeeder::class, // Needs districts for users
//            VendorSeeder::class, // Needs to run before IrrigationSchemeSeeder for vendors
//            CboSeeder::class, // Needs districts
//            MhpSiteSeeder::class, // Needs CBOs
//            IrrigationSchemeSeeder::class, // Needs CBOs and Vendors
//            LrmCommitteeSeeder::class, // Needs CBOs
//            PermissionsSeeder::class,
//            //UserAndPermissionSeeder::class,
//        ]);
        // 1. Reset the Spatie cache
        // 1. Reset the Spatie cache
        // 1. Reset the Spatie cache
        // 1. Reset the Spatie cache
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 2. Define and create all necessary permissions
        $permissions = [
            'user_manage', 'role_manage',
            'cbo_view', 'cbo_create', 'cbo_update', 'cbo_delete',
            'mhp_site_view', 'mhp_site_create', 'mhp_site_update', 'mhp_site_delete',
            'irrigation_scheme_view', 'irrigation_scheme_create', 'irrigation_scheme_update', 'irrigation_scheme_delete',
            'lrm_committee_view', 'lrm_committee_create', 'lrm_committee_update', 'lrm_committee_delete',
        ];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // 3. Create the Root role
        $rootRole = Role::firstOrCreate(['name' => 'Root']);

        // 4. Assign ALL existing permissions to the Root role
        $rootRole->syncPermissions(Permission::all());

        // 5. Create the root user
        $user = User::updateOrCreate(
            ['email' => 'root@srsp.pk'],
            [
                'name' => 'Root User',
                'password' => Hash::make('password'),
            ]
        );

        // 6. Assign the Root role to the user
        $user->syncRoles(['Root']);
    }
}
