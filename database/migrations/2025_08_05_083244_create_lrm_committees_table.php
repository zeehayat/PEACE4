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
        Schema::create('lrm_committees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cbo_id')->constrained('cbos')->onDelete('cascade'); // Assuming LRM is tied to a CBO
            $table->date('date_of_lrm_committee_formation');
            $table->integer('no_of_lrm_committee_members');
            $table->date('date_of_nrm_plan_finalization')->nullable(); // Can be null if not finalized yet
            $table->boolean('has_afforestation_reforestation')->default(false); // Flag for activity
            $table->json('forest_plants')->nullable(); // e.g., ['Rubinia', 'Bakain']
            $table->json('fruit_plants')->nullable(); // e.g., ['PEACH', 'Apple']
            $table->decimal('total_land_covered_hectares', 10, 2)->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lrm_committees');
    }
};
