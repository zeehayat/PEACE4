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
        Schema::create('milestone_logs', function (Blueprint $table) {
            $table->id();
            $table->enum('scheme_type', ['mhp', 'irrigation']);
            $table->unsignedBigInteger('scheme_id');
            $table->enum('milestone_type', ['approval', 'initiation', 'completion']);
            $table->date('milestone_date');
            $table->string('status');
            $table->string('signed_off_by')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('milestone_logs');
    }
};
