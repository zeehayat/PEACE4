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
            'exposure_date' => $this->faker->date(),
        ];
    }
}
