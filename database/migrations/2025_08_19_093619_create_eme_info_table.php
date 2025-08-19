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
        Schema::create('eme_info', function (Blueprint $table) {
            $table->id();

            // This creates the foreign key link to the mhp_sites table
            $table->foreignId('mhp_site_id')->constrained('mhp_sites')->onDelete('cascade');

            $table->decimal('turbine_capacity_kw', 8, 2)->nullable();
            $table->string('turbine_type')->nullable();
            $table->string('turbine_no')->nullable();
            $table->string('governor_type')->nullable();
            $table->string('governor_no')->nullable();
            $table->decimal('generator_alternator_capacity', 8, 2)->nullable();
            $table->decimal('stepup_transformer_capacity', 8, 2)->nullable();
            $table->integer('no_of_step_up_transformers')->nullable();
            $table->boolean('scada_system')->default(false); // Using boolean for yes/no
            $table->string('scada_system_model')->nullable();
            $table->decimal('station_generator_capacity', 8, 2)->nullable();
            $table->string('penstock_pipe')->nullable();
            $table->integer('no_of_penstock_pipe')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eme_info');
    }
};
