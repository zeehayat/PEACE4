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
        Schema::create('operational_costs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mhp_site_id')->constrained()->onDelete('cascade');
            $table->date('cost_date')->nullable();
            $table->decimal('hr_office_expenses', 12, 2)->nullable();
            $table->decimal('financial_charges', 12, 2)->nullable();
            $table->decimal('insurance_charges', 12, 2)->nullable();
            $table->decimal('vehicle_operational_cost', 12, 2)->nullable();
            $table->decimal('management_cost', 12, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operational_costs');
    }
};
