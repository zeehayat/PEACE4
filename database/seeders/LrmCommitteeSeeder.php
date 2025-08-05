<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LrmCommittee;
use App\Models\Cbo;

class LrmCommitteeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create LRM Committees linked to CBOs
        LrmCommittee::factory()->count(10)->create();
    }
}
