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
        Schema::table('cbo_exposure_visits', function (Blueprint $table) {
            $table->integer('participants')->nullable()->after('cbo_id');
            $table->string('purpose_of_visit')->nullable()->after('participants');

            // Add 'remarks' column
            $table->text('remarks')->nullable()->after('purpose_of_visit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cbo_exposure_visits', function (Blueprint $table) {
            $table->dropColumn('participants');
            $table->dropColumn('purpose_of_visit');
            $table->dropColumn('remarks');
        });
    }
};
