<?php

namespace Database\Factories;

use App\Models\OmCost;
use App\Models\MhpSite;
use Illuminate\Database\Eloquent\Factories\Factory;

class OmCostFactory extends Factory
{
    protected $model = OmCost::class;

    public function definition(): array
    {
        return [
            'mhp_site_id' => MhpSite::factory(),
            'cost_date' => $this->faker->date(),
            'o_and_m_cost' => $this->faker->randomFloat(2, 5000, 25000),
            'rehab_reconstruction_cost' => $this->faker->randomFloat(2, 3000, 20000),
            'repair_civil_work_cost' => $this->faker->randomFloat(2, 1000, 15000),
            'repair_tnd_cost' => $this->faker->randomFloat(2, 1000, 15000),
        ];
    }
}
