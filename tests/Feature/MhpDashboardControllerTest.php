<?php

namespace Tests\Feature;

use App\Models\Cbo;
use App\Models\District;
use App\Models\MhpAdminApproval;
use App\Models\MhpCompletion;
use App\Models\MhpSite;
use App\Models\ProjectFinancialInstallment;
use App\Models\ProjectPhysicalProgress;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class MhpDashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsAdmin(): User
    {
        Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']);
        $user = User::factory()->create();
        $user->assignRole('Root');
        return $user;
    }

    public function test_index_returns_pipeline_stage_counts(): void
    {
        District::create(['name' => 'Swat']);
        $cbo = Cbo::factory()->create(['district' => 'Swat']);

        // Prioritized only
        MhpSite::factory()->create(['cbo_id' => $cbo->id, 'planned_capacity_kw' => 100]);

        // Prioritized + design done
        $designed = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'planned_capacity_kw' => 200,
            'management_committee_date' => now(),
        ]);

        // Prioritized + design + approved
        $approved = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'planned_capacity_kw' => 300,
            'management_committee_date' => now(),
        ]);
        MhpAdminApproval::create(['mhp_site_id' => $approved->id, 'eu_approval_date' => now()]);

        // Prioritized + design + approved + civil initiated
        $civil = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'planned_capacity_kw' => 400,
            'management_committee_date' => now(),
            'civil_work_initiation_date' => now(),
        ]);
        MhpAdminApproval::create(['mhp_site_id' => $civil->id, 'eu_approval_date' => now()]);

        // Prioritized + design + approved + civil + completed
        $completed = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'planned_capacity_kw' => 500,
            'management_committee_date' => now(),
            'civil_work_initiation_date' => now(),
        ]);
        MhpAdminApproval::create(['mhp_site_id' => $completed->id, 'eu_approval_date' => now()]);
        MhpCompletion::create(['mhp_site_id' => $completed->id, 'handover_date' => now()]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('mhp.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('MHP/Dashboard')
                ->where('stats.pipeline.0.label', 'Prioritized')
                ->where('stats.pipeline.0.count', 5)
                ->where('stats.pipeline.1.label', 'Detailed Design Done')
                ->where('stats.pipeline.1.count', 4)
                ->where('stats.pipeline.2.label', 'Approved by EU/OPM')
                ->where('stats.pipeline.2.count', 3)
                ->where('stats.pipeline.3.label', 'Civil Works Initiated')
                ->where('stats.pipeline.3.count', 2)
                ->where('stats.pipeline.4.label', 'Completed')
                ->where('stats.pipeline.4.count', 1)
                ->where('stats.pipeline.0.capacity_kw', 1500)
            );
    }

    public function test_index_returns_mobilization_and_type_breakdown_charts(): void
    {
        District::create(['name' => 'Chitral Upper']);
        District::create(['name' => 'Swat']);

        $cboA = Cbo::factory()->create(['district' => 'Chitral Upper']);
        $cboB = Cbo::factory()->create(['district' => 'Swat']);

        MhpSite::factory()->create(['cbo_id' => $cboA->id, 'status' => 'New', 'management_committee_date' => now()]);
        MhpSite::factory()->create(['cbo_id' => $cboA->id, 'status' => 'Rehabilitation', 'management_committee_date' => now()]);
        MhpSite::factory()->create(['cbo_id' => $cboB->id, 'status' => 'New']); // no management_committee_date -> excluded from type breakdown

        $this->actingAs($this->actingAsAdmin())
            ->get(route('mhp.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('chart_mobilization.labels', 2)
                ->where('chart_type_breakdown.labels', ['New', 'Rehabilitation'])
                ->where('chart_type_breakdown.counts', [1, 1])
            );
    }

    public function test_index_returns_progress_and_beneficiary_charts(): void
    {
        District::create(['name' => 'Kurram']);
        $cbo = Cbo::factory()->create(['district' => 'Kurram', 'cbo_name' => 'Kurram CBO 1']);

        $site = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'civil_contractor_amount' => 1000,
            'civil_physical_progress_percent' => 50,
            'total_hh' => 120,
            'commercial_units' => 10,
        ]);
        MhpAdminApproval::create(['mhp_site_id' => $site->id, 'technical_survey_date' => now()]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('mhp.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('chart_progress.labels', 1)
                ->where('chart_progress.physical.0', 50)
                ->has('chart_beneficiaries.labels', 1)
                ->where('chart_beneficiaries.total_hh.0', 120)
                ->where('chart_beneficiaries.commercial_units.0', 10)
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
            'date_of_formation' => '2024-01-15',
        ]);
        $site = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'total_hh' => 80,
        ]);
        MhpAdminApproval::create(['mhp_site_id' => $site->id, 'eu_approval_date' => '2024-06-01']);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('mhp.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('scheme_log', 1)
                ->where('scheme_log.0.district', 'Shangla')
                ->where('scheme_log.0.total_hh', 80)
                ->has('cbo_log', 1)
                ->where('cbo_log.0.cbo_name', 'Shangla CBO')
                ->where('cbo_log.0.members', 25)
            );
    }

    public function test_export_schemes_streams_csv(): void
    {
        District::create(['name' => 'Swat']);
        $cbo = Cbo::factory()->create(['district' => 'Swat']);
        MhpSite::factory()->create(['cbo_id' => $cbo->id]);

        $response = $this->actingAs($this->actingAsAdmin())
            ->get(route('mhp.overview.export-schemes'));

        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
    }

    public function test_export_cbos_streams_csv(): void
    {
        District::create(['name' => 'Swat']);
        $cbo = Cbo::factory()->create(['district' => 'Swat']);
        MhpSite::factory()->create(['cbo_id' => $cbo->id]);

        $response = $this->actingAs($this->actingAsAdmin())
            ->get(route('mhp.overview.export-cbos'));

        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
    }

    public function test_index_returns_component_progress_chart(): void
    {
        District::create(['name' => 'Kohistan']);
        $cbo = Cbo::factory()->create(['district' => 'Kohistan', 'cbo_name' => 'Kohistan CBO 1']);
        $site = MhpSite::factory()->create(['cbo_id' => $cbo->id]);

        // Civil: two rows, MAX should win (70 over 40). Inserted via the real
        // polymorphic relation (not a raw factory projectable_type string) so this
        // test exercises whatever Relation::enforceMorphMap() actually writes.
        $site->physicalProgresses()->create([
            'payment_for' => 'Civil',
            'progress_percentage' => 40,
            'progress_date' => now(),
        ]);
        $site->physicalProgresses()->create([
            'payment_for' => 'Civil',
            'progress_percentage' => 70,
            'progress_date' => now(),
        ]);

        // EME
        $site->physicalProgresses()->create([
            'payment_for' => 'EME',
            'progress_percentage' => 30,
            'progress_date' => now(),
        ]);

        // T&D
        $site->physicalProgresses()->create([
            'payment_for' => 'T&D',
            'progress_percentage' => 15,
            'progress_date' => now(),
        ]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('mhp.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('chart_component_progress.labels', 1)
                ->where('chart_component_progress.labels.0', 'Kohistan CBO 1')
                ->where('chart_component_progress.civil.0', 70)
                ->where('chart_component_progress.eme.0', 30)
                ->where('chart_component_progress.td.0', 15)
                ->where('chart_component_progress.table.0.scheme', 'Kohistan CBO 1')
                ->where('chart_component_progress.table.0.civil', 70)
            );
    }

    public function test_index_flags_stalled_schemes(): void
    {
        District::create(['name' => 'North Waziristan']);
        $cbo = Cbo::factory()->create(['district' => 'North Waziristan', 'cbo_name' => 'NW CBO']);

        // Approved > 90 days ago, civil not yet initiated -> stalled
        $stalled = MhpSite::factory()->create(['cbo_id' => $cbo->id]);
        MhpAdminApproval::create(['mhp_site_id' => $stalled->id, 'eu_approval_date' => now()->subDays(120)]);

        // Approved recently, civil not initiated -> not stalled
        $recent = MhpSite::factory()->create(['cbo_id' => $cbo->id]);
        MhpAdminApproval::create(['mhp_site_id' => $recent->id, 'eu_approval_date' => now()->subDays(10)]);

        // Approved long ago but civil already initiated -> not stalled
        $progressing = MhpSite::factory()->create(['cbo_id' => $cbo->id, 'civil_work_initiation_date' => now()->subDays(5)]);
        MhpAdminApproval::create(['mhp_site_id' => $progressing->id, 'eu_approval_date' => now()->subDays(150)]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('mhp.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('stalled', 1)
                ->where('stalled.0.id', $stalled->id)
            );
    }

    public function test_index_flags_disbursement_mismatches(): void
    {
        District::create(['name' => 'Chitral Lower']);
        $cbo = Cbo::factory()->create(['district' => 'Chitral Lower', 'cbo_name' => 'Mismatch CBO']);

        // Physical 50%, financial 90% -> variance 40 (> 20 threshold) -> flagged
        $mismatched = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'civil_contractor_amount' => 1000,
            'civil_physical_progress_percent' => 50,
        ]);
        $mismatched->financialInstallments()->create([
            'payment_for' => 'Civil',
            'installment_number' => 9,
            'installment_date' => now(),
            'installment_amount' => 100000,
        ]);

        // Physical 50%, financial 60% -> variance 10 (<= 20 threshold) -> not flagged
        $onTrack = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'civil_contractor_amount' => 1000,
            'civil_physical_progress_percent' => 50,
        ]);
        $onTrack->financialInstallments()->create([
            'payment_for' => 'Civil',
            'installment_number' => 6,
            'installment_date' => now(),
            'installment_amount' => 100000,
        ]);

        $this->actingAs($this->actingAsAdmin())
            ->get(route('mhp.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('mismatches', 1)
                ->where('mismatches.0.id', $mismatched->id)
                ->where('mismatches.0.physical', 50)
                ->where('mismatches.0.financial', 90)
                ->where('mismatches.0.variance', 40)
            );
    }
}
