<?php

namespace Database\Factories;

use App\Models\CboDialogue;
use App\Models\Cbo;
use Illuminate\Database\Eloquent\Factories\Factory;

class CboDialogueFactory extends Factory
{
    protected $model = CboDialogue::class;

    public function definition(): array
    {
        return [
            'cbo_id' => Cbo::factory(), // Automatically create a Cbo
            'date_of_dialogue' => $this->faker->date(), // FIX: Use correct column name
            'participants' => $this->faker->numberBetween(5, 50),
            'remarks' => $this->faker->sentence(),
        ];
    }
}




