<?php

namespace Database\Factories;

use App\Models\ProcurementFinalApproval;
use App\Models\ProcurementOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementFinalApproval>
 */
class ProcurementFinalApprovalFactory extends Factory
{
    protected $model = ProcurementFinalApproval::class;

    public function definition(): array
    {
        return [
            'procurement_order_id' => ProcurementOrder::factory(),
            'approved_by' => $this->faker->name,
            'designation' => $this->faker->jobTitle,
            'final_status' => 'approved',
            'decision_date' => $this->faker->date(),
            'final_remarks' => $this->faker->sentence,
        ];
    }
}
