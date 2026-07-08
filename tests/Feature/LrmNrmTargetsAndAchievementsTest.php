<?php

namespace Tests\Feature;

use App\Models\LrmCommittee;
use App\Models\LrmNrmAchievement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LrmNrmTargetsAndAchievementsTest extends TestCase
{
    use RefreshDatabase;

    public function test_lrm_committee_has_nullable_target_columns_with_correct_defaults(): void
    {
        $committee = LrmCommittee::factory()->create();

        $this->assertNull($committee->target_forest_area_value);
        $this->assertSame('Kanal', $committee->target_forest_area_unit);
        $this->assertSame('Kanal', $committee->target_fruit_area_unit);
        $this->assertSame('CFT', $committee->target_check_dams_unit);
        $this->assertSame('Sft', $committee->target_greenbelt_lawn_unit);
    }

    public function test_lrm_committee_target_fields_are_fillable(): void
    {
        $committee = LrmCommittee::factory()->create([
            'target_forest_area_value' => 40,
            'target_forest_plants_count' => 2100,
            'target_drr_training_persons' => 20,
            'target_check_dams_value' => 19035,
            'target_pest_control_training_persons' => 20,
            'target_pest_control_kits' => 20,
        ]);

        $this->assertEquals(40, $committee->fresh()->target_forest_area_value);
        $this->assertEquals(2100, $committee->fresh()->target_forest_plants_count);
        $this->assertEquals(20, $committee->fresh()->target_pest_control_training_persons);
    }

    public function test_achievement_belongs_to_committee_and_committee_has_many_achievements(): void
    {
        $committee = LrmCommittee::factory()->create();

        $achievement = LrmNrmAchievement::create([
            'lrm_committee_id' => $committee->id,
            'date' => '2026-06-30',
            'achieved_forest_area_value' => 42,
            'achieved_forest_plants_count' => 2100,
            'achieved_pest_control_training_persons' => 0,
            'achieved_pest_control_kits' => 0,
        ]);

        $this->assertTrue($achievement->lrmCommittee->is($committee));
        $this->assertCount(1, $committee->fresh()->lrmNrmAchievements);
        $this->assertSame('Kanal', $achievement->achieved_forest_area_unit);
        $this->assertSame('CFT', $achievement->achieved_check_dams_unit);
    }

    public function test_deleting_committee_cascades_to_its_achievements(): void
    {
        $committee = LrmCommittee::factory()->create();
        LrmNrmAchievement::create(['lrm_committee_id' => $committee->id, 'date' => '2026-06-30']);

        $committee->delete();

        $this->assertDatabaseCount('lrm_nrm_achievements', 0);
    }

    public function test_district_role_user_can_view_committee_in_their_own_district(): void
    {
        $committee = LrmCommittee::factory()->create();
        $committee->cbo->update(['district' => 'Shangla']);

        $district = \App\Models\District::create(['name' => 'Shangla']);
        $user = User::factory()->create(['district_id' => $district->id]);
        $user->assignRole(\Spatie\Permission\Models\Role::firstOrCreate(['name' => 'M&E-DISTRICT', 'guard_name' => 'web']));
        \Spatie\Permission\Models\Permission::firstOrCreate(['name' => 'lrm_committee_view', 'guard_name' => 'web']);
        $user->givePermissionTo('lrm_committee_view');

        $this->assertTrue($user->can('view', $committee->fresh()));
    }

    public function test_district_role_user_cannot_view_committee_in_a_different_district(): void
    {
        $committee = LrmCommittee::factory()->create();
        $committee->cbo->update(['district' => 'Swat']);

        $district = \App\Models\District::create(['name' => 'Shangla']);
        $user = User::factory()->create(['district_id' => $district->id]);
        $user->assignRole(\Spatie\Permission\Models\Role::firstOrCreate(['name' => 'M&E-DISTRICT', 'guard_name' => 'web']));
        \Spatie\Permission\Models\Permission::firstOrCreate(['name' => 'lrm_committee_view', 'guard_name' => 'web']);
        $user->givePermissionTo('lrm_committee_view');

        $this->assertFalse($user->can('view', $committee->fresh()));
    }
}
