<?php

namespace Database\Factories;

use App\Models\OperationalCost;
use App\Models\MhpSite;
use Illuminate\Database\Eloquent\Factories\Factory;

class OperationalCostFactory extends Factory
{
    protected $model = OperationalCost::class;

    public function definition(): array
    {
        return [
            'mhp_site_id' => MhpSite::factory(),
            'cost_date' => $this->faker->date(),
            'hr_office_expenses' => $this->faker->randomFloat(2, 5000, 30000),
            'financial_charges' => $this->faker->randomFloat(2, 100, 3000),
            'insurance_charges' => $this->faker->randomFloat(2, 2000, 10000),
            'vehicle_operational_cost' => $this->faker->randomFloat(2, 1000, 8000),
            'management_cost' => $this->faker->randomFloat(2, 2000, 15000),
        ];
    }
}
