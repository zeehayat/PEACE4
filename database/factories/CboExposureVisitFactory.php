<?php

namespace Database\Factories;


use App\Models\Cbo;
use App\Models\CboExposureVisit;
use Illuminate\Database\Eloquent\Factories\Factory;

class CboExposureVisitFactory extends Factory
{
    protected $model = CboExposureVisit::class;

    public function definition(): array
    {
        return [
            'cbo_id' => Cbo::factory(),
            'participants' => $this->faker->numberBetween(1, 30),
            'purpose_of_visit' => $this->faker->sentence(),
            'remarks' => $this->faker->sentence(),
            'date_of_visit' => $this->faker->date(), // CRITICAL: Ensure this field is defined
        ];
    }
}
