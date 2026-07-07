<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleManagementAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    private function makeAdminRoleUser(bool $withRoleManage): User
    {
        $user = User::factory()->create();
        Permission::firstOrCreate(['name' => 'role_manage', 'guard_name' => 'web']);
        $adminRole = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        if ($withRoleManage) {
            $adminRole->givePermissionTo('role_manage');
        }
        $user->assignRole($adminRole);
        return $user;
    }

    public function test_user_without_role_manage_permission_cannot_create_role(): void
    {
        $user = $this->makeAdminRoleUser(withRoleManage: false);

        $response = $this->actingAs($user)->post(route('admin.roles.store'), [
            'name' => 'New Role',
            'permissions' => [],
        ]);

        $response->assertForbidden();
        $this->assertDatabaseMissing('roles', ['name' => 'New Role']);
    }

    public function test_user_with_role_manage_permission_can_create_role(): void
    {
        $user = $this->makeAdminRoleUser(withRoleManage: true);

        $response = $this->actingAs($user)->post(route('admin.roles.store'), [
            'name' => 'New Role',
            'permissions' => [],
        ]);

        $response->assertRedirect(route('admin.roles.index'));
        $this->assertDatabaseHas('roles', ['name' => 'New Role']);
    }
}
