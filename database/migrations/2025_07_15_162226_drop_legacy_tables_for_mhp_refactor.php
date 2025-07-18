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
        // Drop custom 'attachments' table if it exists, as we standardize on Spatie Media Library
        if (Schema::hasTable('attachments')) {
            Schema::dropIfExists('attachments');
        }

        // Drop 'project_cost_revisions' table if it exists, as we're consolidating into MhpAdminApproval
        if (Schema::hasTable('project_cost_revisions')) {
            Schema::dropIfExists('project_cost_revisions');
        }

        // Drop the singular 'project_physical_progress' table, as we use the plural 'project_physical_progresses'
        if (Schema::hasTable('project_physical_progress')) {
            Schema::dropIfExists('project_physical_progress');
        }

        // Drop old EME/Civil progress tables if they exist and are no longer needed
        if (Schema::hasTable('mhp_eme_financial_progresses')) {
            Schema::dropIfExists('mhp_eme_financial_progresses');
        }
        if (Schema::hasTable('mhp_eme_physical_progresses')) {
            Schema::dropIfExists('mhp_eme_physical_progresses');
        }
        // You may also have 'om_costs' or 'operational_costs_old' to consider if they are truly legacy
        // For now, I'm only dropping the ones directly related to the progress refactor decision.
        // If 'om_costs' or 'operational_costs_old' are truly obsolete, add them here.
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recreating tables in down() is complex for this type of cleanup and often not recommended for rollbacks
        // of cleanup migrations. If you need to revert, a database restore from backup is safer.
        // For development, rely on `migrate:fresh`.
    }
};
