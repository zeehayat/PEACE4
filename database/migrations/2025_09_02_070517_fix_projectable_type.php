<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update any records that were incorrectly saved with the FQCN to the correct morph map alias.
        // This makes existing data consistent with the application's standard.
        DB::table('project_physical_progresses')
            ->where('projectable_type', 'App\Models\MhpSite')
            ->update(['projectable_type' => 'mhp_site']);

        DB::table('project_physical_progresses')
            ->where('projectable_type', 'App\Models\IrrigationScheme')
            ->update(['projectable_type' => 'irrigation_scheme']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // This is a data cleanup migration. The 'down' method can revert the aliases
        // back to the FQCN if necessary, but in a correctly functioning application
        // post-refactor, this would not be desired. This is provided for rollback completeness.
        DB::table('project_physical_progresses')
            ->where('projectable_type', 'mhp_site')
            ->update(['projectable_type' => 'App\Models\MhpSite']);

        DB::table('project_physical_progresses')
            ->where('projectable_type', 'irrigation_scheme')
            ->update(['projectable_type' => 'App\Models\IrrigationScheme']);
    }
};
