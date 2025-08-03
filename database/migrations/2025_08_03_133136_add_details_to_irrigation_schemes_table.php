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
        Schema::table('irrigation_schemes', function (Blueprint $table) {
            $table->string('scheme_type', 255)->nullable()->after('status');
            $table->string('sub_scheme_type', 255)->nullable()->after('scheme_type');
            $table->integer('number_of_watercourses')->nullable()->after('sub_scheme_type');
            $table->decimal('water_availability_cusecs', 8, 2)->nullable()->after('number_of_watercourses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irrigation_schemes', function (Blueprint $table) {
            $table->dropColumn([
                'scheme_type',
                'sub_scheme_type',
                'number_of_watercourses',
                'water_availability_cusecs',
            ]);
        });
    }
};
