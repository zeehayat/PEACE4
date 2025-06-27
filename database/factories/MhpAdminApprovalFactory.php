<?php

namespace Database\Factories;

use App\Models\MhpAdminApproval;
use App\Models\MhpSite;
use Illuminate\Database\Eloquent\Factories\Factory;

class MhpAdminApprovalFactory extends Factory
{
    protected $model = MhpAdminApproval::class;

    public function definition(): array
    {
        return [
            'mhp_site_id' => MhpSite::factory(),
            'eu_approval_date' => $this->faker->date(),
            'approved_cost' => $this->faker->randomFloat(2, 500000, 2000000),
            'hpp_inauguration_date' => $this->faker->date(),
            'civil_work_start_date' => $this->faker->date(),
            'mhp_inauguration_date' => $this->faker->date(),
        ];
    }
}
