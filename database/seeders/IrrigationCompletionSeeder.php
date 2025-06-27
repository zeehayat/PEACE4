<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\IrrigationScheme;
use App\Models\IrrigationCompletion;

class IrrigationCompletionSeeder extends Seeder
{
    public function run(): void
    {
        IrrigationScheme::all()->each(function ($scheme) {
            IrrigationCompletion::factory()->create([
                'irrigation_scheme_id' => $scheme->id,
            ]);
        });
    }
}
