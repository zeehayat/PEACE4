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
        Schema::dropIfExists('irrigation_scheme_contracts');
        Schema::create('irrigation_scheme_contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('irrigation_scheme_id')->constrained('irrigation_schemes')->onDelete('cascade');
            $table->date('date_of_agreement_contract')->nullable();
            $table->date('date_of_physical_start')->nullable();
            $table->decimal('agreement_cost', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irrigation_scheme_contracts');
    }
};
