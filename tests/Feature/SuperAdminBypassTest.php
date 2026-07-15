<?php

namespace Tests\Feature;

use App\Models\Cbo;
use App\Models\District;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class SuperAdminBypassTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_bypasses_cbo_policy_without_explicit_permission(): void
    {
        Role::create(['name' => 'Super Admin', 'guard_name' => 'web']);
        // Deliberately grant NO permissions to this role — proving the bypass
        // comes from before(), not from an underlying permission grant.

        $district = District::create(['name' => 'Swat']);
        $user = User::factory()->create(['district_id' => $district->id]);
        $user->assignRole('Super Admin');

        $cbo = Cbo::factory()->create(['district' => 'Swat']);

        $this->assertTrue($user->can('create', Cbo::class));
        $this->assertTrue($user->can('update', $cbo));
        $this->assertTrue($user->can('delete', $cbo));
    }

    public function test_regular_user_without_permission_is_still_blocked(): void
    {
        $district = District::create(['name' => 'Swat']);
        $user = User::factory()->create(['district_id' => $district->id]);
        // No role, no permissions at all.

        $cbo = Cbo::factory()->create(['district' => 'Swat']);

        $this->assertFalse($user->can('create', Cbo::class));
        $this->assertFalse($user->can('update', $cbo));
    }
}
