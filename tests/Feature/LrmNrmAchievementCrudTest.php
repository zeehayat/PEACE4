<?php

namespace Tests\Feature;

use App\Models\LrmCommittee;
use App\Models\LrmNrmAchievement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class LrmNrmAchievementCrudTest extends TestCase
{
    use RefreshDatabase;

    private function userWithPermission(string $permission): User
    {
        Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        $role = Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']);
        $user = User::factory()->create();
        $user->assignRole($role);
        return $user;
    }

    public function test_authorized_user_can_create_an_achievement_for_a_committee(): void
    {
        $committee = LrmCommittee::factory()->create();
        $user = $this->userWithPermission('lrm_nrm_achievement_create');

        $response = $this->actingAs($user)->post(
            route('lrm.committees.achievements.store', $committee->id),
            [
                'date' => '2026-06-30',
                'achieved_forest_area_value' => 42,
                'achieved_forest_plants_count' => 2100,
                'achieved_pest_control_training_persons' => 0,
                'achieved_pest_control_kits' => 0,
            ]
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('lrm_nrm_achievements', [
            'lrm_committee_id' => $committee->id,
            'achieved_forest_plants_count' => 2100,
        ]);
    }

    public function test_unauthorized_user_cannot_create_an_achievement(): void
    {
        $committee = LrmCommittee::factory()->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(
            route('lrm.committees.achievements.store', $committee->id),
            ['date' => '2026-06-30']
        );

        $response->assertForbidden();
        $this->assertDatabaseCount('lrm_nrm_achievements', 0);
    }

    public function test_authorized_user_can_update_an_achievement(): void
    {
        $committee = LrmCommittee::factory()->create();
        $achievement = LrmNrmAchievement::create(['lrm_committee_id' => $committee->id, 'date' => '2026-06-30']);
        $user = $this->userWithPermission('lrm_nrm_achievement_update');

        $response = $this->actingAs($user)->put(
            route('lrm.committees.achievements.update', [$committee->id, $achievement->id]),
            ['date' => '2026-07-01', 'achieved_forest_plants_count' => 500]
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('lrm_nrm_achievements', ['id' => $achievement->id, 'achieved_forest_plants_count' => 500]);
    }

    public function test_authorized_user_can_delete_an_achievement(): void
    {
        $committee = LrmCommittee::factory()->create();
        $achievement = LrmNrmAchievement::create(['lrm_committee_id' => $committee->id, 'date' => '2026-06-30']);
        $user = $this->userWithPermission('lrm_nrm_achievement_delete');

        $response = $this->actingAs($user)->delete(
            route('lrm.committees.achievements.destroy', [$committee->id, $achievement->id])
        );

        $response->assertRedirect();
        $this->assertDatabaseCount('lrm_nrm_achievements', 0);
    }

    public function test_lrm_routes_require_authentication(): void
    {
        $response = $this->get(route('lrm.committees.index'));
        $response->assertRedirect(route('login'));
    }
}
