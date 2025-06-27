<?php

namespace Database\Factories;

use App\Models\ProcurementQuotation;
use App\Models\ProcurementRequisition;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementQuotation>
 */
class ProcurementQuotationFactory extends Factory
{
    protected $model = ProcurementQuotation::class;

    public function definition(): array
    {
        return [
            'procurement_requisition_id' => ProcurementRequisition::factory(),
            'vendor_id' => Vendor::factory(),
            'quotation_date' => $this->faker->date(),
            'remarks' => $this->faker->sentence,
        ];
    }
}
