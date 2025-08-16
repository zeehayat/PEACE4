<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

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
            UserAndPermissionSeeder::class,
        ]);
    }
}
