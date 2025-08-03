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
        Schema::dropIfExists('irrigation_completions');
        Schema::create('irrigation_completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('irrigation_scheme_id')->constrained('irrigation_schemes')->onDelete('cascade');
            $table->date('scheme_inauguration_date')->nullable();
            $table->date('testing_commissioning_date')->nullable();
            $table->date('handover_date')->nullable();
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
