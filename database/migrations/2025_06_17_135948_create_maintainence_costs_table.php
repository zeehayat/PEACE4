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
        Schema::create('maintainence_costs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mhp_id')->constrained('mhps')->onDelete('cascade');
            $table->date('month');
            $table->decimal('om_cost', 10, 2)->nullable();
            $table->decimal('rehab_cost', 10, 2)->nullable();
            $table->decimal('repair_civil', 10, 2)->nullable();
            $table->decimal('repair_td', 10, 2)->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('maintenance_costs');
    }
};
