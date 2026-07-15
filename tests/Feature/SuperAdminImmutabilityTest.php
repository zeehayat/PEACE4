<?php

namespace Tests\Feature;

use App\Models\District;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class SuperAdminImmutabilityTest extends TestCase
{
    use RefreshDatabase;

    protected function makeSuperAdminRole(): Role
    {
        return Role::create(['name' => 'Super Admin', 'guard_name' => 'web']);
    }

    public function test_role_controller_update_rejects_super_admin_role_changes(): void
    {
        Permission::create(['name' => 'role_manage', 'guard_name' => 'web']);
        $role = $this->makeSuperAdminRole();
        $originalName = $role->name;

        // The admin.roles.* routes carry route-level `role:Admin|Root`
        // middleware (Spatie's RoleMiddleware), which is a raw role check
        // that runs before the controller/policy layer and is independent
        // of the `role_manage` permission. The actor needs the Admin role
        // to reach the controller at all, matching how the rest of this
        // codebase's admin-route tests are set up (see
        // UserControllerTest::actingAsRoot()).
        Role::create(['name' => 'Admin', 'guard_name' => 'web']);
        $admin = User::factory()->create();
        $admin->assignRole('Admin');
        $admin->givePermissionTo('role_manage');

        $this->actingAs($admin)->put(route('admin.roles.update', $role), [
            'name' => 'Renamed Role',
            'permissions' => [],
        ])->assertRedirect(route('admin.roles.index'));

        $role->refresh();
        $this->assertSame($originalName, $role->name);
    }

    public function test_non_super_admin_cannot_delete_a_super_admin_user(): void
    {
        $this->makeSuperAdminRole();
        $district = District::create(['name' => 'Swat']);

        // Grant Admin so the request reaches UserPolicy::delete() and the
        // assertion below exercises the new Super-Admin check itself,
        // rather than being (incidentally) blocked earlier by the
        // route-level `role:Admin|Root` middleware on admin.users.*.
        Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $actor = User::factory()->create(['district_id' => $district->id]);
        $actor->assignRole('Admin');
        $actor->givePermissionTo(Permission::create(['name' => 'user_manage', 'guard_name' => 'web']));

        $target = User::factory()->create(['district_id' => $district->id]);
        $target->assignRole('Super Admin');

        $this->actingAs($actor)
            ->delete(route('admin.users.destroy', $target))
            ->assertForbidden();

        $this->assertNotNull($target->fresh());
    }

    public function test_super_admin_can_delete_another_super_admin_user(): void
    {
        $this->makeSuperAdminRole();
        $district = District::create(['name' => 'Swat']);

        // As above, admin.users.* routes require the Admin or Root role via
        // route-level middleware, independent of the policy-level
        // Super-Admin bypass. Grant Admin in addition to Super Admin so the
        // request reaches UserPolicy::delete() and genuinely exercises the
        // new Super-Admin check (rather than trivially passing via a Root
        // role, which would already bypass everything through before()).
        Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $actor = User::factory()->create(['district_id' => $district->id]);
        $actor->assignRole(['Super Admin', 'Admin']);

        $target = User::factory()->create(['district_id' => $district->id]);
        $target->assignRole('Super Admin');

        $this->actingAs($actor)
            ->delete(route('admin.users.destroy', $target))
            ->assertRedirect(route('admin.users.index'));

        $this->assertNull($target->fresh());
    }

    public function test_seeder_creates_super_admin_account(): void
    {
        $this->artisan('db:seed', ['--class' => 'RolesAndPermissionsSeeder']);

        $user = User::where('email', 'superadmin@example.com')->first();
        $this->assertNotNull($user);
        $this->assertTrue($user->hasRole('Super Admin'));
    }
}
