<?php

namespace Tests\Feature;

use App\Models\LrmCommittee;
use App\Models\LrmNrmAchievement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class LrmReportTest extends TestCase
{
    use RefreshDatabase;

    private function authorizedUser(): User
    {
        $user = User::factory()->create();
        $user->assignRole(Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']));
        return $user;
    }

    public function test_report_index_shows_targets_and_summed_achievements_per_committee(): void
    {
        $committee = LrmCommittee::factory()->create([
            'target_forest_plants_count' => 2100,
        ]);
        LrmNrmAchievement::create(['lrm_committee_id' => $committee->id, 'date' => '2026-05-01', 'achieved_forest_plants_count' => 1000]);
        LrmNrmAchievement::create(['lrm_committee_id' => $committee->id, 'date' => '2026-06-01', 'achieved_forest_plants_count' => 1100]);

        $response = $this->actingAs($this->authorizedUser())->get(route('lrm.report.index'));

        $response->assertInertia(fn ($page) => $page
            ->where('rows.0.target_forest_plants_count', 2100)
            ->where('rows.0.achieved_forest_plants_count', 2100)
        );
    }

    public function test_report_supports_district_filter(): void
    {
        $shangla = LrmCommittee::factory()->create();
        $shangla->cbo->update(['district' => 'Shangla']);
        $swat = LrmCommittee::factory()->create();
        $swat->cbo->update(['district' => 'Swat']);

        $response = $this->actingAs($this->authorizedUser())->get(route('lrm.report.index', ['district' => 'Shangla']));

        $response->assertInertia(fn ($page) => $page->has('rows', 1));
    }

    public function test_export_streams_csv(): void
    {
        LrmCommittee::factory()->create();

        $response = $this->actingAs($this->authorizedUser())->get(route('lrm.report.export'));

        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
    }
}
