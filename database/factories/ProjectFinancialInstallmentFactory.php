<?php

namespace Database\Factories;

use App\Models\ProjectFinancialInstallment;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFinancialInstallmentFactory extends Factory
{
    protected $model = ProjectFinancialInstallment::class;

    public function definition(): array
    {
        return [
            'projectable_id' => 1, // Override in test
            'projectable_type' => 'App\\Models\\MhpSite',
            'installment_number' => $this->faker->numberBetween(1, 10),
            'installment_date' => $this->faker->date(),
            'installment_amount' => $this->faker->randomFloat(2, 50000, 500000),
            'category' => $this->faker->randomElement(['general', 'eme', 'tnd']),
            'remarks' => $this->faker->optional()->sentence(),
        ];
    }
}
