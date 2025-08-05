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
        Schema::table('vendors', function (Blueprint $table) {
            // Add status field as an enum
            $table->enum('status', ['APPROVED', 'NEW', 'BLACK-LISTED', 'UNAPPROVED', 'OLD'])->default('NEW')->after('ntn_no');
            // Add remarks field (if not already present)
            $table->text('remarks')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->dropColumn(['status', 'remarks']);
        });
    }
};
