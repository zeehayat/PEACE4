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
}
