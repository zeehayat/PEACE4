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
        Schema::table('project_physical_progresses', function (Blueprint $table) {
            if (!Schema::hasColumn('project_physical_progresses', 'remarks')) {
                $table->text('remarks')->nullable()->after('progress_date'); // Adjust 'after' as appropriate
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_physical_progresses', function (Blueprint $table) {
            if (Schema::hasColumn('project_physical_progresses', 'remarks')) {
                $table->dropColumn('remarks');
            }
        });
    }
};
