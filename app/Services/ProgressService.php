<?php

// App\Services\ProgressService.php

namespace App\Services;

use App\Models\MhpSite;
use App\Models\IrrigationScheme;

class ProgressService
{
    protected static function toPct($maxInstallment): float
    {
        $n = (int) ($maxInstallment ?? 0);
        return $n > 0 ? ($n / 10) * 100 : 0.0;
    }

    /**
     * Accept either a Relation (e.g., MorphMany) or a Builder and return the same, filtered.
     * We intentionally avoid a strict type so both work.
     */
    protected static function applyBucket($q, ?string $bucket)
    {
        return match ($bucket) {
            'EME' => $q->where('payment_for', 'EME'),
            'T&D' => $q->where('payment_for', 'T&D'),
            // “MHP core” = Civil or NULL (adjust if your categories differ)
            'MHP' => $q->where(function ($qq) {
                $qq->whereNull('payment_for')->orWhere('payment_for', 'Civil');
            }),
            default => $q, // overall (no filter)
        };
    }

    /* ---------------- MHP: PHYSICAL ---------------- */

    public static function mhpPhysicalOverallAvg(MhpSite $mhp): float
    {
        return (float) ($mhp->physicalProgresses()->avg('progress_percentage') ?? 0);
    }

    public static function mhpPhysicalMhpAvg(MhpSite $mhp): float
    {
        return (float) (self::applyBucket($mhp->physicalProgresses(), 'MHP')
            ->avg('progress_percentage') ?? 0);
    }

    public static function mhpPhysicalEmeAvg(MhpSite $mhp): float
    {
        return (float) (self::applyBucket($mhp->physicalProgresses(), 'EME')
            ->avg('progress_percentage') ?? 0);
    }

    public static function mhpPhysicalTndAvg(MhpSite $mhp): float
    {
        return (float) (self::applyBucket($mhp->physicalProgresses(), 'T&D')
            ->avg('progress_percentage') ?? 0);
    }

    /* ---------------- MHP: FINANCIAL ---------------- */

    public static function mhpFinancialOverallPct(MhpSite $mhp): float
    {
        return self::toPct($mhp->financialInstallments()->max('installment_number'));
    }

    public static function mhpFinancialMhpPct(MhpSite $mhp): float
    {
        return self::toPct(
            self::applyBucket($mhp->financialInstallments(), 'MHP')->max('installment_number')
        );
    }

    public static function mhpFinancialEmePct(MhpSite $mhp): float
    {
        return self::toPct(
            self::applyBucket($mhp->financialInstallments(), 'EME')->max('installment_number')
        );
    }

    public static function mhpFinancialTndPct(MhpSite $mhp): float
    {
        return self::toPct(
            self::applyBucket($mhp->financialInstallments(), 'T&D')->max('installment_number')
        );
    }

    /* ---------------- IRRIGATION ---------------- */

    public static function irrigationPhysicalAvg(IrrigationScheme $scheme): float
    {
        return (float) ($scheme->physicalProgresses()->avg('progress_percentage') ?? 0);
    }

    public static function irrigationFinancialPct(IrrigationScheme $scheme): float
    {
        return self::toPct($scheme->financialInstallments()->max('installment_number'));
    }

    /* ---------------- Utility ---------------- */

    public static function blendedCompletion(bool $isCompleted, float ...$signals): float
    {
        if ($isCompleted) return 100.0;
        $signals = array_values(array_filter($signals, fn($v) => $v !== null && $v > 0));
        return $signals ? array_sum($signals) / count($signals) : 0.0;
    }
}
