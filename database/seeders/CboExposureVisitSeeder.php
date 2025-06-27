<?php

namespace Database\Seeders;

use App\Models\CboExposureVisit;
use Illuminate\Database\Seeder;
use App\Models\Cbo;
use App\Models\CboExposure;

class CboExposureVisitSeeder extends Seeder
{
    public function run(): void
    {
        Cbo::all()->each(function ($cbo) {
            CboExposureVisit::factory()->count(2)->create(['cbo_id' => $cbo->id]);
        });
    }
}
