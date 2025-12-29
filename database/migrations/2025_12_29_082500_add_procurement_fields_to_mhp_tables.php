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
            $table->date('opm_visit_date')->nullable();
            $table->date('layout_initiation_date')->nullable();
            $table->date('ground_breaking_date')->nullable();
            $table->decimal('civil_works_cost', 15, 2)->nullable();
        });

        Schema::table('transmission_and_distribution_works', function (Blueprint $table) {
            $table->decimal('estimated_cost', 15, 2)->nullable();
            $table->date('completion_date')->nullable();
        });

        Schema::table('eme_info', function (Blueprint $table) {
            $table->decimal('estimated_cost', 15, 2)->nullable();
            $table->date('initiation_date')->nullable();
            $table->date('completion_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mhp_sites', function (Blueprint $table) {
            $table->dropColumn([
                'opm_visit_date',
                'layout_initiation_date',
                'ground_breaking_date',
                'civil_works_cost',
            ]);
        });

        Schema::table('transmission_and_distribution_works', function (Blueprint $table) {
            $table->dropColumn(['estimated_cost', 'completion_date']);
        });

        Schema::table('eme_info', function (Blueprint $table) {
            $table->dropColumn(['estimated_cost', 'initiation_date', 'completion_date']);
        });
    }
};
