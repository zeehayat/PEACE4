<?php

namespace Database\Factories;

use App\Models\ProcurementDelivery;
use App\Models\ProcurementOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementDelivery>
 */
class ProcurementDeliveryFactory extends Factory
{
    protected $model = ProcurementDelivery::class;

    public function definition(): array
    {
        return [
            'procurement_order_id' => ProcurementOrder::factory(),
            'delivery_date' => $this->faker->date(),
            'delivery_notes' => $this->faker->sentence,
        ];
    }
}
