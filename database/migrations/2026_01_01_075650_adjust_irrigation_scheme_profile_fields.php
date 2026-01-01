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
            $table->dropColumn(['area_irrigated_before_rehab_hectares', 'area_irrigated_after_rehab_hectares']);
            $table->date('ho_approval_date')->nullable();
            $table->string('project_duration')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irrigation_scheme_profiles', function (Blueprint $table) {
            $table->decimal('area_irrigated_before_rehab_hectares', 15, 2)->nullable();
            $table->decimal('area_irrigated_after_rehab_hectares', 15, 2)->nullable();
            $table->dropColumn(['ho_approval_date', 'project_duration']);
        });
    }
};
