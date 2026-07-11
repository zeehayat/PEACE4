<?php

namespace Tests\Feature;

use App\Models\Cbo;
use App\Models\District;
use App\Models\IrrigationScheme;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class IrrigationDashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin(): User
    {
        Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']);
        $user = User::factory()->create();
        $user->assignRole('Root');
        return $user;
    }

    public function test_index_returns_infrastructure_and_status_stats(): void
    {
        District::create(['name' => 'Swat']);
        $cbo = Cbo::factory()->create(['district' => 'Swat']);

        // Not Yet Approved
        $notApproved = IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);
        $notApproved->profile->update(['channel_length_km' => 0]);

        // Approved only
        $approved = IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);
        $approved->profile->update(['ho_approval_date' => now(), 'beneficiary_hhs' => 100, 'land_area_hectares' => 10, 'channel_length_km' => 2]);

        // Ongoing (approved + initiated)
        $ongoing = IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);
        $ongoing->profile->update(['ho_approval_date' => now(), 'work_initiated_date' => now(), 'beneficiary_hhs' => 200, 'land_area_hectares' => 20, 'channel_length_km' => 3]);

        // Completed
        $completed = IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);
        $completed->profile->update(['ho_approval_date' => now(), 'work_initiated_date' => now(), 'work_completed_date' => now(), 'beneficiary_hhs' => 300, 'land_area_hectares' => 30, 'channel_length_km' => 4]);

        // Channel-length outlier — must be excluded from the km_of_channel sum
        $outlier = IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);
        $outlier->profile->update(['channel_length_km' => 1500]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('irrigation.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Irrigation/Dashboard')
                ->where('stats.infrastructure.total_schemes', 5)
                ->where('stats.infrastructure.schemes_ongoing', 1)
                ->where('stats.infrastructure.schemes_completed', 1)
                ->where('stats.infrastructure.beneficiary_households', 600)
                ->where('stats.infrastructure.km_of_channel', 9)
                ->where('stats.infrastructure.channel_excluded_count', 1)
                ->where('chart_implementation_status.labels', ['Not Yet Approved', 'Approved', 'Ongoing', 'Completed'])
                ->where('chart_implementation_status.counts', [2, 1, 1, 1])
            );
    }

    public function test_index_returns_district_alignment_chart(): void
    {
        District::create(['name' => 'Chitral Upper']);
        District::create(['name' => 'Kurram']);

        $cboA = Cbo::factory()->create(['district' => 'Chitral Upper']);
        $cboB = Cbo::factory()->create(['district' => 'Kurram']);

        IrrigationScheme::factory()->create(['cbo_id' => $cboA->id]);
        IrrigationScheme::factory()->create(['cbo_id' => $cboA->id]);
        IrrigationScheme::factory()->create(['cbo_id' => $cboB->id]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('irrigation.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('chart_district_alignment.labels', ['Chitral Upper', 'Kurram'])
                ->where('chart_district_alignment.scheme_counts', [2, 1])
                ->where('chart_district_alignment.cbo_counts', [1, 1])
            );
    }

    public function test_index_returns_beneficiary_charts(): void
    {
        District::create(['name' => 'Shangla']);
        $cbo = Cbo::factory()->create(['district' => 'Shangla', 'cbo_name' => 'Shangla CBO 1']);

        $scheme = IrrigationScheme::factory()->create([
            'cbo_id' => $cbo->id,
            'direct_household_beneficiary' => 40,
            'indirect_household_beneficiary' => 160,
        ]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('irrigation.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('chart_progress.labels', 1)
                ->has('chart_direct_beneficiaries.labels', 1)
                ->where('chart_direct_beneficiaries.counts.0', 40)
                ->has('chart_indirect_beneficiaries.labels', 1)
                ->where('chart_indirect_beneficiaries.counts.0', 160)
            );
    }
}
