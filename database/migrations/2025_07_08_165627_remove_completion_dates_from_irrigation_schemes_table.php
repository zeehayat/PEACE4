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
        Schema::table('irrigation_schemes', function (Blueprint $table) {
            $table->dropColumn(['date_completion_civil_works', 'handover_to_community_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irrigation_schemes', function (Blueprint $table) {
            // Re-add them if rolling back, assuming nullable as per previous state
            $table->date('date_completion_civil_works')->nullable();
            $table->date('handover_to_community_date')->nullable();
        });
    }
};
