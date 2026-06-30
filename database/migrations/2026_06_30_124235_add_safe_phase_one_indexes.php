<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->ensureDistrictNamesAreUnique();

        if (Schema::hasTable('districts') && Schema::hasColumn('districts', 'name') && ! $this->indexExists('districts', 'districts_name_unique')) {
            Schema::table('districts', function (Blueprint $table) {
                $table->unique('name', 'districts_name_unique');
            });
        }

        if (
            Schema::hasTable('project_financial_installments')
            && Schema::hasColumn('project_financial_installments', 'projectable_id')
            && Schema::hasColumn('project_financial_installments', 'projectable_type')
            && ! $this->indexExists('project_financial_installments', 'fin_inst_proj_idx')
        ) {
            Schema::table('project_financial_installments', function (Blueprint $table) {
                $table->index(['projectable_id', 'projectable_type'], 'fin_inst_proj_idx');
            });
        }

        if (Schema::hasTable('cbos') && Schema::hasColumn('cbos', 'district') && ! $this->indexExists('cbos', 'cbos_district_idx')) {
            Schema::table('cbos', function (Blueprint $table) {
                $table->index('district', 'cbos_district_idx');
            });
        }

        if (Schema::hasTable('cros') && Schema::hasColumn('cros', 'district') && ! $this->indexExists('cros', 'cros_district_idx')) {
            Schema::table('cros', function (Blueprint $table) {
                $table->index('district', 'cros_district_idx');
            });
        }
    }

    public function down(): void
    {
        $this->dropIndexIfExists('cros', 'cros_district_idx');
        $this->dropIndexIfExists('cbos', 'cbos_district_idx');
        $this->dropIndexIfExists('project_financial_installments', 'fin_inst_proj_idx');
        $this->dropIndexIfExists('districts', 'districts_name_unique');
    }

    private function ensureDistrictNamesAreUnique(): void
    {
        if (! Schema::hasTable('districts') || ! Schema::hasColumn('districts', 'name')) {
            return;
        }

        $duplicate = DB::table('districts')
            ->select('name')
            ->groupBy('name')
            ->havingRaw('COUNT(*) > 1')
            ->first();

        if ($duplicate) {
            throw new RuntimeException("Cannot add unique index districts_name_unique: duplicate district name '{$duplicate->name}' exists.");
        }
    }

    private function indexExists(string $table, string $index): bool
    {
        return DB::table('information_schema.statistics')
            ->where('table_schema', DB::getDatabaseName())
            ->where('table_name', $table)
            ->where('index_name', $index)
            ->exists();
    }

    private function dropIndexIfExists(string $table, string $index): void
    {
        if (! Schema::hasTable($table) || ! $this->indexExists($table, $index)) {
            return;
        }

        DB::statement(sprintf('ALTER TABLE `%s` DROP INDEX `%s`', $table, $index));
    }
};
