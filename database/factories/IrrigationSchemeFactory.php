<?php

namespace Database\Factories;

use App\Models\IrrigationScheme;
use App\Models\Cbo;
use Illuminate\Database\Eloquent\Factories\Factory;

class IrrigationSchemeFactory extends Factory
{
    protected $model = IrrigationScheme::class;

    public function definition(): array
    {
        $cbo = Cbo::factory()->create();

        return [
            'cbo_id' => $cbo->id,
            'scheme_type' => $this->faker->randomElement(['Gravity', 'Lift', 'Mixed']),
            'sub_scheme_type' => $this->faker->randomElement(['Channel', 'Pipeline', 'Drip']),
            // FIX: Use only the allowed enum values for 'status'
            'status' => $this->faker->randomElement(['New', 'Rehabilitation']),
            'number_of_watercourses' => $this->faker->numberBetween(1, 10),
            'water_availability_cusecs' => $this->faker->randomFloat(2, 1, 50),
            'remarks' => $this->faker->paragraph(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (IrrigationScheme $scheme) {
            \App\Models\IrrigationSchemeProfile::factory()->create(['irrigation_scheme_id' => $scheme->id]);
        });
    }
}
