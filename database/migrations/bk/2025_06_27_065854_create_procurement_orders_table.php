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
        Schema::create('procurement_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('procurement_quotation_id')->constrained()->onDelete('cascade');
            $table->string('procurement_code')->unique();
            $table->enum('procurement_type', ['MHP', 'Irrigation', 'Administrative'])->default('Administrative');
            $table->date('order_date');
            $table->string('status')->default('pending');
            $table->decimal('total_amount', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_orders');
    }
};
