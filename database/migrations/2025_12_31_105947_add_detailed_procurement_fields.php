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
        // 1. MHP Sites (Civil Works)
        Schema::table('mhp_sites', function (Blueprint $table) {
            // Procurement Dates
            $table->date('civil_advertisement_date')->nullable();
            $table->date('civil_pre_bid_meeting_date')->nullable();
            $table->date('civil_technical_bid_opening_date')->nullable();
            $table->date('civil_financial_bid_opening_date')->nullable();
            $table->date('civil_contract_award_date')->nullable();

            // Progress Metrics
            $table->date('civil_work_initiation_date')->nullable();
            $table->decimal('civil_financial_progress_percent', 5, 2)->nullable();
            $table->decimal('civil_amount_disbursed', 15, 2)->nullable();
            $table->decimal('civil_amount_remaining', 15, 2)->nullable();
            $table->decimal('civil_physical_progress_percent', 5, 2)->nullable();
            $table->text('civil_progress_description')->nullable();
            $table->date('civil_completion_date')->nullable();
        });

        // 2. T&D Works
        Schema::table('transmission_and_distribution_works', function (Blueprint $table) {
            // Procurement Dates
            $table->date('advertisement_date')->nullable();
            $table->date('pre_bid_meeting_date')->nullable();
            $table->date('technical_bid_opening_date')->nullable();
            $table->date('financial_bid_opening_date')->nullable();
            $table->date('contract_award_date')->nullable();

            // Progress Metrics
            // initiation_date already exists or was added previously
            $table->decimal('financial_progress_percent', 5, 2)->nullable();
            $table->decimal('amount_disbursed', 15, 2)->nullable();
            $table->decimal('amount_remaining', 15, 2)->nullable();
            $table->decimal('physical_progress_percent', 5, 2)->nullable();
            $table->text('progress_description')->nullable();
            // completion_date already added previously
        });

        // 3. EME Info
        Schema::table('eme_info', function (Blueprint $table) {
            // Procurement Dates
            $table->date('advertisement_date')->nullable();
            $table->date('pre_bid_meeting_date')->nullable();
            $table->date('technical_bid_opening_date')->nullable();
            $table->date('financial_bid_opening_date')->nullable();
            $table->date('contract_award_date')->nullable();

            // Progress Metrics
            // initiation_date already added previously
            $table->decimal('financial_progress_percent', 5, 2)->nullable();
            $table->decimal('amount_disbursed', 15, 2)->nullable();
            $table->decimal('amount_remaining', 15, 2)->nullable();
            $table->decimal('physical_progress_percent', 5, 2)->nullable();
            $table->text('progress_description')->nullable();
            // completion_date already added previously
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mhp_sites', function (Blueprint $table) {
            $table->dropColumn([
                'civil_advertisement_date', 'civil_pre_bid_meeting_date', 'civil_technical_bid_opening_date',
                'civil_financial_bid_opening_date', 'civil_contract_award_date',
                'civil_work_initiation_date', 'civil_financial_progress_percent', 'civil_amount_disbursed',
                'civil_amount_remaining', 'civil_physical_progress_percent', 'civil_progress_description', 'civil_completion_date'
            ]);
        });

        Schema::table('transmission_and_distribution_works', function (Blueprint $table) {
            $table->dropColumn([
                'advertisement_date', 'pre_bid_meeting_date', 'technical_bid_opening_date',
                'financial_bid_opening_date', 'contract_award_date',
                'financial_progress_percent', 'amount_disbursed', 'amount_remaining',
                'physical_progress_percent', 'progress_description'
            ]);
        });

        Schema::table('eme_info', function (Blueprint $table) {
            $table->dropColumn([
                'advertisement_date', 'pre_bid_meeting_date', 'technical_bid_opening_date',
                'financial_bid_opening_date', 'contract_award_date',
                'financial_progress_percent', 'amount_disbursed', 'amount_remaining',
                'physical_progress_percent', 'progress_description'
            ]);
        });
    }
};
