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
            $table->date('month_year_establishment')->nullable()->after('id')->nullable();

            // 'established_by' remains a string
            $table->string('established_by')->nullable()->after('month_year_establishment')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mhp_sites', function (Blueprint $table) {
            $table->dropColumn('month_year_establishment');
            $table->dropColumn('established_by');
        });
    }
};
