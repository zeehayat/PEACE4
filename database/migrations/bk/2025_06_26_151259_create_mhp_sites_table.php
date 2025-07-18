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
            $table->foreignId('cbo_id')->constrained()->onDelete('cascade');
            $table->integer('population')->nullable();
            $table->enum('grid_status', ['On-Grid', 'Off-Grid', 'Partially on-Grid']);
            $table->enum('status', ['New', 'Rehabilitation', 'Upgradation']);
            $table->integer('existing_capacity_kw')->nullable();
            $table->integer('planned_capacity_kw')->nullable();
            $table->float('head_ft')->nullable();
            $table->float('design_discharge_cusecs')->nullable();
            $table->float('channel_length_km')->nullable();
            $table->float('tl_ht_km')->nullable();
            $table->float('tl_lt_km')->nullable();
            $table->integer('transformers')->nullable();
            $table->string('turbine_type')->nullable();
            $table->string('alternator_type')->nullable();
            $table->boolean('accessible')->nullable();
            $table->integer('domestic_units')->nullable();
            $table->integer('commercial_units')->nullable();
            $table->decimal('estimated_cost', 15, 2)->nullable();
            $table->decimal('per_kw_cost', 15, 2)->nullable();
            $table->integer('total_hh')->nullable();
            $table->float('avg_hh_size')->nullable();
            $table->decimal('cost_per_capita', 15, 2)->nullable();
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
