<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MhpSite;
use App\Models\MhpAdminApproval;
use App\Models\ProjectCostRevision;
use App\Models\ProjectFinancialInstallment;
use App\Models\ProjectPhysicalProgress;

class MhpSiteSeeder extends Seeder
{
    public function run(): void
    {
        MhpSite::factory()
            ->count(5)
            ->create()
            ->each(function ($site) {
                $approval = MhpAdminApproval::factory()->create(['mhp_site_id' => $site->id]);

                ProjectCostRevision::factory()->count(2)->create([
                    'approvable_id' => $approval->id,
                    'approvable_type' => get_class($approval),
                ]);

                ProjectFinancialInstallment::factory()->count(3)->create([
                    'projectable_id' => $site->id,
                    'projectable_type' => get_class($site),
                ]);

                ProjectPhysicalProgress::factory()->count(4)->create([
                    'projectable_id' => $site->id,
                    'projectable_type' => get_class($site),
                ]);
            });
    }
}
