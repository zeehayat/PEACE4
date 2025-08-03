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
        // Drop the old table first if it still exists
        Schema::dropIfExists('irrigation_completions');

        // Create the new table with the corrected fields
        Schema::create('irrigation_completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('irrigation_scheme_id')->constrained('irrigation_schemes')->onDelete('cascade');

            // Corrected fields based on your list
            $table->integer('number_of_beneficiary_farmers')->nullable();
            $table->decimal('length_of_irrigation_channels_km', 8, 2)->nullable();
            $table->decimal('area_of_land_covered_hectares', 8, 2)->nullable();
            $table->date('handing_over_to_community_date')->nullable(); // A more specific date field
            $table->text('remarks')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irrigation_completions');
    }
};
