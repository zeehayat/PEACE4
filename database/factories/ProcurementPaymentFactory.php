<?php

namespace Database\Factories;

use App\Models\ProcurementOrder;
use App\Models\ProcurementPayment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementPayment>
 */
class ProcurementPaymentFactory extends Factory
{
    protected $model = ProcurementPayment::class;

    public function definition(): array
    {
        return [
            'procurement_order_id' => ProcurementOrder::factory(),
            'payment_date' => $this->faker->date(),
            'amount_paid' => $this->faker->randomFloat(2, 1000, 50000),
            'payment_method' => 'bank transfer',
            'reference' => $this->faker->bothify('REF-####'),
        ];
    }
}
