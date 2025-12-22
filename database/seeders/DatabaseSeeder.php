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
        ]);
    }
}
