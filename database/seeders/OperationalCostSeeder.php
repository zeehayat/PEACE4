<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MhpSite;
use App\Models\OperationalCost;

class OperationalCostSeeder extends Seeder
{
    public function run(): void
    {
        MhpSite::all()->each(function ($site) {
            OperationalCost::factory()->count(3)->create([
                'mhp_site_id' => $site->id,
            ]);
        });
    }
}
