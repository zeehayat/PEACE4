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
            $table->unsignedBigInteger('projectable_id')->nullable(); // Links to MhpSite or IrrigationScheme
            $table->string('projectable_type')->nullable();

            $table->integer('installment_number')->nullable();
            $table->date('installment_date')->nullable();
            $table->decimal('installment_amount', 15, 2)->nullable();
            $table->string('category')->nullable()->comment('e.g., Initial, Mid-term, Final'); // General financial category
            $table->text('remarks')->nullable();

            // New: Categorizes the type of activity
            $table->enum('payment_for', ['T&D', 'EME', 'Civil'])->nullable();

            // New: Polymorphic link to specific activity details (e.g., TAndDWork)
            $table->unsignedBigInteger('activity_id')->nullable();
            $table->string('activity_type')->nullable(); // e.g., 'App\Models\TAndDWork'

            $table->timestamps();

            // Add indexes for polymorphic relations
           // $table->index(['projectable_id', 'projectable_type'], 'projectable_financial_idx');
           // $table->index(['activity_id', 'activity_type'], 'financial_installment_activity_idx');
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
