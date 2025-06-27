<?php

namespace Database\Factories;

use App\Models\ProcurementOrder;
use App\Models\ProcurementQuotation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementOrder>
 */
class ProcurementOrderFactory extends Factory
{
    protected $model = ProcurementOrder::class;

    public function definition(): array
    {
        return [
            'procurement_quotation_id' => ProcurementQuotation::factory(),
            'procurement_code' => $this->faker->unique()->bothify('PR-####'),
            'procurement_type' => 'MHP',
            'order_date' => $this->faker->date(),
            'status' => 'pending',
            'total_amount' => $this->faker->randomFloat(2, 1000, 50000),
        ];
    }
}
