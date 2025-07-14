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
        Schema::table('operational_costs', function (Blueprint $table) {
            if (!Schema::hasColumn('operational_costs', 'remarks')) {
                $table->text('remarks')->nullable()->after('amount'); // Adjust 'after' as appropriate
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('operational_costs', function (Blueprint $table) {
            if (Schema::hasColumn('operational_costs', 'remarks')) {
                $table->dropColumn('remarks');
            }
        });
    }
};
