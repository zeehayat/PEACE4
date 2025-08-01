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
        // Drop the old table first, as we are creating a new one with a different structure
        Schema::dropIfExists('irrigation_admin_approvals');

        // 1. Create the new irrigation_admin_approvals table
        Schema::create('irrigation_admin_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('irrigation_scheme_id')->constrained('irrigation_schemes')->onDelete('cascade');
            $table->string('approved_vendor', 255)->nullable(); // From vendors table (will link later)
            $table->decimal('approved_cost', 15, 2)->nullable();
            $table->date('date_technical_surveys')->nullable();
            $table->date('date_design_estimates_submission_psu')->nullable();
            $table->date('date_validation_visit_psu')->nullable(); // Corrected name
            $table->timestamps();
        });

        // 2. Create a new table for revised costs with a polymorphic relationship
        Schema::create('irrigation_cost_revisions', function (Blueprint $table) {
            $table->id();
            $table->morphs('approvable'); // This makes it polymorphic
            $table->integer('revision_number')->default(1);
            $table->decimal('revised_cost', 15, 2)->nullable();
            $table->date('approved_on')->nullable();
            $table->string('remarks', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 1. Drop the new tables
        Schema::dropIfExists('irrigation_cost_revisions');
        Schema::dropIfExists('irrigation_admin_approvals');

        // 2. Re-create the old table structure on rollback for development continuity
        Schema::create('irrigation_admin_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('irrigation_scheme_id')->constrained('irrigation_schemes')->onDelete('cascade');
            $table->date('eu_approval_date')->nullable();
            $table->decimal('approved_cost', 15, 2)->nullable();
            $table->date('date_design_estimates_submission_psu')->nullable();
            $table->date('date_design_estimates_submission_opm_eu_review')->nullable();
            $table->date('date_validation_visit_opm')->nullable();
            $table->date('civil_work_start_date')->nullable();
            $table->date('scheme_inauguration_date')->nullable();
            $table->string('remarks', 255)->nullable();
            $table->timestamps();
        });
    }
};
