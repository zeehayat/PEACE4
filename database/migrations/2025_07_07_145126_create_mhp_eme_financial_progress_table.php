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
        Schema::create('mhp_eme_financial_progresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mhp_site_id')->constrained()->cascadeOnDelete();

            $table->unsignedTinyInteger('installment_number'); // 1 → 5
            $table->date('initiation_date')->nullable();
            $table->date('date')->nullable();
            $table->decimal('amount', 15, 2)->nullable();
            $table->string('cheque_no', 100)->nullable();
            $table->decimal('remaining_amount', 15, 2)->nullable();

            $table->timestamps();
        });

        // Optional: Initiation date can go in `mhp_sites` or as separate table
        if (!Schema::hasColumn('mhp_sites', 'financial_initiation_date')) {
            Schema::table('mhp_sites', function (Blueprint $table) {
                $table->date('financial_initiation_date')->nullable()->after('updated_at');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mhp_eme_financial_progresses');

        if (Schema::hasColumn('mhp_sites', 'financial_initiation_date')) {
            Schema::table('mhp_sites', function (Blueprint $table) {
                $table->dropColumn('financial_initiation_date');
            });
        }
    }
};
