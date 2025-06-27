<?php

namespace Database\Factories;

use App\Models\ProcurementCommitteeMember;
use App\Models\ProcurementCommitteeReview;
use App\Models\ProcurementOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementCommitteeReview>
 */
class ProcurementCommitteeReviewFactory extends Factory
{
    protected $model = ProcurementCommitteeReview::class;

    public function definition(): array
    {
        return [
            'procurement_order_id' => ProcurementOrder::factory(),
            'committee_member_id' => ProcurementCommitteeMember::factory(),
            'member_name' => $this->faker->name,
            'designation' => $this->faker->jobTitle,
            'decision' => 'approve',
            'remarks' => $this->faker->sentence,
        ];
    }
}
