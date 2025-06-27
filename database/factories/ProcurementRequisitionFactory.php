<?php

namespace Database\Factories;

use App\Models\ProcurementRequisition;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementRequisition>
 */
class ProcurementRequisitionFactory extends Factory
{
    protected $model = ProcurementRequisition::class;

    public function definition(): array
    {
        return [
            'reference_code' => $this->faker->uuid,
            'requested_by' => $this->faker->name,
            'requested_on' => $this->faker->date(),
            'purpose' => $this->faker->sentence,
        ];
    }
}
