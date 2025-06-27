<?php

namespace Database\Factories;

use App\Models\ProjectPhysicalProgress;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectPhysicalProgressFactory extends Factory
{
    protected $model = ProjectPhysicalProgress::class;

    public function definition(): array
    {
        return [
            'projectable_id' => 1, // Override in test
            'projectable_type' => 'App\\Models\\MhpSite',
            'milestone_percent' => $this->faker->randomElement([25, 50, 75, 100]),
            'component' => $this->faker->randomElement(['general', 'eme', 'tnd']),
            'remarks' => $this->faker->optional()->sentence(),
        ];
    }
}
