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
        Schema::table('project_physical_progress', function (Blueprint $table) {
            if (!Schema::hasColumn('project_physical_progress', 't_and_d_work_id')) {
                $table->foreignId('t_and_d_work_id')
                    ->nullable()
                    ->constrained('transmission_and_distribution_works') // Foreign key to the new table
                    ->onDelete('set null'); // If T&D work is deleted, set this to null
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_physical_progress', function (Blueprint $table) {
            if (Schema::hasColumn('project_physical_progress', 't_and_d_work_id')) {
                $table->dropConstrainedForeignId('t_and_d_work_id'); // Correctly drops foreign key constraint
            }
        });
    }
};
