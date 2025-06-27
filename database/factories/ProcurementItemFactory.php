<?php

namespace Database\Factories;

use App\Models\ProcurementItem;
use App\Models\ProcurementRequisition;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementItem>
 */
class ProcurementItemFactory extends Factory
{
    protected $model = ProcurementItem::class;

    public function definition(): array
    {
        return [
            'procurement_requisition_id' => ProcurementRequisition::factory(),
            'item_name' => $this->faker->word,
            'unit' => 'pcs',
            'quantity' => $this->faker->numberBetween(1, 100),
            'specification' => $this->faker->sentence,
        ];
    }
}
