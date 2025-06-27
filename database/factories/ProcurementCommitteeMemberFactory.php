<?php

namespace Database\Factories;

use App\Models\ProcurementCommitteeMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementCommitteeMember>
 */
class ProcurementCommitteeMemberFactory extends Factory
{
    protected $model = ProcurementCommitteeMember::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'designation' => $this->faker->jobTitle,
            'email' => $this->faker->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'active' => true,
        ];
    }
}
