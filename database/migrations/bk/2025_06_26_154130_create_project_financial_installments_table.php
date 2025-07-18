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
        Schema::create('project_financial_installments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('projectable_id');
            $table->string('projectable_type');
            $table->index(['projectable_type', 'projectable_id'], 'projectable_index');
            $table->string('category')->default('general');
            $table->unsignedInteger('installment_number');
            $table->date('installment_date')->nullable();
            $table->decimal('installment_amount', 15, 2);
            $table->text('remarks')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_financial_installments');
    }
};
