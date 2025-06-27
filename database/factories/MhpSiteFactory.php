<?php

namespace Database\Factories;

use App\Models\MhpSite;
use App\Models\Cbo;
use Illuminate\Database\Eloquent\Factories\Factory;

class MhpSiteFactory extends Factory
{
    protected $model = MhpSite::class;

    public function definition(): array
    {
        return [
            'cbo_id' => Cbo::factory(),
            'population' => $this->faker->numberBetween(100, 1000),
            'grid_status' => $this->faker->randomElement(['On-Grid', 'Off-Grid', 'Partially on-Grid']),
            'status' => $this->faker->randomElement(['New', 'Rehabilitation', 'Upgradation']),
            'existing_capacity_kw' => $this->faker->numberBetween(5, 100),
            'planned_capacity_kw' => $this->faker->numberBetween(10, 200),
            'head_ft' => $this->faker->randomFloat(2, 5, 50),
            'design_discharge_cusecs' => $this->faker->randomFloat(2, 1, 10),
            'channel_length_km' => $this->faker->randomFloat(2, 0.1, 10),
            'tl_ht_km' => $this->faker->randomFloat(2, 0.1, 5),
            'tl_lt_km' => $this->faker->randomFloat(2, 0.1, 5),
            'transformers' => $this->faker->numberBetween(1, 3),
            'turbine_type' => $this->faker->word,
            'alternator_type' => $this->faker->word,
            'accessible' => $this->faker->boolean,
            'domestic_units' => $this->faker->numberBetween(20, 200),
            'commercial_units' => $this->faker->numberBetween(5, 50),
            'estimated_cost' => $this->faker->randomFloat(2, 500000, 2000000),
            'per_kw_cost' => $this->faker->randomFloat(2, 10000, 50000),
            'total_hh' => $this->faker->numberBetween(50, 300),
            'avg_hh_size' => $this->faker->randomFloat(1, 5, 8),
            'cost_per_capita' => $this->faker->randomFloat(2, 1000, 5000),
        ];
    }
}
