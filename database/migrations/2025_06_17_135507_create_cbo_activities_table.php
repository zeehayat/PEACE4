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
        Schema::create('cbo_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cbo_id')->constrained('cbos')->onDelete('cascade');
            $table->string('activity_type');
            $table->date('activity_date');
            $table->integer('participants')->nullable();
            $table->string('session_topic')->nullable();
            $table->string('facilitator_name')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('cbo_activities');
    }
};
