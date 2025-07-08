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
        Schema::table('irrigation_schemes', function (Blueprint $table) {
            // Fields for establishment and technical surveys
            $table->date('month_year_establishment')->nullable()->after('land_area_hectares'); // "Month/Year of establishment" [cite: 1]
            $table->string('established_by')->nullable()->after('month_year_establishment'); // "Established by" [cite: 1]
            $table->date('date_technical_surveys')->nullable()->after('established_by'); // "Date of detailed technical surveys of the MHP schemes" (adapted for Irrigation) [cite: 1]

            // Fields for completion and handover
            $table->date('date_completion_civil_works')->nullable()->after('date_technical_surveys'); // "Date of Completion Civil Works" [cite: 3]
            $table->date('handover_to_community_date')->nullable()->after('date_completion_civil_works'); // "Handing over Scheme to Community for O&M" [cite: 3]

            // Coordinates
            $table->float('northening')->nullable()->after('handover_to_community_date'); // "Northening" [cite: 3]
            $table->float('easting')->nullable()->after('northening'); // "Easting" [cite: 3]
            $table->float('elevation')->nullable()->after('easting'); // "Elevation" [cite: 3]
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irrigation_schemes', function (Blueprint $table) {
            $table->dropColumn([
                'month_year_establishment',
                'established_by',
                'date_technical_surveys',
                'date_completion_civil_works',
                'handover_to_community_date',
                'northening',
                'easting',
                'elevation',
            ]);
        });
    }
};
