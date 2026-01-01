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
            $table->decimal('civil_contractor_amount', 15, 2)->nullable()->after('civil_contract_award_date');
        });

        Schema::table('transmission_and_distribution_works', function (Blueprint $table) {
            $table->decimal('contractor_amount', 15, 2)->nullable()->after('contract_award_date');
        });

        Schema::table('eme_info', function (Blueprint $table) {
            $table->decimal('contractor_amount', 15, 2)->nullable()->after('contract_award_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mhp_sites', function (Blueprint $table) {
            $table->dropColumn('civil_contractor_amount');
        });

        Schema::table('transmission_and_distribution_works', function (Blueprint $table) {
            $table->dropColumn('contractor_amount');
        });

        Schema::table('eme_info', function (Blueprint $table) {
            $table->dropColumn('contractor_amount');
        });
    }
};
