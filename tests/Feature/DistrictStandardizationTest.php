<?php

namespace Tests\Feature;

use App\Models\District;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class DistrictStandardizationTest extends TestCase
{
    use RefreshDatabase;

    private function seededDistrictNames(): array
    {
        $this->seed(\Database\Seeders\DistrictSeeder::class);
        return District::orderBy('name')->pluck('name')->all();
    }

    public function test_district_seeder_produces_the_corrected_canonical_list(): void
    {
        $names = $this->seededDistrictNames();

        $this->assertContains('Shangla', $names);
        $this->assertContains('Dir Upper', $names);
        $this->assertContains('Dir Lower', $names);
        $this->assertContains('Chitral Upper', $names);
        $this->assertContains('Chitral Lower', $names);
        $this->assertNotContains('Chitral', $names);
        $this->assertNotContains('Dir', $names);
        $this->assertCount(9, $names);
    }

    public function test_district_seeder_is_idempotent_and_removes_stale_rows(): void
    {
        District::create(['name' => 'Chitral']);
        District::create(['name' => 'Dir']);

        $this->seed(\Database\Seeders\DistrictSeeder::class);

        $this->assertDatabaseMissing('districts', ['name' => 'Chitral']);
        $this->assertDatabaseMissing('districts', ['name' => 'Dir']);
        $this->assertDatabaseHas('districts', ['name' => 'Shangla']);
    }

    public function test_cro_create_page_sources_districts_from_the_table_not_the_enum(): void
    {
        $this->seed(\Database\Seeders\DistrictSeeder::class);
        $user = User::factory()->create();
        $user->assignRole(Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']));

        $response = $this->actingAs($user)->get(route('cro.cros.create'));

        $response->assertInertia(fn ($page) => $page
            ->has('districts', 9)
            ->where('districts.0.name', District::orderBy('name')->first()->name)
        );
    }
}
