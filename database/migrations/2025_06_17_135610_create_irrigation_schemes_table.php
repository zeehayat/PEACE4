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
            $table->foreignId('cbo_id')->constrained('cbos')->onDelete('cascade');
            $table->string('scheme_type');
            $table->string('rehab_or_new');
            $table->decimal('area_hectares', 10, 2);
            $table->integer('beneficiaries');
            $table->decimal('channel_length_km', 10, 2);
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('irrigation_schemes');
    }
};
