<?php

namespace Database\Factories;

use App\Models\IrrigationAdminApproval;
use App\Models\IrrigationScheme; // Import IrrigationScheme model
use App\Models\Vendor; // Import Vendor model
use Illuminate\Database\Eloquent\Factories\Factory;

class IrrigationAdminApprovalFactory extends Factory
{
    protected $model = IrrigationAdminApproval::class;

    public function definition(): array
    {
        // Ensure a Vendor exists for assignment
        $vendor = Vendor::inRandomOrder()->first() ?? Vendor::factory()->create();

        $dateTechnicalSurveys = $this->faker->dateTimeBetween('-2 years', 'now');
        $dateDesignSubmission = (clone $dateTechnicalSurveys)->modify('+1 month');
        $dateValidationVisit = (clone $dateDesignSubmission)->modify('+2 weeks');

        return [
            'irrigation_scheme_id' => IrrigationScheme::factory(), // Will be overridden if specified in create()
            'approved_vendor' => $vendor->name, // Use vendor's name for this field
            'vendor_id' => $vendor->id, // Link to the actual vendor ID
            'approved_cost' => $this->faker->randomFloat(2, 100000, 10000000),
            'date_technical_surveys' => $dateTechnicalSurveys->format('Y-m-d'),
            'date_design_estimates_submission_psu' => $dateDesignSubmission->format('Y-m-d'),
            'date_validation_visit_psu' => $dateValidationVisit->format('Y-m-d'),
        ];
    }
}
