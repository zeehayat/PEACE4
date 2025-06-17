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
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->string('attachable_type');
            $table->unsignedBigInteger('attachable_id');
            $table->text('file_path');
            $table->string('file_name');
            $table->string('file_type', 50)->nullable();
            $table->text('description')->nullable();
            $table->string('uploaded_by')->nullable();
            $table->timestamps();

            $table->index(['attachable_type', 'attachable_id'], 'idx_attachable');
        });
    }

    public function down(): void {
        Schema::dropIfExists('attachments');
    }
};
