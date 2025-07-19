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
            // This creates 'projectable_id' (unsignedBigInteger) and 'projectable_type' (string) columns
            $table->unsignedBigInteger('projectable_id')->nullable();
            $table->string('projectable_type')->nullable();
            $table->index(['projectable_id', 'projectable_type'], 't_and_d_proj_idx'); // Shorter index name


            $table->string('name')->nullable()->comment('e.g., HT Line to Village X, LT Distribution Phase 1');
            $table->date('date_of_initiation')->nullable();

            // CRITICAL: Ensure these are JSON columns
            $table->json('step_up_transformers')->nullable()->comment('Details of step-up transformers (e.g., [{"kva": 50, "qty": 2}])');
            $table->json('step_down_transformers')->nullable()->comment('Details of step-down transformers (e.g., [{"kva": 25, "qty": 4}])');

            $table->integer('ht_poles_quantity')->nullable();
            $table->integer('lt_poles_quantity')->nullable();
            $table->decimal('ht_conductor_length_km', 8, 2)->nullable();
            $table->string('ht_conductor_type')->nullable(); // e.g., "ACSR", "AAAC"
            $table->decimal('lt_conductor_length_km', 8, 2)->nullable();
            $table->string('lt_conductor_type')->nullable(); // e.g., "UAAC", "ABC"

            $table->text('scope_of_work')->nullable();
            $table->text('remarks')->nullable();

            $table->timestamps();
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
