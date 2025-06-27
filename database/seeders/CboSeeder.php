<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cbo;

class CboSeeder extends Seeder
{
    public function run(): void
    {
        Cbo::factory()->count(10)->create();
    }
}
