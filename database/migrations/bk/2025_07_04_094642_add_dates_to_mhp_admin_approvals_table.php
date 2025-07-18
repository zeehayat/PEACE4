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
            $table->date('technical_survey_date')->nullable()->after('id');
            $table->date('date_design_psu_submission')->nullable()->after('technical_survey_date');
            $table->date('headoffice_review_submission_date')->nullable()->after('date_design_psu_submission');
            $table->date('design_estimate_date')->nullable()->after('headoffice_review_submission_date');
            $table->date('eu_approval_submission_date')->nullable()->after('design_estimate_date');
            $table->date('opm_validation_date')->nullable()->after('eu_approval_submission_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mhp_admin_approvals', function (Blueprint $table) {
            $table->dropColumn([
                'technical_survey_date',
                'date_design_psu_submission',
                'headoffice_review_submission_date',
                'design_estimate_date',
                'eu_approval_submission_date',
                'opm_validation_date',
            ]);
        });
    }
};
