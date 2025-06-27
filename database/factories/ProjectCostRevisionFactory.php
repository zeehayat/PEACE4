<?php

namespace Database\Factories;

use App\Models\ProjectCostRevision;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectCostRevisionFactory extends Factory
{
    protected $model = ProjectCostRevision::class;

    public function definition(): array
    {
        return [
            'approvable_id' => 1, // Override in test
            'approvable_type' => 'App\\Models\\MhpAdminApproval',
            'revision_number' => $this->faker->numberBetween(1, 3),
            'revised_cost' => $this->faker->randomFloat(2, 500000, 2500000),
            'approved_on' => $this->faker->date(),
            'remarks' => $this->faker->sentence(),
        ];
    }
}
