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
        Schema::create('mhp_admin_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mhp_site_id')->constrained('mhp_sites')->onDelete('cascade');
            $table->date('eu_approval_date')->nullable();
            $table->decimal('approved_cost', 15, 2)->nullable();
            $table->decimal('revised_cost_1', 15, 2)->nullable();
            $table->decimal('revised_cost_2', 15, 2)->nullable();
            $table->decimal('revised_cost_3', 15, 2)->nullable();
            $table->date('hpp_inauguration_date')->nullable(); // Consistent with model/your schema
            $table->date('technical_survey_date')->nullable();
            $table->date('date_design_psu_submission')->nullable();
            $table->date('headoffice_review_submission_date')->nullable();
            $table->date('design_estimate_date')->nullable();
            $table->date('eu_approval_submission_date')->nullable();
            $table->date('opm_validation_date')->nullable();
            // Assuming 'civil_work_start_date' and 'mhp_inauguration_date' from your schema are consolidated into hpp_inauguration_date/other date fields, or are legacy.
            // If they are distinct and needed, they should be added here.
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mhp_admin_approvals');
    }
};
