<?php

namespace Tests\Feature;

use App\Models\District;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class CboDistrictFieldTest extends TestCase
{
    use RefreshDatabase;

    public function test_cbo_index_shares_districts_from_the_table(): void
    {
        $this->seed(\Database\Seeders\DistrictSeeder::class);
        $user = User::factory()->create();
        $user->assignRole(Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']));

        $response = $this->actingAs($user)->get(route('cbo.cbos.index'));

        $response->assertInertia(fn ($page) => $page
            ->has('districts', 9)
            ->where('districts.0.name', District::orderBy('name')->first()->name)
        );
    }
}
