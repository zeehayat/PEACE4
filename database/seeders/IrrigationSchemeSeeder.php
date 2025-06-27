<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\IrrigationScheme;
use App\Models\IrrigationAdminApproval;
use App\Models\ProjectCostRevision;
use App\Models\ProjectFinancialInstallment;
use App\Models\ProjectPhysicalProgress;

class IrrigationSchemeSeeder extends Seeder
{
    public function run(): void
    {
        IrrigationScheme::factory()
            ->count(5)
            ->create()
            ->each(function ($scheme) {
                $approval = IrrigationAdminApproval::factory()->create(['irrigation_scheme_id' => $scheme->id]);

                ProjectCostRevision::factory()->count(2)->create([
                    'approvable_id' => $approval->id,
                    'approvable_type' => get_class($approval),
                ]);

                ProjectFinancialInstallment::factory()->count(3)->create([
                    'projectable_id' => $scheme->id,
                    'projectable_type' => get_class($scheme),
                ]);

                ProjectPhysicalProgress::factory()->count(4)->create([
                    'projectable_id' => $scheme->id,
                    'projectable_type' => get_class($scheme),
                ]);
            });
    }
}
