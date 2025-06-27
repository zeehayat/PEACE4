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
            'cbo_id' => Cbo::factory(),
            'dialogue_date' => $this->faker->date(),
            'participants' => $this->faker->numberBetween(10, 100),
        ];
    }
}
