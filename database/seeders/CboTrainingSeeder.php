<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cbo;
use App\Models\CboTraining;

class CboTrainingSeeder extends Seeder
{
    public function run(): void
    {
        Cbo::all()->each(function ($cbo) {
            CboTraining::factory()->count(2)->create(['cbo_id' => $cbo->id]);
        });
    }
}
