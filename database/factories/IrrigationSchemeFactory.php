<?php

namespace Database\Factories;

use App\Models\Cbo;
use Illuminate\Database\Eloquent\Factories\Factory;

class IrrigationSchemeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cbo_id' => Cbo::factory(),
            'scheme_type' => $this->faker->randomElement(['canal', 'pipe', 'gravity-fed']),
            'rehab_or_new' => $this->faker->randomElement(['rehab', 'new']),
            'area_hectares' => $this->faker->randomFloat(2, 0.5, 100.0),
            'beneficiaries' => $this->faker->numberBetween(10, 500),
            'channel_length_km' => $this->faker->randomFloat(2, 0.1, 10.0),
            'remarks' => $this->faker->optional()->sentence,
        ];
    }
}
