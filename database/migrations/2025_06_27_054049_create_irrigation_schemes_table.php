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
        Schema::create('irrigation_schemes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cbo_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['New', 'Rehabilitation']);
            $table->unsignedInteger('beneficiary_farmers')->nullable();
            $table->float('channel_length_km')->nullable();
            $table->float('land_area_hectares')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irrigation_schemes');
    }
};
