<?php

namespace Database\Factories;

use App\Models\RevenueRecord;
use App\Models\MhpSite;
use Illuminate\Database\Eloquent\Factories\Factory;

class RevenueRecordFactory extends Factory
{
    protected $model = RevenueRecord::class;

    public function definition(): array
    {
        return [
            'mhp_site_id' => MhpSite::factory(),
            'billing_month' => $this->faker->dateTimeBetween('-12 months', 'now')->format('Y-m-01'),
            'connection_charges' => $this->faker->randomFloat(2, 1000, 10000),
            'billing_amount' => $this->faker->randomFloat(2, 2000, 15000),
            'line_rent_amount' => $this->faker->randomFloat(2, 500, 2000),
            'late_payment_surcharge' => $this->faker->randomFloat(2, 50, 500),
            'fine_additional_cost' => $this->faker->randomFloat(2, 0, 500),
        ];
    }
}
