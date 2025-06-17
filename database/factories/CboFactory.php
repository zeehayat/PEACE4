<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CboFactory extends Factory
{
    public function definition(): array
    {
        return [
            'reference_code' => 'CBO-' . $this->faker->unique()->numerify('###'),
            'district' => $this->faker->city,
            'tehsil' => $this->faker->citySuffix,
            'vc_nc' => $this->faker->word,
            'village' => $this->faker->citySuffix,
        ];
    }
}
