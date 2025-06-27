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
        Schema::create('om_costs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mhp_site_id')->constrained()->onDelete('cascade');
            $table->date('cost_date')->nullable();
            $table->decimal('o_and_m_cost', 12, 2)->nullable();
            $table->decimal('rehab_reconstruction_cost', 12, 2)->nullable();
            $table->decimal('repair_civil_work_cost', 12, 2)->nullable();
            $table->decimal('repair_tnd_cost', 12, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('om_costs');
    }
};
