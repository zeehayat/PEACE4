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
        Schema::create('mhp_eme_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mhp_site_id')->constrained('mhp_sites')->onDelete('cascade');
            $table->unsignedInteger('milestone_percent'); // 25, 50, 75, 100
            $table->date('progress_date')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mhp_eme_progress');
    }
};
