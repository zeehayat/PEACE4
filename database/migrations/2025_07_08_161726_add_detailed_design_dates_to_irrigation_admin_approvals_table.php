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
        Schema::table('irrigation_admin_approvals', function (Blueprint $table) {
            $table->date('date_design_estimates_submission_psu')->nullable()->after('approved_cost'); // "Date of Detail Design & estimates Submitted to PSU" [cite: 1]
            $table->date('date_design_estimates_submission_opm_eu_review')->nullable()->after('date_design_estimates_submission_psu'); // "Date of Detail Design & estimates Submission to OPM/EU for Review" [cite: 1]
            $table->date('date_validation_visit_opm')->nullable()->after('date_design_estimates_submission_opm_eu_review'); // "Date of Validation visit by OPM" [cite: 1]
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irrigation_admin_approvals', function (Blueprint $table) {
            $table->dropColumn([
                'date_design_estimates_submission_psu',
                'date_design_estimates_submission_opm_eu_review',
                'date_validation_visit_opm',
            ]);
        });
    }
};
