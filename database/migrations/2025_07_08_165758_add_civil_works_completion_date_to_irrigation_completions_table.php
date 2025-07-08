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
        Schema::table('irrigation_completions', function (Blueprint $table) {
            // Rename existing 'handover_date' for clarity and to avoid conflict with CSV's 'Handing over Scheme to Community for O&M'
            $table->renameColumn('handover_date', 'scheme_handover_date');

            // New fields being moved/added
            $table->date('date_completion_civil_works')->nullable()->after('scheme_handover_date'); // "Date of Completion Civil Works" from CSV
            $table->date('handover_to_community_date')->nullable()->after('date_completion_civil_works'); // "Handing over Scheme to Community for O&M" from CSV
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irrigation_completions', function (Blueprint $table) {
            $table->dropColumn(['date_completion_civil_works', 'handover_to_community_date']);
            // Revert the column rename if rolling back
            $table->renameColumn('scheme_handover_date', 'handover_date');
        });
    }
};
