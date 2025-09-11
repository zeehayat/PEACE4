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
        Schema::table('cbos', function (Blueprint $table) {
            $table->string('cbo_name')->nullable()->after('reference_code');
            $table->string('region')->nullable()->after('district');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cbos', function (Blueprint $table) {
            $table->dropColumn('cbo_name');
            $table->dropColumn('region');
        });
    }
};
