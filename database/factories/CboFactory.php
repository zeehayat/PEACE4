<?php

namespace Database\Factories;

use App\Models\Cbo;
use Illuminate\Database\Eloquent\Factories\Factory;

class CboFactory extends Factory
{
    protected $model = Cbo::class;

    public function definition(): array
    {
        return [
            'reference_code' => 'CBO-' . $this->faker->unique()->randomNumber(4),
            'district' => $this->faker->city,
            'tehsil' => $this->faker->city,
            'village_council' => $this->faker->word,
            'village' => $this->faker->city,
            'date_of_formation' => $this->faker->date(),
            'total_members' => $this->faker->numberBetween(10, 100),
            'gender' => $this->faker->randomElement(['Male', 'Female', 'Mixed']),
            'num_cbo_members' => $this->faker->numberBetween(5, 50),
            'president_name' => $this->faker->name,
            'president_contact' => $this->faker->phoneNumber,
            'secretary_name' => $this->faker->name,
            'secretary_contact' => $this->faker->phoneNumber,
        ];
    }
}
