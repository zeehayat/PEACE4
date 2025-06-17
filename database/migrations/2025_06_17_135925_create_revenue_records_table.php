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
            $table->foreignId('mhp_id')->constrained('mhps')->onDelete('cascade');
            $table->date('billing_month');
            $table->decimal('connection_charges', 10, 2)->nullable();
            $table->decimal('billing_amount', 10, 2)->nullable();
            $table->decimal('line_rent', 10, 2)->nullable();
            $table->decimal('surcharge', 10, 2)->nullable();
            $table->decimal('fines', 10, 2)->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('revenue_records');
    }
};
