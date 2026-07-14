<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function actingAsRoot(): User
    {
        Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']);
        $user = User::factory()->create();
        $user->assignRole('Root');
        return $user;
    }

    public function test_update_changes_password_when_provided(): void
    {
        $admin = $this->actingAsRoot();
        $target = User::factory()->create();
        $originalHash = $target->password;

        $this->actingAs($admin)->put(route('admin.users.update', $target), [
            'name' => $target->name,
            'email' => $target->email,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ])->assertRedirect(route('admin.users.index'));

        $target->refresh();
        $this->assertNotSame($originalHash, $target->password);
        $this->assertTrue(Hash::check('newpassword123', $target->password));
    }

    public function test_update_preserves_password_when_left_blank(): void
    {
        $admin = $this->actingAsRoot();
        $target = User::factory()->create();
        $originalHash = $target->password;

        $this->actingAs($admin)->put(route('admin.users.update', $target), [
            'name' => $target->name,
            'email' => $target->email,
            'password' => '',
            'password_confirmation' => '',
        ])->assertRedirect(route('admin.users.index'));

        $target->refresh();
        $this->assertSame($originalHash, $target->password);
    }

    public function test_update_saves_denied_permissions(): void
    {
        \Spatie\Permission\Models\Permission::create(['name' => 'cbo_create', 'guard_name' => 'web']);
        \Spatie\Permission\Models\Role::create(['name' => 'M&E-HO', 'guard_name' => 'web'])
            ->givePermissionTo('cbo_create');

        $admin = $this->actingAsRoot();
        $target = User::factory()->create();
        $target->assignRole('M&E-HO');

        $this->actingAs($admin)->put(route('admin.users.update', $target), [
            'name' => $target->name,
            'email' => $target->email,
            'roles' => ['M&E-HO'],
            'denied_permissions' => ['cbo_create'],
        ])->assertRedirect(route('admin.users.index'));

        $target->refresh();
        $this->assertFalse($target->can('cbo_create'));
        $this->assertTrue($target->deniedPermissions->contains('name', 'cbo_create'));
    }

    public function test_update_rejects_permission_in_both_grant_and_deny_lists(): void
    {
        \Spatie\Permission\Models\Permission::create(['name' => 'cbo_create', 'guard_name' => 'web']);

        $admin = $this->actingAsRoot();
        $target = User::factory()->create();

        $this->actingAs($admin)->put(route('admin.users.update', $target), [
            'name' => $target->name,
            'email' => $target->email,
            'permissions' => ['cbo_create'],
            'denied_permissions' => ['cbo_create'],
        ])->assertSessionHasErrors();
    }

    public function test_shared_auth_can_prop_excludes_denied_permissions(): void
    {
        \Spatie\Permission\Models\Permission::create(['name' => 'cbo_create', 'guard_name' => 'web']);
        \Spatie\Permission\Models\Permission::create(['name' => 'mhp_site_view', 'guard_name' => 'web']);
        \Spatie\Permission\Models\Role::create(['name' => 'M&E-HO', 'guard_name' => 'web'])
            ->givePermissionTo(['cbo_create', 'mhp_site_view']);

        $user = User::factory()->create();
        $user->assignRole('M&E-HO');
        $user->deniedPermissions()->attach(\Spatie\Permission\Models\Permission::where('name', 'cbo_create')->first());

        $this->actingAs($user)
            ->get(route('mhp.overview'))
            ->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) => $page
                ->missing('auth.user.can.cbo_create')
            );
    }
}
