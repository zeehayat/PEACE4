<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lrm_committees', function (Blueprint $table) {
            $table->decimal('target_forest_area_value', 10, 2)->nullable()->after('total_land_covered_hectares');
            $table->string('target_forest_area_unit')->default('Kanal')->after('target_forest_area_value');
            $table->decimal('target_fruit_area_value', 10, 2)->nullable()->after('target_forest_area_unit');
            $table->string('target_fruit_area_unit')->default('Kanal')->after('target_fruit_area_value');
            $table->integer('target_forest_plants_count')->nullable()->after('target_fruit_area_unit');
            $table->integer('target_fruit_plants_count')->nullable()->after('target_forest_plants_count');
            $table->integer('target_drr_training_persons')->nullable()->after('target_fruit_plants_count');
            $table->decimal('target_check_dams_value', 10, 2)->nullable()->after('target_drr_training_persons');
            $table->string('target_check_dams_unit')->default('CFT')->after('target_check_dams_value');
            $table->decimal('target_greenbelt_lawn_value', 10, 2)->nullable()->after('target_check_dams_unit');
            $table->string('target_greenbelt_lawn_unit')->default('Sft')->after('target_greenbelt_lawn_value');
            $table->integer('target_composting_training_persons')->nullable()->after('target_greenbelt_lawn_unit');
            $table->integer('target_pest_control_training_persons')->nullable()->after('target_composting_training_persons');
            $table->integer('target_pest_control_kits')->nullable()->after('target_pest_control_training_persons');
        });
    }

    public function down(): void
    {
        Schema::table('lrm_committees', function (Blueprint $table) {
            $table->dropColumn([
                'target_forest_area_value', 'target_forest_area_unit',
                'target_fruit_area_value', 'target_fruit_area_unit',
                'target_forest_plants_count', 'target_fruit_plants_count',
                'target_drr_training_persons',
                'target_check_dams_value', 'target_check_dams_unit',
                'target_greenbelt_lawn_value', 'target_greenbelt_lawn_unit',
                'target_composting_training_persons',
                'target_pest_control_training_persons', 'target_pest_control_kits',
            ]);
        });
    }
};
