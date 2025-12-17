<?php

namespace Database\Seeders;

use App\Models\District;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure a PSU/all-district role exists.
        $rootRole = Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $psuRole = Role::firstOrCreate(['name' => 'PSU', 'guard_name' => 'web']);

        // Ensure a PSU district record exists (for full access association)
        $psuDistrict = District::firstOrCreate(['name' => 'PSU']);

        $user = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'System Admin',
                'password' => Hash::make('Password123!'),
                'district_id' => $psuDistrict->id,
            ]
        );

        // Attach roles
        $user->syncRoles([$rootRole, $adminRole, $psuRole]);
    }
}
