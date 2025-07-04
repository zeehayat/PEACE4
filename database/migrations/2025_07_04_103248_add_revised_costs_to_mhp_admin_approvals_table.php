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
        Schema::table('mhp_admin_approvals', function (Blueprint $table) {
            $table->decimal('revised_cost_1', 15, 2)->nullable()->after('approved_cost');
            $table->decimal('revised_cost_2', 15, 2)->nullable()->after('revised_cost_1');
            $table->decimal('revised_cost_3', 15, 2)->nullable()->after('revised_cost_2');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mhp_admin_approvals', function (Blueprint $table) {
            $table->dropColumn(['revised_cost_1', 'revised_cost_2', 'revised_cost_3']);
        });
    }
};
