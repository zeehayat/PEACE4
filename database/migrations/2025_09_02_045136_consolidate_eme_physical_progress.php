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
        // Add the 'works' column to hold EME-specific data in the unified table.
//        Schema::table('project_physical_progresses', function (Blueprint $table) {
//            $table->text('works')->nullable()->after('remarks');
//        });
//
//        // The old table `mhp_eme_physical_progresses` does not exist in production,
//        // so no data migration is needed. We can drop it just in case it exists
//        // in some development environments.
//        Schema::dropIfExists('mhp_eme_physical_progresses');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the 'works' column.
//        Schema::table('project_physical_progresses', function (Blueprint $table) {
//            $table->dropColumn('works');
//        });
//
//        // Re-create the table on rollback for full reversibility, even though it was unused.
//        // This is good practice in case someone has run the original migration in a dev environment.
//        Schema::create('mhp_eme_physical_progresses', function (Blueprint $table) {
//            $table->id();
//            $table->foreignId('mhp_site_id')->constrained()->onDelete('cascade');
//            $table->enum('milestone_percent', ['25', '50', '75', '100']);
//            $table->date('date')->nullable();
//            $table->text('works')->nullable();
//            $table->text('remarks')->nullable();
//            $table->timestamps();
//        });
    }
};
