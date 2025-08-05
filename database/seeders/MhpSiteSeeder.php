<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MhpSite;
use App\Models\Cbo;
use App\Models\MhpAdminApproval;
use App\Models\TAndDWork;
use App\Models\ProjectPhysicalProgress;
use App\Models\ProjectFinancialInstallment;

class MhpSiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create MHP Sites linked to CBOs
        MhpSite::factory()->count(10)->create()->each(function ($site) {
            // Create Admin Approval (50% chance)
            if (rand(0, 1)) {
                $approval = MhpAdminApproval::factory()->create(['mhp_site_id' => $site->id]);
                // Add some T&D work, Physical Progress, Financial Installments
                TAndDWork::factory()->count(rand(0, 1))->create(['projectable_id' => $site->id, 'projectable_type' => MhpSite::class]);
                ProjectPhysicalProgress::factory()->count(rand(1, 3))->create(['projectable_id' => $site->id, 'projectable_type' => MhpSite::class]);
                ProjectFinancialInstallment::factory()->count(rand(1, 3))->create(['projectable_id' => $site->id, 'projectable_type' => MhpSite::class]);
            }
        });
    }
}
