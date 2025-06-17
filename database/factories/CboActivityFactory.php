<?php

namespace Database\Factories;

use App\Models\Cbo;
use Illuminate\Database\Eloquent\Factories\Factory;

class CboActivityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cbo_id' => Cbo::factory(),
            'activity_type' => $this->faker->randomElement(['dialogue', 'training', 'exposure_visit']),
            'activity_date' => $this->faker->date(),
            'participants' => $this->faker->numberBetween(5, 50),
            'session_topic' => $this->faker->sentence(3),
            'facilitator_name' => $this->faker->name,
            'remarks' => $this->faker->optional()->sentence,
        ];
    }
}
