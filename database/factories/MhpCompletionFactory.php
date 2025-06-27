<?php

namespace Database\Factories;

use App\Models\MhpCompletion;
use App\Models\MhpSite;
use Illuminate\Database\Eloquent\Factories\Factory;

class MhpCompletionFactory extends Factory
{
    protected $model = MhpCompletion::class;

    public function definition(): array
    {
        return [
            'mhp_site_id' => MhpSite::factory(),
            'scheme_inauguration_date' => $this->faker->date(),
            'testing_commissioning_date' => $this->faker->date(),
            'handover_date' => $this->faker->date(),
            'remarks' => $this->faker->sentence(),
        ];
    }
}
