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
        $this->call([
            DistrictSeeder::class, // Must run first to create districts
            RolesAndPermissionsSeeder::class, // Needs districts for users
            VendorSeeder::class, // Needs to run before IrrigationSchemeSeeder for vendors
            CboSeeder::class, // Needs districts
            MhpSiteSeeder::class, // Needs CBOs
            IrrigationSchemeSeeder::class, // Needs CBOs and Vendors
            LrmCommitteeSeeder::class, // Needs CBOs
            PermissionsSeeder::class,
            //UserAndPermissionSeeder::class,
        ]);
        // 1. Reset the Spatie cache
        // 1. Reset the Spatie cache
        // 1. Reset the Spatie cache
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 2. Manually truncate the Spatie tables to be absolutely sure
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Permission::truncate();
        Role::truncate();
        DB::table('model_has_roles')->truncate();
        DB::table('role_has_permissions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 3. Define and create all necessary permissions
        $permissions = [
            'user_manage', 'role_manage',
            'cbo_view', 'cbo_create', 'cbo_update', 'cbo_delete',
            // ... add any other permissions you need ...
        ];
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // 4. Create the Root role
        $rootRole = Role::create(['name' => 'Root']);

        // 5. Assign all existing permissions to the Root role
        $rootRole->givePermissionTo(Permission::all());

        // 6. Create the root user
        $user = User::create([
            'name' => 'Root User',
            'email' => 'root@srsp.pk',
            'password' => Hash::make('password'),
        ]);

        // 7. Assign the Root role to the user
        $user->assignRole($rootRole);

    }
}
