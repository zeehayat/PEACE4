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
        Schema::table('cbo_dialogues', function (Blueprint $table) {
            if (!Schema::hasColumn('cbo_dialogues', 'remarks')) {
                $table->text('remarks')->nullable()->after('participants'); // Adjust 'after' as appropriate
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cbo_dialogues', function (Blueprint $table) {
            if (Schema::hasColumn('cbo_dialogues', 'remarks')) {
                $table->dropColumn('remarks');
            }
        });
    }
};
