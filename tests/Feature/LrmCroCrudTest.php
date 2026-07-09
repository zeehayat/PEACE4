<?php

namespace Tests\Feature;

use App\Models\LrmCommittee;
use App\Models\LrmCro;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class LrmCroCrudTest extends TestCase
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

    public function test_lrm_committee_has_many_cros(): void
    {
        $committee = LrmCommittee::factory()->create();
        $cro = LrmCro::create([
            'lrm_committee_id' => $committee->id,
            'name' => 'CRO Krakal',
            'village' => 'Krakal Bumburet',
            'type' => 'Mixed',
            'male_members' => 12,
            'female_members' => 8,
            'total_members' => 20,
            'president_name' => 'Rehmat Shakeel',
            'president_contact' => '0316...',
            'secretary_name' => 'Gul Ran',
            'secretary_contact' => '0345...',
        ]);

        $this->assertTrue($cro->lrmCommittee->is($committee));
        $this->assertCount(1, $committee->fresh()->lrmCros);
        $this->assertSame(20, $cro->fresh()->total_members);
    }

    public function test_deleting_committee_cascades_to_its_cros(): void
    {
        $committee = LrmCommittee::factory()->create();
        LrmCro::create(['lrm_committee_id' => $committee->id, 'name' => 'CRO Test']);

        $committee->delete();

        $this->assertDatabaseCount('lrm_cros', 0);
    }

    public function test_authorized_user_can_create_a_cro_for_a_committee(): void
    {
        $committee = LrmCommittee::factory()->create();
        $user = $this->userWithPermission('lrm_cro_create');

        $response = $this->actingAs($user)->post(
            route('lrm.committees.cros.store', $committee->id),
            ['name' => 'CRO Karshat', 'village' => 'Karshat', 'total_members' => 17]
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('lrm_cros', ['lrm_committee_id' => $committee->id, 'name' => 'CRO Karshat']);
    }

    public function test_unauthorized_user_cannot_create_a_cro(): void
    {
        $committee = LrmCommittee::factory()->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(
            route('lrm.committees.cros.store', $committee->id),
            ['name' => 'CRO Test']
        );

        $response->assertForbidden();
        $this->assertDatabaseCount('lrm_cros', 0);
    }

    public function test_authorized_user_can_update_a_cro(): void
    {
        $committee = LrmCommittee::factory()->create();
        $cro = LrmCro::create(['lrm_committee_id' => $committee->id, 'name' => 'CRO Old Name']);
        $user = $this->userWithPermission('lrm_cro_update');

        $response = $this->actingAs($user)->put(
            route('lrm.committees.cros.update', [$committee->id, $cro->id]),
            ['name' => 'CRO New Name']
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('lrm_cros', ['id' => $cro->id, 'name' => 'CRO New Name']);
    }

    public function test_authorized_user_can_delete_a_cro(): void
    {
        $committee = LrmCommittee::factory()->create();
        $cro = LrmCro::create(['lrm_committee_id' => $committee->id, 'name' => 'CRO Test']);
        $user = $this->userWithPermission('lrm_cro_delete');

        $response = $this->actingAs($user)->delete(
            route('lrm.committees.cros.destroy', [$committee->id, $cro->id])
        );

        $response->assertRedirect();
        $this->assertDatabaseCount('lrm_cros', 0);
    }
}
