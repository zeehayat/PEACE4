<?php

namespace Database\Factories;

use App\Models\IrrigationCompletion;
use App\Models\IrrigationScheme;
use Illuminate\Database\Eloquent\Factories\Factory;

class IrrigationCompletionFactory extends Factory
{
    protected $model = IrrigationCompletion::class;

    public function definition(): array
    {
        return [
            'irrigation_scheme_id' => IrrigationScheme::factory(),
            'handover_date' => $this->faker->date(),
            'remarks' => $this->faker->sentence(),
        ];
    }
}
