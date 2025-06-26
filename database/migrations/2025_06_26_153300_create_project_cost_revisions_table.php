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
        Schema::create('project_cost_revisions', function (Blueprint $table) {
            $table->id();
            $table->morphs('approvable');
            $table->unsignedInteger('revision_number');
            $table->decimal('revised_cost', 15, 2);
            $table->date('approved_on')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_cost_revisions');
    }
};
