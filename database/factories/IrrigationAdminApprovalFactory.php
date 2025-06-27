<?php

namespace Database\Factories;

use App\Models\IrrigationAdminApproval;
use App\Models\IrrigationScheme;
use Illuminate\Database\Eloquent\Factories\Factory;

class IrrigationAdminApprovalFactory extends Factory
{
    protected $model = IrrigationAdminApproval::class;

    public function definition(): array
    {
        return [
            'irrigation_scheme_id' => IrrigationScheme::factory(),
            'eu_approval_date' => $this->faker->date(),
            'approved_cost' => $this->faker->randomFloat(2, 100000, 1000000),
            'civil_work_start_date' => $this->faker->date(),
            'scheme_inauguration_date' => $this->faker->date(),
        ];
    }
}
