<?php

namespace Database\Factories;

use App\Models\IrrigationSchemeProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class IrrigationSchemeProfileFactory extends Factory
{
    protected $model = IrrigationSchemeProfile::class;

    public function definition(): array
    {
        return [
            // 'irrigation_scheme_id' will be set by the afterCreating callback in IrrigationSchemeFactory
            'beneficiary_farmers' => $this->faker->numberBetween(10, 500),
            'channel_length_km' => $this->faker->randomFloat(2, 0.5, 20),
            'land_area_hectares' => $this->faker->randomFloat(2, 5, 200),
            'month_year_establishment' => $this->faker->date(),
            'established_by' => $this->faker->company,
            'date_technical_surveys' => $this->faker->date(),
            'northening' => $this->faker->latitude(),
            'easting' => $this->faker->longitude(),
            'elevation' => $this->faker->randomFloat(2, 100, 2000),
        ];
    }
}
