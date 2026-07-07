<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserManagementGroupedPermissionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_index_shares_permissions_grouped_by_prefix(): void
    {
        Permission::create(['name' => 'user_manage', 'guard_name' => 'web']);
        Permission::create(['name' => 'user_view', 'guard_name' => 'web']);
        Permission::create(['name' => 'role_manage', 'guard_name' => 'web']);

        $adminRole = Role::create(['name' => 'Admin', 'guard_name' => 'web']);
        $adminRole->givePermissionTo(['user_manage', 'user_view', 'role_manage']);
        $admin = User::factory()->create();
        $admin->assignRole($adminRole);

        $response = $this->actingAs($admin)->get(route('admin.users.index'));

        $response->assertInertia(fn ($page) => $page
            ->has('groupedPermissions.user', 2)
            ->has('groupedPermissions.role', 1)
            ->where('groupedPermissions.user.0.name', 'user_manage')
        );
    }
}
