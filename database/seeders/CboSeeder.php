<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cbo;
use App\Models\CboDialogue;
use App\Models\CboExposureVisit;
use App\Models\CboTraining;
use App\Models\District; // Import District

class CboSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $swabiDistrict = District::where('name', 'Swabi District')->first();
        $mardanDistrict = District::where('name', 'Mardan District')->first();

        // Create CBOs for specific districts
        Cbo::factory()->count(5)->create([
            'district' => $swabiDistrict->name,
        ])->each(function ($cbo) {
            CboDialogue::factory()->count(2)->create(['cbo_id' => $cbo->id]);
            CboExposureVisit::factory()->count(1)->create(['cbo_id' => $cbo->id]);
            CboTraining::factory()->count(1)->create(['cbo_id' => $cbo->id]);
        });

        Cbo::factory()->count(5)->create([
            'district' => $mardanDistrict->name,
        ])->each(function ($cbo) {
            CboDialogue::factory()->count(2)->create(['cbo_id' => $cbo->id]);
            CboExposureVisit::factory()->count(1)->create(['cbo_id' => $cbo->id]);
            CboTraining::factory()->count(1)->create(['cbo_id' => $cbo->id]);
        });

        // Create some CBOs without specific district assignment (will pick random)
        Cbo::factory()->count(10)->create()->each(function ($cbo) {
            CboDialogue::factory()->count(2)->create(['cbo_id' => $cbo->id]);
        });
    }
}
