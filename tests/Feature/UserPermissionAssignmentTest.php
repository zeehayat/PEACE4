<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class UserPermissionAssignmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_creating_user_with_permissions_persists_them(): void
    {
        Permission::create(['name' => 'user_view', 'guard_name' => 'web']);
        Permission::create(['name' => 'user_manage', 'guard_name' => 'web']);

        $service = app(UserService::class);

        $user = $service->createUser([
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password',
            'roles' => [],
            'permissions' => ['user_view', 'user_manage'],
        ]);

        $this->assertTrue($user->fresh()->hasPermissionTo('user_view'));
        $this->assertTrue($user->fresh()->hasPermissionTo('user_manage'));
    }

    public function test_updating_user_permissions_still_persists_them(): void
    {
        Permission::create(['name' => 'user_view', 'guard_name' => 'web']);
        $user = User::factory()->create();

        $service = app(UserService::class);
        $service->updateUser($user, ['permissions' => ['user_view']]);

        $this->assertTrue($user->fresh()->hasPermissionTo('user_view'));
    }
}
