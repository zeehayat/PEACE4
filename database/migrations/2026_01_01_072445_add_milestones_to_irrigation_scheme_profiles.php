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
            $table->date('detail_design_finalized_date')->nullable();
            $table->date('work_initiated_date')->nullable();
            $table->date('work_completed_date')->nullable();
            $table->date('om_training_date')->nullable();
            $table->date('handover_date')->nullable();
            $table->integer('beneficiary_hhs')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irrigation_scheme_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'detail_design_finalized_date',
                'work_initiated_date',
                'work_completed_date',
                'om_training_date',
                'handover_date',
                'beneficiary_hhs',
            ]);
        });
    }
};
