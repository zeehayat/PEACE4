<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            CboSeeder::class,
            CboDialogueSeeder::class,
            CboExposureVisitSeeder::class,
            CboTrainingSeeder::class,
            MhpSiteSeeder::class,
            IrrigationSchemeSeeder::class,
            AttachmentSeeder::class,
            MhpCompletionSeeder::class,
            IrrigationCompletionSeeder::class,
            OperationalCostSeeder::class,
            RevenueRecordSeeder::class,
            ProcurementSeeder::class,



        ]);

    }
}
