<?php

namespace Tests\Feature;

use App\Models\Cbo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class DistrictValidationTest extends TestCase
{
    use RefreshDatabase;

    private function rootUser(): User
    {
        $user = User::factory()->create();
        $user->assignRole(Role::firstOrCreate(['name' => 'Root', 'guard_name' => 'web']));
        return $user;
    }

    private function validCboPayload(array $overrides = []): array
    {
        return array_merge([
            'reference_code' => 'CBO-TEST-001',
            'cbo_name' => 'Test CBO',
            'region' => 'Test Region',
            'district' => 'Swat',
            'tehsil' => 'Test Tehsil',
            'village_council' => 'Test VC',
            'village' => 'Test Village',
            'date_of_formation' => '2026-01-01',
            'total_members' => 10,
            'gender' => 'Mixed',
            'num_cbo_members' => 10,
            'president_name' => 'President',
            'president_contact' => '0300...',
            'secretary_name' => 'Secretary',
            'secretary_contact' => '0300...',
        ], $overrides);
    }

    public function test_cbo_store_rejects_a_district_not_in_the_table(): void
    {
        $this->seed(\Database\Seeders\DistrictSeeder::class);
        $user = $this->rootUser();

        $response = $this->actingAs($user)->post(
            route('cbo.cbos.store'),
            $this->validCboPayload(['district' => 'Not A Real District'])
        );

        $response->assertSessionHasErrors('district');
        $this->assertDatabaseMissing('cbos', ['reference_code' => 'CBO-TEST-001']);
    }

    public function test_cbo_store_accepts_a_real_district(): void
    {
        $this->seed(\Database\Seeders\DistrictSeeder::class);
        $user = $this->rootUser();

        $response = $this->actingAs($user)->post(
            route('cbo.cbos.store'),
            $this->validCboPayload()
        );

        $response->assertSessionDoesntHaveErrors('district');
        $this->assertDatabaseHas('cbos', ['reference_code' => 'CBO-TEST-001', 'district' => 'Swat']);
    }

    public function test_cro_store_rejects_a_district_not_in_the_table(): void
    {
        $this->seed(\Database\Seeders\DistrictSeeder::class);
        $user = $this->rootUser();

        $response = $this->actingAs($user)->post(route('cro.cros.store'), [
            'district' => 'Not A Real District',
            'tehsil' => 'Test',
            'village_council' => 'Test',
            'village' => 'Test',
            'cro_name' => 'Test CRO',
        ]);

        $response->assertSessionHasErrors('district');
    }
}
