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
        Schema::create('procurement_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('procurement_order_id')->constrained()->onDelete('cascade');
            $table->date('payment_date');
            $table->decimal('amount_paid', 15, 2);
            $table->string('payment_method')->nullable();
            $table->string('reference')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_payments');
    }
};
