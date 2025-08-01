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
        // 1. Create the new table to hold the profile data
        Schema::create('irrigation_scheme_profiles', function (Blueprint $table) {
            $table->id();
            // Foreign key to link back to the main irrigation_schemes table
            $table->foreignId('irrigation_scheme_id')->constrained('irrigation_schemes')->onDelete('cascade');

            // Fields moved from the original table
            $table->integer('beneficiary_farmers')->nullable();
            $table->decimal('channel_length_km', 8, 2)->nullable();
            $table->decimal('land_area_hectares', 8, 2)->nullable();
            $table->date('month_year_establishment')->nullable();
            $table->string('established_by', 255)->nullable();
            $table->date('date_technical_surveys')->nullable();
            $table->decimal('northening', 10, 6)->nullable();
            $table->decimal('easting', 10, 6)->nullable();
            $table->decimal('elevation', 8, 2)->nullable();

            $table->timestamps();
        });

        // 2. Drop the columns from the main irrigation_schemes table
        Schema::table('irrigation_schemes', function (Blueprint $table) {
            // Drop the columns that are now in the profile table
            $table->dropColumn([
                'beneficiary_farmers',
                'channel_length_km',
                'land_area_hectares',
                'month_year_establishment',
                'established_by',
                'date_technical_surveys',
                'northening',
                'easting',
                'elevation',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 1. Re-add the columns to the main irrigation_schemes table on rollback
        Schema::table('irrigation_schemes', function (Blueprint $table) {
            // We need to re-add these columns before dropping the profile table
            // Based on the fields provided in the migration above
            $table->integer('beneficiary_farmers')->nullable();
            $table->decimal('channel_length_km', 8, 2)->nullable();
            $table->decimal('land_area_hectares', 8, 2)->nullable();
            $table->date('month_year_establishment')->nullable();
            $table->string('established_by', 255)->nullable();
            $table->date('date_technical_surveys')->nullable();
            $table->decimal('northening', 10, 6)->nullable();
            $table->decimal('easting', 10, 6)->nullable();
            $table->decimal('elevation', 8, 2)->nullable();
        });

        // 2. Drop the new table
        Schema::dropIfExists('irrigation_scheme_profiles');
    }
};
