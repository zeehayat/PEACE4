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
            if (!Schema::hasColumn('mhp_sites', 'remarks')) {
                $table->text('remarks')->nullable()->after('month_year_establishment'); // Adjust 'after' as appropriate
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mhp_sites', function (Blueprint $table) {
            if (Schema::hasColumn('mhp_sites', 'remarks')) {
                $table->dropColumn('remarks');
            }
        });
    }
};
