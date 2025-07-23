<?php

namespace Database\Factories;

use App\Models\TAndDWork;
use App\Models\MhpSite; // Import MhpSite model (or IrrigationScheme if applicable)
use Illuminate\Database\Eloquent\Factories\Factory;

class TAndDWorkFactory extends Factory
{
    protected $model = TAndDWork::class;

    public function definition(): array
    {
        return [
            // Polymorphic relation: will be set by the test or calling factory
            'projectable_id' => null,
            'projectable_type' => null,
            'name' => $this->faker->sentence(3),
            'date_of_initiation' => $this->faker->date(),
            'step_up_transformers' => [
                ['kva' => $this->faker->numberBetween(10, 100), 'qty' => $this->faker->numberBetween(1, 5)],
                ['kva' => $this->faker->numberBetween(10, 100), 'qty' => $this->faker->numberBetween(1, 5)],
            ],
            'step_down_transformers' => [
                ['kva' => $this->faker->numberBetween(10, 100), 'qty' => $this->faker->numberBetween(1, 5)],
            ],
            'ht_poles_quantity' => $this->faker->numberBetween(10, 200),
            'lt_poles_quantity' => $this->faker->numberBetween(20, 400),
            'ht_conductor_length_km' => $this->faker->randomFloat(2, 0.5, 20),
            'ht_conductor_type' => $this->faker->randomElement(['ACSR', 'AAAC']),
            'lt_conductor_length_km' => $this->faker->randomFloat(2, 1, 50),
            'lt_conductor_type' => $this->faker->randomElement(['UAAC', 'ABC']),
            'scope_of_work' => $this->faker->paragraph(2),
            'remarks' => $this->faker->sentence(),
        ];
    }
}
