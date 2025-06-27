<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attachment;
use App\Models\Cbo;
use App\Models\MhpSite;

class AttachmentSeeder extends Seeder
{
    public function run(): void
    {
        // Attach to CBOs
        Cbo::all()->each(function ($cbo) {
            Attachment::factory()->count(2)->create([
                'attachable_id' => $cbo->id,
                'attachable_type' => get_class($cbo),
            ]);
        });

        // Attach to MHP Sites
        MhpSite::all()->each(function ($site) {
            Attachment::factory()->count(2)->create([
                'attachable_id' => $site->id,
                'attachable_type' => get_class($site),
            ]);
        });
    }
}
