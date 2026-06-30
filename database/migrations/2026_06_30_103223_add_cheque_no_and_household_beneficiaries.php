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
        if (!Schema::hasColumn('project_financial_installments', 'cheque_no')) {
            Schema::table('project_financial_installments', function (Blueprint $table) {
                $table->string('cheque_no')->nullable()->after('installment_amount');
            });
        }

        Schema::table('irrigation_schemes', function (Blueprint $table) {
            if (!Schema::hasColumn('irrigation_schemes', 'direct_household_beneficiary')) {
                $table->integer('direct_household_beneficiary')->nullable()->after('status');
            }
            if (!Schema::hasColumn('irrigation_schemes', 'indirect_household_beneficiary')) {
                $table->integer('indirect_household_beneficiary')->nullable()->after('direct_household_beneficiary');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_financial_installments', function (Blueprint $table) {
            if (Schema::hasColumn('project_financial_installments', 'cheque_no')) {
                $table->dropColumn('cheque_no');
            }
        });

        Schema::table('irrigation_schemes', function (Blueprint $table) {
            $cols = [];
            if (Schema::hasColumn('irrigation_schemes', 'direct_household_beneficiary')) {
                $cols[] = 'direct_household_beneficiary';
            }
            if (Schema::hasColumn('irrigation_schemes', 'indirect_household_beneficiary')) {
                $cols[] = 'indirect_household_beneficiary';
            }
            if (count($cols) > 0) {
                $table->dropColumn($cols);
            }
        });
    }
};
