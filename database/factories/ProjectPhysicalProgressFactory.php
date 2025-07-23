<?php

namespace Database\Factories;

use App\Models\ProjectPhysicalProgress;
use App\Models\MhpSite; // Import MhpSite (or IrrigationScheme)
use App\Models\TAndDWork; // Import TAndDWork
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectPhysicalProgressFactory extends Factory
{
    protected $model = ProjectPhysicalProgress::class;

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
            'progress_percentage' => $this->faker->randomFloat(2, 0, 100),
            'progress_date' => $this->faker->date(),
            'remarks' => $this->faker->sentence(),
            'payment_for' => $paymentFor,
            'activity_id' => $activityId,
            'activity_type' => $activityType,
        ];
    }
}
