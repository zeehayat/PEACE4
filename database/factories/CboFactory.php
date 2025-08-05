<?php

namespace Database\Factories;

use App\Models\Cbo;
use App\Models\District; // Import District model
use Illuminate\Database\Eloquent\Factories\Factory;

class CboFactory extends Factory
{
    protected $model = Cbo::class;

    public function definition(): array
    {
        // Fetch an existing district or create a new one if none exist
        $district = District::inRandomOrder()->first() ?? District::factory()->create();

        return [
            'reference_code' => 'CBO-' . $this->faker->unique()->randomNumber(5),
            'district' => $district->name, // Link to the district's name
            'tehsil' => $this->faker->city,
            'village_council' => $this->faker->streetName,
            'village' => $this->faker->streetName,
            'date_of_formation' => $this->faker->date(),
            'total_members' => $this->faker->numberBetween(10, 200),
            'gender' => $this->faker->randomElement(['Male', 'Female', 'Mixed']),
            'num_cbo_members' => $this->faker->numberBetween(5, 100),
            'president_name' => $this->faker->name,
            'president_contact' => $this->faker->phoneNumber,
            'secretary_name' => $this->faker->name,
            'secretary_contact' => $this->faker->phoneNumber,
            'remarks' => $this->faker->paragraph(),
        ];
    }
}
