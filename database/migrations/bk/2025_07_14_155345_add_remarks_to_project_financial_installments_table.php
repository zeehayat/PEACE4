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
        Schema::table('project_financial_installments', function (Blueprint $table) {
            if (!Schema::hasColumn('project_financial_installments', 'remarks')) {
                $table->text('remarks')->nullable()->after('category'); // Adjust 'after' as appropriate
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_financial_installments', function (Blueprint $table) {
            if (Schema::hasColumn('project_financial_installments', 'remarks')) {
                $table->dropColumn('remarks');
            }
        });
    }
};
