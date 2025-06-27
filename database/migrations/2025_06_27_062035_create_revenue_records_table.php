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
        Schema::create('revenue_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mhp_site_id')->constrained()->onDelete('cascade');
            $table->date('billing_month');
            $table->decimal('connection_charges', 10, 2)->nullable();
            $table->decimal('billing_amount', 10, 2)->nullable();
            $table->decimal('line_rent_amount', 10, 2)->nullable();
            $table->decimal('late_payment_surcharge', 10, 2)->nullable();
            $table->decimal('fine_additional_cost', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revenue_records');
    }
};
