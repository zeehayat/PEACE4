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
        Schema::create('procurement_committee_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('procurement_order_id')->constrained()->onDelete('cascade');
            $table->foreignId('committee_member_id')->nullable()->constrained('procurement_committee_members')->onDelete('set null');
            $table->string('member_name');
            $table->string('designation')->nullable();
            $table->enum('decision', ['approve', 'reject', 'abstain'])->default('abstain');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_committee_reviews');
    }
};
