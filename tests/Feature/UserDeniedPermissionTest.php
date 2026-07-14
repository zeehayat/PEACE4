<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserDeniedPermissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_denied_permission_overrides_role_grant(): void
    {
        Permission::create(['name' => 'cbo_create', 'guard_name' => 'web']);
        Role::create(['name' => 'M&E-HO', 'guard_name' => 'web'])
            ->givePermissionTo('cbo_create');

        $user = User::factory()->create();
        $user->assignRole('M&E-HO');

        $this->assertTrue($user->can('cbo_create'));

        $user->deniedPermissions()->attach(Permission::where('name', 'cbo_create')->first());
        $user->refresh();

        $this->assertFalse($user->can('cbo_create'));
    }

    public function test_denied_permission_overrides_direct_grant(): void
    {
        $permission = Permission::create(['name' => 'cbo_delete', 'guard_name' => 'web']);
        $user = User::factory()->create();
        $user->givePermissionTo('cbo_delete');

        $this->assertTrue($user->can('cbo_delete'));

        $user->deniedPermissions()->attach($permission);
        $user->refresh();

        $this->assertFalse($user->can('cbo_delete'));
    }

    public function test_other_role_permissions_unaffected_by_unrelated_denial(): void
    {
        Permission::create(['name' => 'cbo_create', 'guard_name' => 'web']);
        Permission::create(['name' => 'cbo_view', 'guard_name' => 'web']);
        Role::create(['name' => 'M&E-HO', 'guard_name' => 'web'])
            ->givePermissionTo(['cbo_create', 'cbo_view']);

        $user = User::factory()->create();
        $user->assignRole('M&E-HO');
        $user->deniedPermissions()->attach(Permission::where('name', 'cbo_create')->first());
        $user->refresh();

        $this->assertFalse($user->can('cbo_create'));
        $this->assertTrue($user->can('cbo_view'));
    }

    public function test_get_effective_permission_names_excludes_denied(): void
    {
        Permission::create(['name' => 'cbo_create', 'guard_name' => 'web']);
        Permission::create(['name' => 'cbo_view', 'guard_name' => 'web']);
        Role::create(['name' => 'M&E-HO', 'guard_name' => 'web'])
            ->givePermissionTo(['cbo_create', 'cbo_view']);

        $user = User::factory()->create();
        $user->assignRole('M&E-HO');
        $user->deniedPermissions()->attach(Permission::where('name', 'cbo_create')->first());
        $user->refresh();

        $effective = $user->getEffectivePermissionNames();
        $this->assertFalse($effective->contains('cbo_create'));
        $this->assertTrue($effective->contains('cbo_view'));
    }

    public function test_user_with_no_denials_behaves_as_before(): void
    {
        Permission::create(['name' => 'cbo_view', 'guard_name' => 'web']);
        $user = User::factory()->create();
        $user->givePermissionTo('cbo_view');

        $this->assertTrue($user->can('cbo_view'));
        $this->assertTrue($user->getEffectivePermissionNames()->contains('cbo_view'));
    }
}
