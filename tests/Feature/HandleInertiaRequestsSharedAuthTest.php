<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class HandleInertiaRequestsSharedAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_request_shares_real_user_id_name_email(): void
    {
        $user = User::factory()->create(['name' => 'Jane Doe', 'email' => 'jane@example.com']);

        $response = $this->actingAs($user)->followingRedirects()->get(route('dashboard'));

        $response->assertInertia(fn ($page) => $page
            ->where('auth.user.id', $user->id)
            ->where('auth.user.name', 'Jane Doe')
            ->where('auth.user.email', 'jane@example.com')
        );
    }

    public function test_authenticated_request_shares_actual_permissions_not_hardcoded(): void
    {
        $user = User::factory()->create();
        Permission::create(['name' => 'role_manage', 'guard_name' => 'web']);
        Permission::create(['name' => 'view_reports', 'guard_name' => 'web']);
        $role = Role::create(['name' => 'Test Role', 'guard_name' => 'web']);
        $role->givePermissionTo('role_manage');
        $user->assignRole($role);

        $response = $this->actingAs($user)->followingRedirects()->get(route('dashboard'));

        $response->assertInertia(fn ($page) => $page
            ->where('auth.user.can.role_manage', true)
            ->where('auth.user.roles', ['Test Role'])
            ->missing('auth.user.can.view_reports')
        );
    }

    public function test_guest_request_shares_null_user(): void
    {
        $response = $this->get(route('login'));

        $response->assertInertia(fn ($page) => $page->where('auth.user', null));
    }
}
