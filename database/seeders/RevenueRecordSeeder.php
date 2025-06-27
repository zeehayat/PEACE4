<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MhpSite;
use App\Models\RevenueRecord;

class RevenueRecordSeeder extends Seeder
{
    public function run(): void
    {
        MhpSite::all()->each(function ($site) {
            RevenueRecord::factory()->count(3)->create([
                'mhp_site_id' => $site->id,
            ]);
        });
    }
}
