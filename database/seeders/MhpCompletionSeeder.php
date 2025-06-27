<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MhpSite;
use App\Models\MhpCompletion;

class MhpCompletionSeeder extends Seeder
{
    public function run(): void
    {
        MhpSite::all()->each(function ($site) {
            MhpCompletion::factory()->create([
                'mhp_site_id' => $site->id,
            ]);
        });
    }
}
