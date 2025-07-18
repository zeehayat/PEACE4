<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('project_physical_progresses', function (Blueprint $table) {
            $table->index(['projectable_id', 'projectable_type'], 'phy_prog_proj_idx');
            $table->index(['activity_id', 'activity_type'], 'phy_prog_act_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_physical_progresses', function (Blueprint $table) {
            //
        });
    }
};
