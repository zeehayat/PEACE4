<?php

namespace Tests\Feature;

use App\Models\Cbo;
use App\Models\District;
use App\Models\MhpAdminApproval;
use App\Models\MhpCompletion;
use App\Models\MhpSite;
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
            'layout_initiation_date' => now(),
        ]);

        // Prioritized + design + approved
        $approved = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'planned_capacity_kw' => 300,
            'layout_initiation_date' => now(),
        ]);
        MhpAdminApproval::create(['mhp_site_id' => $approved->id, 'eu_approval_date' => now()]);

        // Prioritized + design + approved + civil initiated
        $civil = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'planned_capacity_kw' => 400,
            'layout_initiation_date' => now(),
            'civil_work_initiation_date' => now(),
        ]);
        MhpAdminApproval::create(['mhp_site_id' => $civil->id, 'eu_approval_date' => now()]);

        // Prioritized + design + approved + civil + completed
        $completed = MhpSite::factory()->create([
            'cbo_id' => $cbo->id,
            'planned_capacity_kw' => 500,
            'layout_initiation_date' => now(),
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

        MhpSite::factory()->create(['cbo_id' => $cboA->id, 'status' => 'New', 'layout_initiation_date' => now()]);
        MhpSite::factory()->create(['cbo_id' => $cboA->id, 'status' => 'Rehabilitation', 'layout_initiation_date' => now()]);
        MhpSite::factory()->create(['cbo_id' => $cboB->id, 'status' => 'New']); // no layout_initiation_date -> excluded from type breakdown

        $this->actingAs($this->actingAsAdmin())
            ->get(route('mhp.overview'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('chart_mobilization.labels', 2)
                ->where('chart_type_breakdown.labels', ['New', 'Rehabilitation'])
                ->where('chart_type_breakdown.counts', [1, 1])
            );
    }
}
