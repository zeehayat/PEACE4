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
        return [
            'cbo_id' => Cbo::factory(),
            'status' => $this->faker->randomElement(['New', 'Rehabilitation']),
            'beneficiary_farmers' => $this->faker->numberBetween(10, 100),
            'channel_length_km' => $this->faker->randomFloat(2, 0.1, 10),
            'land_area_hectares' => $this->faker->randomFloat(2, 0.1, 50),
        ];
    }
}
