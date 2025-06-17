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
            $table->foreignId('mhp_id')->constrained('mhps')->onDelete('cascade');
            $table->date('month');
            $table->decimal('hr_office_expenses', 10, 2)->nullable();
            $table->decimal('bank_charges', 10, 2)->nullable();
            $table->decimal('insurance', 10, 2)->nullable();
            $table->decimal('vehicle_ops', 10, 2)->nullable();
            $table->decimal('management_cost', 10, 2)->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('operational_costs');
    }
};
