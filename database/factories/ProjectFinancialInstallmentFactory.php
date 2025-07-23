<?php

namespace Database\Factories;

use App\Models\ProjectFinancialInstallment;
use App\Models\MhpSite; // Import MhpSite (or IrrigationScheme)
use App\Models\TAndDWork; // Import TAndDWork
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFinancialInstallmentFactory extends Factory
{
    protected $model = ProjectFinancialInstallment::class;

    public function definition(): array
    {
        $paymentFor = $this->faker->randomElement(['Civil', 'EME', 'T&D']);
        $activityId = null;
        $activityType = null;

        if ($paymentFor === 'T&D') {
            // If T&D, ensure a TAndDWork exists to link to
            $tAndDWork = TAndDWork::factory()->create();
            $activityId = $tAndDWork->id;
            $activityType = TAndDWork::class;
        }

        return [
            // Polymorphic relation to MhpSite or IrrigationScheme (will be set by test)
            'projectable_id' => null,
            'projectable_type' => null,
            'installment_number' => $this->faker->numberBetween(1, 10),
            'installment_date' => $this->faker->date(),
            'installment_amount' => $this->faker->randomFloat(2, 10000, 5000000),
            'category' => $this->faker->randomElement(['Initial', 'Mid-term', 'Final', 'Mobilization', 'Advance']),
            'remarks' => $this->faker->sentence(),
            'payment_for' => $paymentFor,
            'activity_id' => $activityId,
            'activity_type' => $activityType,
        ];
    }
}
