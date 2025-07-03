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
            $table->date('tentative_completion_date')->nullable()->after('cost_per_capita');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mhp_sites', function (Blueprint $table) {
            $table->dropColumn('tentative_completion_date');

        });
    }
};
