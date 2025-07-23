<?php

namespace Database\Factories;

use App\Models\MhpAdminApproval;
use App\Models\MhpSite; // Import MhpSite model
use Illuminate\Database\Eloquent\Factories\Factory;

class MhpAdminApprovalFactory extends Factory
{
    protected $model = MhpAdminApproval::class;

    public function definition(): array
    {
        return [
            'mhp_site_id' => MhpSite::factory(), // Automatically create an MhpSite
            'eu_approval_date' => $this->faker->date(),
            'approved_cost' => $this->faker->randomFloat(2, 1000000, 100000000),
            'revised_cost_1' => $this->faker->optional()->randomFloat(2, 1000000, 100000000),
            'revised_cost_2' => $this->faker->optional()->randomFloat(2, 1000000, 100000000),
            'revised_cost_3' => $this->faker->optional()->randomFloat(2, 1000000, 100000000),
            'hpp_inauguration_date' => $this->faker->date(),
            'technical_survey_date' => $this->faker->date(),
            'date_design_psu_submission' => $this->faker->date(),
            'headoffice_review_submission_date' => $this->faker->date(),
            'design_estimate_date' => $this->faker->date(),
            'eu_approval_submission_date' => $this->faker->date(),
            'opm_validation_date' => $this->faker->date(),
            'remarks' => $this->faker->sentence(),
        ];
    }
}
