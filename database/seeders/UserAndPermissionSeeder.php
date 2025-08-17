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

        // 1. Create the single permission we need for the test
        $permission = Permission::firstOrCreate(['name' => 'user_manage', 'guard_name' => 'web']);

        // 2. Create the Root role
        $rootRole = Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']);
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);

        // 3. EXPLICITLY give the permission to the role
        $superAdminRole->givePermissionTo(['user_manage', 'role_manage']);


        // 4. Create the root user
        $rootUser = User::updateOrCreate(
            ['email' => 'root@srsp.pk'],
            [
                'name' => 'Root User',
                'password' => Hash::make('password'),
            ]
        );

        // 5. Assign the role to the user
        $rootUser->assignRole($rootRole);
    }
}
