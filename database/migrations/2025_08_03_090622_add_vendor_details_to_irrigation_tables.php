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
        // 1. Add vendor_id to irrigation_admin_approvals
        Schema::table('irrigation_admin_approvals', function (Blueprint $table) {
            $table->foreignId('vendor_id')->nullable()->constrained('vendors')->onDelete('set null')->after('approved_vendor');
        });

        // 2. Add vendor_id and remarks to irrigation_scheme_contracts
        Schema::table('irrigation_scheme_contracts', function (Blueprint $table) {
            $table->foreignId('vendor_id')->nullable()->constrained('vendors')->onDelete('set null')->after('agreement_cost');
            $table->text('remarks')->nullable()->after('vendor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 1. Drop columns from irrigation_scheme_contracts on rollback
        Schema::table('irrigation_scheme_contracts', function (Blueprint $table) {
            $table->dropForeign(['vendor_id']);
            $table->dropColumn(['vendor_id', 'remarks']);
        });

        // 2. Drop columns from irrigation_admin_approvals on rollback
        Schema::table('irrigation_admin_approvals', function (Blueprint $table) {
            $table->dropForeign(['vendor_id']);
            $table->dropColumn('vendor_id');
        });
    }
};
