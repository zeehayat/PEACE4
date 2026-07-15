<?php

namespace Tests\Feature;

use App\Models\ActivityLog;
use App\Models\Cbo;
use App\Models\District;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ForbiddenPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_policy_denial_renders_forbidden_page_and_logs_it(): void
    {
        $district = District::create(['name' => 'Swat']);
        $user = User::factory()->create(['name' => 'Jane Doe', 'district_id' => $district->id]);
        // No permissions at all - will be denied by CboPolicy::create().

        $response = $this->actingAs($user)->get(route('cbo.cbos.create'));

        $response->assertStatus(403);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Errors/Forbidden')
            ->where('userName', 'Jane Doe')
        );

        $this->assertDatabaseHas('activity_logs', [
            'user_id' => $user->id,
        ]);
        $log = ActivityLog::where('user_id', $user->id)->latest('id')->first();
        $this->assertSame(403, $log->meta['status']);
        $this->assertSame('authorization_denied', $log->meta['type']);
    }
}
