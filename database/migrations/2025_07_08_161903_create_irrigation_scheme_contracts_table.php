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
        Schema::create('irrigation_scheme_contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('irrigation_scheme_id')->constrained('irrigation_schemes')->onDelete('cascade');
            // Changed from irrigation_contractor_id to vendor_id, referencing the 'vendors' table
            $table->foreignId('vendor_id')->constrained('vendors')->onDelete('restrict'); // Link to existing vendors table
            $table->date('date_civil_work_initiation')->nullable(); // "Date of civil Work Initiation" from CSV
            $table->decimal('contract_amount', 15, 2)->nullable(); // Added for completeness, not in CSV
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irrigation_scheme_contracts');
    }
};
