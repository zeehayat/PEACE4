<?php

namespace Database\Factories;

use App\Models\Cbo;
use Illuminate\Database\Eloquent\Factories\Factory;

class MhpFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cbo_id' => Cbo::factory(),
            'title' => 'MHP - ' . $this->faker->word,
            'grid_status' => $this->faker->randomElement(['on-grid', 'off-grid', 'partially on-grid']),
            'status' => $this->faker->randomElement(['new', 'rehabilitation', 'upgradation']),
            'capacity_kw' => $this->faker->numberBetween(50, 1000),
            'remarks' => $this->faker->optional()->sentence,
        ];
    }
}
