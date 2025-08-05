<?php

namespace Database\Factories;

use App\Models\LrmCommittee;
use App\Models\Cbo; // Import Cbo model
use Illuminate\Database\Eloquent\Factories\Factory;

class LrmCommitteeFactory extends Factory
{
    protected $model = LrmCommittee::class;

    public function definition(): array
    {
        // Ensure CBO is created with a district
        $cbo = Cbo::factory()->create();

        $formationDate = $this->faker->dateTimeBetween('-3 years', 'now');
        $nrmFinalizationDate = (clone $formationDate)->modify('+6 months');

        return [
            'cbo_id' => $cbo->id,
            'date_of_lrm_committee_formation' => $formationDate->format('Y-m-d'),
            'no_of_lrm_committee_members' => $this->faker->numberBetween(5, 20),
            'date_of_nrm_plan_finalization' => $nrmFinalizationDate->format('Y-m-d'),
            'has_afforestation_reforestation' => $this->faker->boolean(),
            'forest_plants' => $this->faker->randomElements(['Rubinia', 'Allinthis', 'Bakain', 'Others'], $this->faker->numberBetween(0, 3)),
            'fruit_plants' => $this->faker->randomElements(['PEACH', 'Apple', 'Orange', 'Mango'], $this->faker->numberBetween(0, 3)),
            'total_land_covered_hectares' => $this->faker->randomFloat(2, 1, 50),
            'remarks' => $this->faker->paragraph(),
        ];
    }
}
