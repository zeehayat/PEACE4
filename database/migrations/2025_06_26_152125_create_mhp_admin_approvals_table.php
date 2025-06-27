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

        Schema::create('mhp_admin_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mhp_site_id')->constrained('mhp_sites')->onDelete('cascade');
            $table->date('eu_approval_date')->nullable();
            $table->decimal('approved_cost', 15, 2)->nullable();
            $table->date('hpp_inauguration_date')->nullable();
            $table->date('civil_work_start_date')->nullable();
            $table->date('mhp_inauguration_date')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mhp_admin_approvals');
    }
};
