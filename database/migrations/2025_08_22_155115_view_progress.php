<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // MHP: latest physical = MAX(progress_percentage)
        //      latest financial = MAX(installment_number)/10*100
        DB::statement(<<<'SQL'
CREATE OR REPLACE VIEW view_mhp_progress_latest AS
SELECT
    ms.id AS mhp_id,
    ms.cbo_id,
    c.reference_code AS cbo_reference_code,

    /* PHYSICAL: latest (max) overall and by bucket */
    ROUND(MAX(pp.progress_percentage), 2) AS phys_overall_latest,
    ROUND(MAX(CASE
                 WHEN pp.payment_for IS NULL OR pp.payment_for = 'Civil'
                 THEN pp.progress_percentage
             END), 2) AS phys_mhp_latest,
    ROUND(MAX(CASE WHEN pp.payment_for = 'EME'
                   THEN pp.progress_percentage
             END), 2) AS phys_eme_latest,
    ROUND(MAX(CASE WHEN pp.payment_for = 'T&D'
                   THEN pp.progress_percentage
             END), 2) AS phys_tnd_latest,

    /* FINANCIAL: last (max) installment as % overall and by bucket */
    ROUND((COALESCE(MAX(fi.installment_number), 0) / 10) * 100, 2) AS fin_overall_latest_pct,
    ROUND((COALESCE(MAX(CASE
                           WHEN fi.payment_for IS NULL OR fi.payment_for = 'Civil'
                           THEN fi.installment_number
                        END), 0) / 10) * 100, 2) AS fin_mhp_latest_pct,
    ROUND((COALESCE(MAX(CASE WHEN fi.payment_for = 'EME'
                             THEN fi.installment_number
                        END), 0) / 10) * 100, 2) AS fin_eme_latest_pct,
    ROUND((COALESCE(MAX(CASE WHEN fi.payment_for = 'T&D'
                             THEN fi.installment_number
                        END), 0) / 10) * 100, 2) AS fin_tnd_latest_pct

FROM mhp_sites ms
LEFT JOIN cbos c
       ON c.id = ms.cbo_id
LEFT JOIN project_physical_progresses pp
       ON pp.projectable_id   = ms.id
      AND pp.projectable_type = 'App\\Models\\MhpSite'
LEFT JOIN project_financial_installments fi
       ON fi.projectable_id   = ms.id
      AND fi.projectable_type = 'App\\Models\\MhpSite'
GROUP BY ms.id, ms.cbo_id, c.reference_code
SQL);

        // IRRIGATION: latest physical + last financial
        DB::statement(<<<'SQL'
CREATE OR REPLACE VIEW view_irrigation_progress_latest AS
SELECT
    isch.id AS irrigation_id,
    isch.cbo_id,
    c.reference_code AS cbo_reference_code,

    /* PHYSICAL: latest (max) */
    ROUND(MAX(pp.progress_percentage), 2) AS phys_overall_latest,

    /* FINANCIAL: last (max) installment as % */
    ROUND((COALESCE(MAX(fi.installment_number), 0) / 10) * 100, 2) AS fin_overall_latest_pct

FROM irrigation_schemes isch
LEFT JOIN cbos c
       ON c.id = isch.cbo_id
LEFT JOIN project_physical_progresses pp
       ON pp.projectable_id   = isch.id
      AND pp.projectable_type = 'App\\Models\\IrrigationScheme'
LEFT JOIN project_financial_installments fi
       ON fi.projectable_id   = isch.id
      AND fi.projectable_type = 'App\\Models\\IrrigationScheme'
GROUP BY isch.id, isch.cbo_id, c.reference_code
SQL);
    }

    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS view_mhp_progress_latest');
        DB::statement('DROP VIEW IF EXISTS view_irrigation_progress_latest');
    }
};
