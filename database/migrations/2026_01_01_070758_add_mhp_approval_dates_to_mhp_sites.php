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
        Schema::table('mhp_sites', function (Blueprint $table) {
            $table->date('management_committee_date')->nullable();
            $table->date('opm_shared_date')->nullable();
            $table->date('opm_review_meeting_date')->nullable();
            $table->date('ta_eu_comments_date')->nullable();
            $table->date('eu_approval_meeting_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mhp_sites', function (Blueprint $table) {
            $table->dropColumn([
                'management_committee_date',
                'opm_shared_date',
                'opm_review_meeting_date',
                'ta_eu_comments_date',
                'eu_approval_meeting_date',
            ]);
        });
    }
};
