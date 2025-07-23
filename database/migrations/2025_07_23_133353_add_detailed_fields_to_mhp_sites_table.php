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
        Schema::table('mhp_sites', function (Blueprint $table) {
            $table->decimal('observed_discharge', 8, 2)->nullable()->after('design_discharge_cusecs');

            // Details for physical components (as text or longer string if descriptive names needed)
            $table->text('intake_details')->nullable()->after('status');
            $table->text('settling_basin_details')->nullable()->after('intake_details');
            $table->text('approach_culvert_details')->nullable()->after('settling_basin_details');
            $table->text('headrace_channel_details')->nullable()->after('approach_culvert_details');
            $table->text('aqueduct_details')->nullable()->after('headrace_channel_details');
            $table->text('tailrace_details')->nullable()->after('aqueduct_details');
            $table->text('spillway_details')->nullable()->after('tailrace_details');
            $table->text('retaining_walls_details')->nullable()->after('spillway_details');

            $table->decimal('design_net_head', 8, 2)->nullable()->after('head_ft');
            $table->decimal('proposed_capacity_kw', 8, 2)->nullable()->after('planned_capacity_kw');

            $table->decimal('length_ft', 8, 2)->nullable()->after('tl_lt_km');
            $table->decimal('bottom_width_ft', 8, 2)->nullable()->after('length_ft');
            $table->decimal('design_depth_ft', 8, 2)->nullable()->after('bottom_width_ft');
            $table->decimal('freeboard_ft', 8, 2)->nullable()->after('design_depth_ft');
            $table->decimal('velocity_ft_per_sec', 8, 2)->nullable()->after('freeboard_ft');

            // Removed tentative_completion_years and tentative_completion_months
            // as they are covered by tentative_completion_date and MhpCompletion table.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mhp_sites', function (Blueprint $table) {
            $table->dropColumn([
                'observed_discharge',
                'intake_details',
                'settling_basin_details',
                'approach_culvert_details',
                'headrace_channel_details',
                'aqueduct_details',
                'tailrace_details',
                'spillway_details',
                'retaining_walls_details',
                'design_net_head',
                'proposed_capacity_kw',
                'length_ft',
                'bottom_width_ft',
                'design_depth_ft',
                'freeboard_ft',
                'velocity_ft_per_sec',
                // Removed tentative_completion_years and tentative_completion_months from drop list
            ]);
        });
    }
};
