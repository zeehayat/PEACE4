<?php

namespace Database\Factories;

use App\Models\IrrigationSchemeContract;
use App\Models\IrrigationScheme;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;

class IrrigationSchemeContractFactory extends Factory
{
    protected $model = IrrigationSchemeContract::class;

    public function definition(): array
    {
        $vendor = Vendor::inRandomOrder()->first() ?? Vendor::factory()->create();

        $agreementDate = $this->faker->dateTimeBetween('-1 year', 'now');
        $physicalStartDate = (clone $agreementDate)->modify('+1 week');

        return [
            'irrigation_scheme_id' => IrrigationScheme::factory(),
            'vendor_id' => $vendor->id,
            //'approved_vendor' => $vendor->name, // This field *should* exist after 'move_vendor_from_approval_to_contract'
            'date_of_agreement_contract' => $agreementDate->format('Y-m-d'),
            'date_of_physical_start' => $physicalStartDate->format('Y-m-d'),
            'agreement_cost' => $this->faker->randomFloat(2, 50000, 5000000),
            'remarks' => $this->faker->paragraph(), // This field *should* exist after 'move_vendor_from_approval_to_contract'
        ];
    }
}
