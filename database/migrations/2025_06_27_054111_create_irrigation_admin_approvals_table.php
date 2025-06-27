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
        Schema::create('irrigation_admin_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('irrigation_scheme_id')->constrained('irrigation_schemes')->onDelete('cascade');
            $table->date('eu_approval_date')->nullable();
            $table->decimal('approved_cost', 15, 2)->nullable();
            $table->date('civil_work_start_date')->nullable();
            $table->date('scheme_inauguration_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irrigation_admin_approvals');
    }
};
