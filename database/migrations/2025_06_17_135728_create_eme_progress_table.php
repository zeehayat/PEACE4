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
        Schema::create('eme_progress', function (Blueprint $table) {
            $table->id();
            $table->enum('scheme_type', ['mhp', 'irrigation']);
            $table->unsignedBigInteger('scheme_id');
            $table->date('progress_date');
            $table->decimal('physical_percentage', 5, 2)->nullable();
            $table->decimal('financial_amount', 12, 2)->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('eme_progress');
    }
};
