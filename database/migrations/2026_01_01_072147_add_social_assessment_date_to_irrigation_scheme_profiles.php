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
        Schema::table('irrigation_scheme_profiles', function (Blueprint $table) {
            $table->date('social_assessment_date')->nullable()->after('date_technical_surveys');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irrigation_scheme_profiles', function (Blueprint $table) {
            $table->dropColumn('social_assessment_date');
        });
    }
};
