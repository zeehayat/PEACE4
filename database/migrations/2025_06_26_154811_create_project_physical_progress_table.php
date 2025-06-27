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
        Schema::create('project_physical_progresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('projectable_id');
            $table->string('projectable_type');
            $table->index(['projectable_type', 'projectable_id'], 'projectable_index');
            $table->unsignedInteger('milestone_percent'); // e.g., 25, 50, 100
            $table->string('component')->default('general'); // general, eme, tnd
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_physical_progress');
    }
};
