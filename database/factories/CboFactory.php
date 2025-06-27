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
            'reference_code' => $this->faker->unique()->numerify('CBO-####'),
            'district' => $this->faker->city,
            'tehsil' => $this->faker->citySuffix,
            'village_council' => $this->faker->word,
            'village' => $this->faker->city,
            'formation_date' => $this->faker->date(),
            'total_members' => $this->faker->numberBetween(5, 20),
            'gender' => $this->faker->randomElement(['male', 'female', 'mixed']),
            'no_of_members' => $this->faker->numberBetween(5, 20),
            'president_name' => $this->faker->name,
            'president_contact' => $this->faker->phoneNumber,
            'secretary_name' => $this->faker->name,
            'secretary_contact' => $this->faker->phoneNumber,
        ];
    }
}
