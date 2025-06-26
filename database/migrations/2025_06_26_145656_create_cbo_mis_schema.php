<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cbos', function (Blueprint $table) {
            $table->id();
            $table->string('reference_code')->unique();
            $table->string('district');
            $table->string('tehsil');
            $table->string('village_council');
            $table->string('village');
            $table->date('date_of_formation');
            $table->integer('total_members');
            $table->enum('gender', ['Male', 'Female', 'Mixed']);
            $table->integer('num_cbo_members');
            $table->string('president_name');
            $table->string('president_contact');
            $table->string('secretary_name');
            $table->string('secretary_contact');
            $table->timestamps();
        });

        Schema::create('cbo_dialogues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cbo_id')->constrained()->onDelete('cascade');
            $table->date('date_of_dialogue');
            $table->integer('participants');
            $table->timestamps();
        });

        Schema::create('cbo_exposure_visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cbo_id')->constrained()->onDelete('cascade');
            $table->date('date_of_visit');
            $table->timestamps();
        });

        Schema::create('cbo_trainings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cbo_id')->constrained()->onDelete('cascade');
            $table->enum('training_type', ['O&M Training', 'Electrical Appliance']);
            $table->enum('training_gender', ['Male', 'Female', 'Mixed']);
            $table->date('date_of_training');
            $table->integer('total_participants');
            $table->timestamps();
        });

        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->morphs('attachable');
            $table->string('path');
            $table->string('description')->nullable();
            $table->timestamp('uploaded_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attachments');
        Schema::dropIfExists('cbo_trainings');
        Schema::dropIfExists('cbo_exposure_visits');
        Schema::dropIfExists('cbo_dialogues');
        Schema::dropIfExists('cbos');
    }
};
