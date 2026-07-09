<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lrm_cros', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lrm_committee_id')->constrained('lrm_committees')->cascadeOnDelete();
            $table->string('name');
            $table->string('village')->nullable();
            $table->string('type')->nullable();
            $table->integer('male_members')->nullable();
            $table->integer('female_members')->nullable();
            $table->integer('total_members')->nullable();
            $table->string('president_name')->nullable();
            $table->string('president_contact')->nullable();
            $table->string('secretary_name')->nullable();
            $table->string('secretary_contact')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lrm_cros');
    }
};
