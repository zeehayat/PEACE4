<?php

namespace Database\Factories;

use App\Models\MhpEmeProgress;
use Illuminate\Database\Eloquent\Factories\Factory;

class MhpEmeProgressFactory extends Factory
{
    protected $model = MhpEmeProgress::class;

    public function definition(): array
    {
        return [
            'mhp_site_id' => \App\Models\MhpSite::factory(),
            'milestone_percent' => $this->faker->randomElement([25, 50, 75, 100]),
            'progress_date' => $this->faker->date(),
            'remarks' => $this->faker->optional()->sentence(),
        ];
    }
}

