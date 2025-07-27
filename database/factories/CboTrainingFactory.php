<?php

namespace Database\Factories;

use App\Models\CboTraining;
use App\Models\Cbo;
use Illuminate\Database\Eloquent\Factories\Factory;

class CboTrainingFactory extends Factory
{
    protected $model = CboTraining::class;

    public function definition(): array
    {
        return [
            'cbo_id' => Cbo::factory(),
            'training_type' => $this->faker->randomElement(['O&M Training', 'Electrical Appliance']), // FIX: Use exact enum values
            'training_gender' => $this->faker->randomElement(['Male', 'Female', 'Mixed']), // FIX: Use exact enum values
            'date_of_training' => $this->faker->date(),
            'total_participants' => $this->faker->numberBetween(1, 30),
            'remarks' => $this->faker->sentence(),
        ];
    }
}
