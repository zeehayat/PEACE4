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
            $table->unsignedBigInteger('projectable_id')->nullable();
            // Links to MhpSite or IrrigationScheme
            $table->string('projectable_type')->nullable();

            $table->decimal('progress_percentage', 5, 2)->nullable(); // Allows decimal percentages
            $table->date('progress_date')->nullable();
            $table->text('remarks')->nullable();

            // New: Categorizes the type of activity
            $table->enum('payment_for', ['T&D', 'EME', 'Civil'])->nullable();

            // New: Polymorphic link to specific activity details (e.g., TAndDWork)
            $table->unsignedBigInteger('activity_id')->nullable();
            $table->string('activity_type')->nullable(); // e.g., 'App\Models\TAndDWork'

            $table->timestamps();

            // Add indexes for polymorphic relations
           // $table->index(['projectable_id', 'projectable_type'], 'phy_prog_proj_idx'); // Shorter name
           // $table->index(['activity_id', 'activity_type'], 'phy_prog_act_idx');     // Shorter name
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_physical_progresses');
    }
};
