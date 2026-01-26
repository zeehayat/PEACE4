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
        Schema::create('cros', function (Blueprint $table) {
            $table->id();
            $table->string('district');
            $table->string('tehsil');
            $table->string('village_council');
            $table->string('village');
            $table->date('date_final_community_dialogue')->nullable();
            $table->integer('no_of_community_dialogues')->default(0);
            $table->integer('dialogue_participants')->default(0);
            $table->string('cro_name');
            $table->date('date_of_cro_formation')->nullable();
            $table->integer('total_members')->default(0);
            $table->string('gender')->nullable(); // 'Male', 'Female', 'Mixed'
            $table->integer('no_of_cro_members')->default(0);
            $table->string('president_name')->nullable();
            $table->string('president_contact')->nullable();
            $table->string('secretary_name')->nullable();
            $table->string('secretary_contact')->nullable();
            $table->date('date_exposure_visit')->nullable();
            $table->integer('exposure_visit_participants')->default(0);
            $table->date('date_om_training')->nullable();
            $table->integer('om_training_participants')->default(0);
            $table->date('date_electrical_training')->nullable();
            $table->integer('electrical_training_participants')->default(0);
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cros');
    }
};
