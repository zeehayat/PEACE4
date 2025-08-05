<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\IrrigationScheme;
use App\Models\IrrigationAdminApproval;
use App\Models\IrrigationSchemeContract;
use App\Models\IrrigationCompletion;
use App\Models\ProjectPhysicalProgress;
use App\Models\ProjectFinancialInstallment;
use App\Models\Vendor;

class IrrigationSchemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Irrigation Schemes
        IrrigationScheme::factory()->count(10)->create()->each(function ($scheme) {
            // Create Admin Approval (50% chance)
            if (rand(0, 1)) {
                $approval = IrrigationAdminApproval::factory()->create(['irrigation_scheme_id' => $scheme->id]);
                // Create a contract (if approval exists)
                if (rand(0,1)) {
                    $vendor = Vendor::inRandomOrder()->first() ?? Vendor::factory()->create();
                    IrrigationSchemeContract::factory()->create([
                        'irrigation_scheme_id' => $scheme->id,
                        'vendor_id' => $vendor->id,
                        //'approved_vendor' => $vendor->name,
                    ]);
                }
                // Create Completion (50% chance)
                if (rand(0,1)) {
                    IrrigationCompletion::factory()->create(['irrigation_scheme_id' => $scheme->id]);
                }
                // Add some Physical Progress and Financial Installments
                ProjectPhysicalProgress::factory()->count(rand(1, 3))->create(['projectable_id' => $scheme->id, 'projectable_type' => \App\Models\IrrigationScheme::class]);
                ProjectFinancialInstallment::factory()->count(rand(1, 3))->create(['projectable_id' => $scheme->id, 'projectable_type' => \App\Models\IrrigationScheme::class]);
            }
        });
    }
}
