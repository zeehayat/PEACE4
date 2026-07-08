<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lrm_nrm_achievements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lrm_committee_id')->constrained('lrm_committees')->cascadeOnDelete();
            $table->date('date');
            $table->decimal('achieved_forest_area_value', 10, 2)->nullable();
            $table->string('achieved_forest_area_unit')->default('Kanal');
            $table->decimal('achieved_fruit_area_value', 10, 2)->nullable();
            $table->string('achieved_fruit_area_unit')->default('Kanal');
            $table->integer('achieved_forest_plants_count')->nullable();
            $table->integer('achieved_fruit_plants_count')->nullable();
            $table->integer('achieved_drr_training_persons')->nullable();
            $table->decimal('achieved_check_dams_value', 10, 2)->nullable();
            $table->string('achieved_check_dams_unit')->default('CFT');
            $table->decimal('achieved_greenbelt_lawn_value', 10, 2)->nullable();
            $table->string('achieved_greenbelt_lawn_unit')->default('Sft');
            $table->integer('achieved_composting_training_persons')->nullable();
            $table->integer('achieved_pest_control_training_persons')->nullable();
            $table->integer('achieved_pest_control_kits')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lrm_nrm_achievements');
    }
};
