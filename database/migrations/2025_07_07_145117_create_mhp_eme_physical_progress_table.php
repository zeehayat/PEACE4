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
        Schema::create('mhp_eme_physical_progresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mhp_site_id')->constrained()->cascadeOnDelete();

            $table->enum('milestone_percent', ['25', '50', '75', '100'])->comment('Physical milestone');
            $table->date('date')->nullable();
            $table->text('works')->nullable();
            $table->text('remarks')->nullable();

            $table->timestamps();
        });

        // Optional: Completion date can go in `mhp_sites` or as separate table
        if (!Schema::hasColumn('mhp_sites', 'physical_completion_date')) {
            Schema::table('mhp_sites', function (Blueprint $table) {
                $table->date('physical_completion_date')->nullable()->after('updated_at');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mhp_eme_physical_progresses');

        if (Schema::hasColumn('mhp_sites', 'physical_completion_date')) {
            Schema::table('mhp_sites', function (Blueprint $table) {
                $table->dropColumn('physical_completion_date');
            });
        }
    }
};
