<?php

namespace Database\Factories;

use App\Models\MhpSite;
use App\Models\Cbo; // Import Cbo model
use Illuminate\Database\Eloquent\Factories\Factory;

class MhpSiteFactory extends Factory
{
    protected $model = MhpSite::class;

    public function definition(): array
    {
        $establishmentDate = $this->faker->dateTimeBetween('-2 years', 'now');
        $financialInitiationDate = $this->faker->dateTimeBetween($establishmentDate, '+1 month');
        $tentativeCompletionDate = $this->faker->dateTimeBetween($establishmentDate, '+3 years');
        $physicalCompletionDate = $this->faker->dateTimeBetween($financialInitiationDate, $tentativeCompletionDate); // Ensure it's after financial init
        return [
            'cbo_id' => Cbo::factory(), // Automatically create a Cbo

            'established_by' => $this->faker->company,
            'population' => $this->faker->numberBetween(100, 5000),
            'grid_status' => $this->faker->randomElement(['On-Grid', 'Off-Grid', 'Partially on-Grid']),
            'status' => $this->faker->randomElement(['New', 'Rehabilitation', 'Upgradation']),
            'existing_capacity_kw' => $this->faker->randomFloat(2, 10, 500),
            'planned_capacity_kw' => $this->faker->randomFloat(2, 10, 500),
            'head_ft' => $this->faker->randomFloat(2, 5, 50),
            'design_discharge_cusecs' => $this->faker->randomFloat(2, 1, 20),
            'channel_length_km' => $this->faker->randomFloat(2, 0.1, 5),
            'tl_ht_km' => $this->faker->randomFloat(2, 0, 10),
            'tl_lt_km' => $this->faker->randomFloat(2, 0, 20),
            'turbine_type' => $this->faker->word,
            'alternator_type' => $this->faker->word,
            'accessible' => $this->faker->randomElement(['Yes', 'No']),
            'domestic_units' => $this->faker->numberBetween(10, 500),
            'commercial_units' => $this->faker->numberBetween(0, 50),
            'estimated_cost' => $this->faker->randomFloat(2, 100000, 50000000),
            'per_kw_cost' => $this->faker->randomFloat(2, 1000, 50000),
            'total_hh' => $this->faker->numberBetween(10, 500),
            'avg_hh_size' => $this->faker->randomFloat(2, 4, 8),
            'cost_per_capita' => $this->faker->randomFloat(2, 100, 10000),
            'month_year_establishment' => $establishmentDate->format('Y-m-d'),
            'tentative_completion_date' => $tentativeCompletionDate->format('Y-m-d'),
            'financial_initiation_date' => $financialInitiationDate->format('Y-m-d'),
            'physical_completion_date' => $physicalCompletionDate->format('Y-m-d'),
            'remarks' => $this->faker->sentence(),
            // New fields
            'observed_discharge' => $this->faker->randomFloat(2, 1, 25),
            'intake_details' => $this->faker->paragraph(1),
            'settling_basin_details' => $this->faker->paragraph(1),
            'approach_culvert_details' => $this->faker->paragraph(1),
            'headrace_channel_details' => $this->faker->paragraph(1),
            'aqueduct_details' => $this->faker->paragraph(1),
            'tailrace_details' => $this->faker->paragraph(1),
            'spillway_details' => $this->faker->paragraph(1),
            'retaining_walls_details' => $this->faker->paragraph(1),
            'design_net_head' => $this->faker->randomFloat(2, 4, 45),
            'proposed_capacity_kw' => $this->faker->randomFloat(2, 10, 500),
            'length_ft' => $this->faker->randomFloat(2, 100, 1000),
            'bottom_width_ft' => $this->faker->randomFloat(2, 1, 10),
            'design_depth_ft' => $this->faker->randomFloat(2, 1, 5),
            'freeboard_ft' => $this->faker->randomFloat(2, 0.1, 1),
            'velocity_ft_per_sec' => $this->faker->randomFloat(2, 1, 5),
        ];
    }
}
