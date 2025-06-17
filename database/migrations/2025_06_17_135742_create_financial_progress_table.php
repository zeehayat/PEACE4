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
        Schema::create('financial_progress', function (Blueprint $table) {
            $table->id();
            $table->enum('scheme_type', ['mhp', 'irrigation']);
            $table->unsignedBigInteger('scheme_id');
            $table->date('progress_date');
            $table->decimal('amount', 12, 2);
            $table->string('budget_head')->nullable();
            $table->string('currency', 10)->default('PKR');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('financial_progress');
    }
};
