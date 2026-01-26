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
            $table->decimal('additional_area_covered', 15, 2)->nullable()->after('land_area_hectares');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irrigation_scheme_profiles', function (Blueprint $table) {
            $table->dropColumn('additional_area_covered');
        });
    }
};
