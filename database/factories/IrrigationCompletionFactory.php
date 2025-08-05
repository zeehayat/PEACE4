<?php

namespace Database\Factories;

use App\Models\IrrigationCompletion;
use App\Models\IrrigationScheme; // Import IrrigationScheme model
use Illuminate\Database\Eloquent\Factories\Factory;

class IrrigationCompletionFactory extends Factory
{
    protected $model = IrrigationCompletion::class;

    public function definition(): array
    {
        return [
            'irrigation_scheme_id' => IrrigationScheme::factory(), // Will be overridden if specified in create()
            'number_of_beneficiary_farmers' => $this->faker->numberBetween(10, 200),
            'length_of_irrigation_channels_km' => $this->faker->randomFloat(2, 0.5, 10),
            'area_of_land_covered_hectares' => $this->faker->randomFloat(2, 1, 100),
            // FIX: Use the correct column name for the date
            'handing_over_to_community_date' => $this->faker->date(),
            'remarks' => $this->faker->paragraph(),
        ];
    }
}
