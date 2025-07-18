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
        Schema::create('mhp_sites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cbo_id')->constrained('cbos')->onDelete('cascade');
            $table->date('month_year_establishment')->nullable();
            $table->string('established_by')->nullable();
            $table->integer('population')->nullable();
            $table->enum('grid_status', ['On-Grid', 'Off-Grid', 'Partially on-Grid'])->default('Off-Grid');
            $table->enum('status', ['New', 'Rehabilitation', 'Upgradation'])->default('New'); // Use 'Rehabilitation' for consistency
            $table->decimal('existing_capacity_kw', 8, 2)->nullable();
            $table->decimal('planned_capacity_kw', 8, 2)->nullable();
            $table->decimal('head_ft', 8, 2)->nullable();
            $table->decimal('design_discharge_cusecs', 8, 2)->nullable();
            $table->decimal('channel_length_km', 8, 2)->nullable();
            $table->decimal('tl_ht_km', 8, 2)->nullable();
            $table->decimal('tl_lt_km', 8, 2)->nullable();
            // Removed 'transformers' as it's now in TAndDWork
            $table->string('turbine_type')->nullable();
            $table->string('alternator_type')->nullable();
            $table->string('accessible', 3)->nullable(); // e.g., 'Yes', 'No'
            $table->integer('domestic_units')->nullable();
            $table->integer('commercial_units')->nullable();
            $table->decimal('estimated_cost', 15, 2)->nullable();
            $table->decimal('per_kw_cost', 15, 2)->nullable();
            $table->integer('total_hh')->nullable();
            $table->decimal('avg_hh_size', 8, 2)->nullable();
            $table->decimal('cost_per_capita', 15, 2)->nullable();
            $table->date('tentative_completion_date')->nullable();
            $table->date('financial_initiation_date')->nullable(); // New field from DB schema
            $table->date('physical_completion_date')->nullable();   // New field from DB schema
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mhp_sites');
    }
};
