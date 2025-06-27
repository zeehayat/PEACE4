<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cbo;
use App\Models\CboDialogue;

class CboDialogueSeeder extends Seeder
{
    public function run(): void
    {
        Cbo::all()->each(function ($cbo) {
            CboDialogue::factory()->count(2)->create(['cbo_id' => $cbo->id]);
        });
    }
}
