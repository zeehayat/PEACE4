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
        Schema::table('project_financial_installments', function (Blueprint $table) {
            // Drop old columns if they exist from prior versions of your database
            if (Schema::hasColumn('project_financial_installments', 'progress_type')) {
                $table->dropColumn('progress_type');
            }
            if (Schema::hasColumn('project_financial_installments', 't_and_d_work_id')) {
                // Ensure foreign key is dropped first if it exists
                $table->dropForeign(['t_and_d_work_id']);
                $table->dropColumn('t_and_d_work_id');
            }

            // Add new payment_for enum to categorize the activity
            $table->enum('payment_for', ['T&D', 'EME', 'Civil'])
                ->after('remarks') // Position it after 'remarks'
                ->nullable(); // Make it nullable as per physical progress

            // Add polymorphic columns to link to specific activity details (TAndDWork, EmeWork, CivilWork)
            $table->unsignedBigInteger('activity_id')->nullable()->after('payment_for');
            $table->string('activity_type')->nullable()->after('activity_id');

            // Add an index for the polymorphic relation to optimize queries
            $table->index(['activity_id', 'activity_type'], 'financial_installment_activity_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_financial_installments', function (Blueprint $table) {
            // Drop the index first
            $table->dropIndex('financial_installment_activity_idx');

            // Drop the new columns
            $table->dropColumn('activity_type');
            $table->dropColumn('activity_id');
            $table->dropColumn('payment_for');

            // If you need to rollback, add previous columns here (optional)
            // $table->enum('progress_type', ['Civil', 'EME', 'T&D'])->default('Civil')->after('remarks');
            // $table->foreignId('t_and_d_work_id')->nullable()->after('progress_type')->constrained('transmission_and_distribution_works')->onDelete('set null');
        });
    }
};
