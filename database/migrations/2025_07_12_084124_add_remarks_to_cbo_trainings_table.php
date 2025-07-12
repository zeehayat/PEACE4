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

            Schema::table('cbo_trainings', function (Blueprint $table) {
                $table->text('remarks')->nullable()->after('total_participants'); // Add remarks field
            });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

            Schema::table('cbo_trainings', function (Blueprint $table) {
                $table->dropColumn('remarks');
            });

    }
};
