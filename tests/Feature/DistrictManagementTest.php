<?php

namespace Tests\Feature;

use App\Models\District;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class DistrictManagementTest extends TestCase
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

    public function test_authorized_user_can_view_the_districts_page(): void
    {
        $this->seed(\Database\Seeders\DistrictSeeder::class);
        $user = $this->userWithPermission('district_manage');

        $response = $this->actingAs($user)->get(route('admin.districts.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->has('districts', 9));
    }

    public function test_authorized_user_can_add_a_district(): void
    {
        $user = $this->userWithPermission('district_manage');

        $response = $this->actingAs($user)->post(route('admin.districts.store'), [
            'name' => 'Buner',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('districts', ['name' => 'Buner']);
    }

    public function test_duplicate_district_name_is_rejected(): void
    {
        District::create(['name' => 'Buner']);
        $user = $this->userWithPermission('district_manage');

        $response = $this->actingAs($user)->post(route('admin.districts.store'), [
            'name' => 'Buner',
        ]);

        $response->assertSessionHasErrors('name');
        $this->assertDatabaseCount('districts', 1);
    }

    public function test_user_without_permission_cannot_add_a_district(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('admin.districts.store'), [
            'name' => 'Buner',
        ]);

        $response->assertForbidden();
        $this->assertDatabaseMissing('districts', ['name' => 'Buner']);
    }
}
