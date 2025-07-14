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
            if (!Schema::hasColumn('irrigation_schemes', 'remarks')) {
                $table->text('remarks')->nullable()->after('land_area_hectares'); // Adjust 'after' as appropriate
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irrigation_schemes', function (Blueprint $table) {
            if (Schema::hasColumn('irrigation_schemes', 'remarks')) {
                $table->dropColumn('remarks');
            }
        });
    }
};
