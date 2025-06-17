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
        Schema::create('physical_progress', function (Blueprint $table) {
            $table->id();
            $table->enum('scheme_type', ['mhp', 'irrigation']);
            $table->unsignedBigInteger('scheme_id');
            $table->date('progress_date');
            $table->decimal('percentage', 5, 2);
            $table->string('milestone')->nullable();
            $table->string('verified_by')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('physical_progress');
    }
};
