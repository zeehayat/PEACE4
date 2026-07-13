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
                ->where('chart_implementation_status.counts', [2, 3, 2, 1])
            );
    }

    public function test_index_returns_progress_chart(): void
    {
        District::create(['name' => 'Swat']);
        $cbo = Cbo::factory()->create(['district' => 'Swat', 'cbo_name' => 'Swat CBO 1']);
        $scheme = IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);

        // Insert via the real polymorphic relation, exactly as the app does when a
        // user records progress — this writes projectable_type using whatever
        // Relation::enforceMorphMap() dictates (the morph alias), not the FQCN.
        $scheme->physicalProgresses()->create([
            'progress_percentage' => 65,
            'progress_date' => now(),
        ]);
        $scheme->financialInstallments()->create([
            'installment_number' => 4,
            'installment_date' => now(),
            'installment_amount' => 100000,
        ]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('irrigation.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('chart_progress.labels', 1)
                ->where('chart_progress.physical.0', 65)
                ->where('chart_progress.financial.0', 40)
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

    public function test_index_returns_cbo_formation_and_land_channel_charts(): void
    {
        District::create(['name' => 'Swat']);
        District::create(['name' => 'Kurram']);

        $cboA = Cbo::factory()->create(['district' => 'Swat', 'date_of_formation' => '2025-06-15']);
        $cboB = Cbo::factory()->create(['district' => 'Kurram', 'date_of_formation' => '2025-07-10']);

        $schemeA = IrrigationScheme::factory()->create(['cbo_id' => $cboA->id]);
        $schemeA->profile->update(['land_area_hectares' => 10, 'channel_length_km' => 2]);

        $schemeB = IrrigationScheme::factory()->create(['cbo_id' => $cboB->id]);
        $schemeB->profile->update(['land_area_hectares' => 20, 'channel_length_km' => 3]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('irrigation.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('chart_cbo_formation.labels', 2)
                ->has('chart_cbo_formation.series', 2)
                ->where('chart_land_channel_coverage.labels', ['Kurram', 'Swat'])
                ->where('chart_land_channel_coverage.channel_km.0', 3)
                ->where('chart_land_channel_coverage.channel_km.1', 2)
            );
    }

    public function test_index_returns_scheme_and_cbo_log_tables(): void
    {
        District::create(['name' => 'Shangla']);
        $cbo = Cbo::factory()->create([
            'district' => 'Shangla',
            'village' => 'Test Village',
            'cbo_name' => 'Shangla CBO',
            'total_members' => 25,
            'gender' => 'Female',
            'date_of_formation' => '2024-01-15',
        ]);
        $scheme = IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);
        $scheme->profile->update(['beneficiary_hhs' => 80, 'land_area_hectares' => 10, 'channel_length_km' => 2, 'ho_approval_date' => '2024-06-01']);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('irrigation.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('scheme_log', 1)
                ->where('scheme_log.0.district', 'Shangla')
                ->where('scheme_log.0.beneficiary_hh', 80)
                ->where('scheme_log.0.status', 'Approved')
                ->has('cbo_log', 1)
                ->where('cbo_log.0.cbo_name', 'Shangla CBO')
                ->where('cbo_log.0.members', 25)
                ->where('cbo_log.0.gender', 'Female')
            );
    }

    public function test_export_schemes_streams_csv(): void
    {
        District::create(['name' => 'Swat']);
        $cbo = Cbo::factory()->create(['district' => 'Swat']);
        IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);

        $response = $this->actingAs($this->actingAsAdmin())
            ->get(route('irrigation.overview.export-schemes'));

        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
    }

    public function test_export_cbos_streams_csv(): void
    {
        District::create(['name' => 'Swat']);
        $cbo = Cbo::factory()->create(['district' => 'Swat']);
        IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);

        $response = $this->actingAs($this->actingAsAdmin())
            ->get(route('irrigation.overview.export-cbos'));

        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
    }

    public function test_index_flags_stalled_schemes(): void
    {
        District::create(['name' => 'North Waziristan']);
        $cbo = Cbo::factory()->create(['district' => 'North Waziristan', 'cbo_name' => 'NW CBO']);

        // Approved > 90 days ago, work not yet initiated -> stalled
        $stalled = IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);
        $stalled->profile->update(['ho_approval_date' => now()->subDays(120)]);

        // Approved recently -> not stalled
        $recent = IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);
        $recent->profile->update(['ho_approval_date' => now()->subDays(10)]);

        // Approved long ago but work already initiated -> not stalled
        $progressing = IrrigationScheme::factory()->create(['cbo_id' => $cbo->id]);
        $progressing->profile->update(['ho_approval_date' => now()->subDays(150), 'work_initiated_date' => now()->subDays(5)]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('irrigation.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('stalled', 1)
                ->where('stalled.0.id', $stalled->id)
            );
    }
}
