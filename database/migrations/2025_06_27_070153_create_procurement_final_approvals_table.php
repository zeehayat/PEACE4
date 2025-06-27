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
        Schema::create('procurement_final_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('procurement_order_id')->constrained()->onDelete('cascade');
            $table->string('approved_by');
            $table->string('designation')->nullable();
            $table->enum('final_status', ['approved', 'rejected', 'under_review'])->default('under_review');
            $table->date('decision_date')->nullable();
            $table->text('final_remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_final_approvals');
    }
};
