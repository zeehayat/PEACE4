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
        Schema::dropIfExists('mhp_eme_progress');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('mhp_eme_progresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mhp_site_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->json('progress_data')->nullable();
            $table->timestamps();
        });
    }
};
