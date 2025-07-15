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
        Schema::create('transmission_and_distribution_works', function (Blueprint $table) {
            $table->id();
            // Polymorphic relation to MhpSite or IrrigationScheme
            $table->unsignedBigInteger('projectable_id');
            $table->string('projectable_type'); // e.g., App\Models\MhpSite, App\Models\IrrigationScheme

            $table->date('date_of_initiation_of_t_and_d_works')->nullable();

            // Type of Transformers
            $table->integer('step_up_transformers')->nullable(); // No. of Step Up Transformers
            $table->integer('step_down_transformers')->nullable(); // No. of Step Down Transformers

            // Poles
            $table->integer('ht_poles')->nullable(); // No. of HT Poles
            $table->integer('lt_poles')->nullable(); // No. of LT Poles

            // HT Conductor (ACSR)
            $table->decimal('ht_conductor_length_acsr_km', 8, 2)->nullable();
            $table->string('ht_conductor_dia')->nullable(); // Assuming Dia can be varied (e.g., "7/2.21mm", "3/1.2mm", or simple decimal)

            // UAAC/LT Conductor
            $table->decimal('uaac_lt_conductor_length_km', 8, 2)->nullable();
            $table->string('uaac_lt_conductor_dia')->nullable(); // Assuming Dia can be varied

            $table->text('remarks')->nullable(); // General remarks for this T&D work

            $table->timestamps();

            // Add index for polymorphic columns for faster lookups
            $table->index(['projectable_id', 'projectable_type'],'t_and_d_idx');


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transmission_and_distribution_works');

    }
};
