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
            'training_type' => $this->faker->randomElement(['O&M Training', 'Electrical Appliance Training']),
            'training_gender' => $this->faker->randomElement(['male', 'female', 'mixed']),
            'date_of_training' => $this->faker->date(),
            'total_participants' => $this->faker->numberBetween(10, 50),
        ];
    }
}
