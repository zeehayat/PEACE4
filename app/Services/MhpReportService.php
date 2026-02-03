<?php

namespace App\Services;

use App\Models\MhpSite;
use App\Models\TAndDWork;
use App\Models\MhpAdminApproval;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class MhpReportService
{
    protected $mhpSite;

    public function __construct(MhpSite $mhpSite)
    {
        $this->mhpSite = $mhpSite;
    }

    public function getStepUpTransformers(): array
    {
        // Aggregate step_up_transformers from all TAndDWorks
        $transformers = [];
        foreach ($this->mhpSite->tAndDWorks as $work) {
            if (is_array($work->step_up_transformers)) {
                $transformers = array_merge($transformers, $work->step_up_transformers);
            }
        }
        return $transformers;
    }

    public function getStepDownTransformers(): array
    {
        // Aggregate step_down_transformers from all TAndDWorks
        $transformers = [];
        foreach ($this->mhpSite->tAndDWorks as $work) {
            if (is_array($work->step_down_transformers)) {
                $transformers = array_merge($transformers, $work->step_down_transformers);
            }
        }
        return $transformers;
    }

    public function getApprovalFromEu(): ?Carbon
    {
        // Prefer AdminApproval record, fallback to site attribute if needed
        return $this->mhpSite->adminApproval?->eu_approval_date 
            ?? $this->mhpSite->eu_approval_meeting_date;
    }

    public function getDateOfCivilWorkLayoutInitiation(): ?Carbon
    {
        return $this->mhpSite->layout_initiation_date;
    }

    public function getProgressDescriptionCivl(): ?string
    {
        return $this->mhpSite->civil_progress_description;
    }

    public function getRemainingAmountTAndD(): float
    {
        return $this->mhpSite->tAndDWorks->sum('amount_remaining');
    }

    public function getCombinedCivilProgress(): float
    {
        // Combined Civil Progress + EME Progress + T&D Progress (Weighted Average based on Cost)
        
        $totalCost = 0;
        $totalWeightedProgress = 0;

        // 1. Civil Works
        $civilCost = $this->mhpSite->civil_contractor_amount ?? $this->mhpSite->civil_works_cost ?? 0;
        $civilProgress = $this->mhpSite->civil_physical_progress_percent ?? 0;
        $totalCost += $civilCost;
        $totalWeightedProgress += ($civilCost * $civilProgress);

        // 2. EME Works
        $emeInfo = $this->mhpSite->emeInfo;
        if ($emeInfo) {
             $emeCost = $emeInfo->contractor_amount ?? $emeInfo->estimated_cost ?? 0;
             $emeProgress = $emeInfo->physical_progress_percent ?? 0;
             $totalCost += $emeCost;
             $totalWeightedProgress += ($emeCost * $emeProgress);
        }

        // 3. T&D Works
        foreach ($this->mhpSite->tAndDWorks as $work) {
            $tndCost = $work->contractor_amount ?? $work->estimated_cost ?? 0;
            $tndProgress = $work->physical_progress_percent ?? 0;
            $totalCost += $tndCost;
            $totalWeightedProgress += ($tndCost * $tndProgress);
        }

        if ($totalCost == 0) {
            return 0.0;
        }

        return round($totalWeightedProgress / $totalCost, 2);
    }

    public function getDialogueDate(): ?string
    {
        return optional($this->mhpSite->cbo?->dialogues->sortByDesc('date_of_dialogue')->first()?->date_of_dialogue)?->format('Y-m-d');
    }

    public function getTechnicalSurveyDate(): ?string
    {
        return optional($this->mhpSite->adminApproval?->technical_survey_date)?->format('Y-m-d');
    }

    public function getSocialAssessmentDate(): ?string
    {
        return optional($this->mhpSite->social_assessment_date)?->format('Y-m-d');
    }

    public function getLatestPhysicalProgress(?string $component = null)
    {
        return $this->mhpSite->physicalProgresses
            ->filter(function ($p) use ($component) {
                if ($component === null) {
                    return $p->payment_for === null || $p->payment_for === 'Civil';
                }
                return $p->payment_for === $component;
            })
            ->sortByDesc('progress_date')
            ->first();
    }

    public function getTotalPaidAmount(?string $component = null): float
    {
        return (float) $this->mhpSite->financialInstallments
            ->filter(function ($f) use ($component) {
                if ($component === null) {
                    return $f->payment_for === null || $f->payment_for === 'Civil';
                }
                return $f->payment_for === $component;
            })
            ->sum('installment_amount');
    }

    public function getTotalTransformersCount(): int
    {
        $tndCount = 0;
        $tnd = $this->mhpSite->tAndDWorks->first(); // Assuming taking the latest or main one as per controller logic
        
        if ($tnd) {
            $sumQty = function ($items) {
                return collect($items ?? [])->sum(fn($item) => (int) ($item['qty'] ?? 0));
            };

            $tndCount += $sumQty($tnd->step_up_transformers);
            $tndCount += $sumQty($tnd->step_down_transformers);
        }
        
        $emeCount = (int) ($this->mhpSite->emeInfo?->no_of_step_up_transformers ?? 0);
        return $tndCount + $emeCount;
    }

    public function getTotalCost(): float
    {
        return (float) ($this->mhpSite->estimated_cost ?? 0);
    }

    public function getPerKwCost(): ?float
    {
        $budget = $this->getTotalCost();
        return $this->mhpSite->planned_capacity_kw > 0 ? $budget / (float) $this->mhpSite->planned_capacity_kw : null;
    }

    public function getTotalConnections(): int
    {
        return (int) (($this->mhpSite->domestic_units ?? 0) + ($this->mhpSite->commercial_units ?? 0));
    }

    public function getPerHhCost(): ?float
    {
        $budget = $this->getTotalCost();
        $totalConnections = $this->getTotalConnections();
        return $totalConnections > 0 ? $budget / $totalConnections : null;
    }

    public function getPerBeneficiaryCost(): ?float
    {
        $budget = $this->getTotalCost();
        return ($this->mhpSite->population ?? 0) > 0 ? $budget / (float) $this->mhpSite->population : null;
    }

    public function getChannelLengthFt(): ?float
    {
        return $this->mhpSite->length_ft ?? ($this->mhpSite->channel_length_km ? $this->mhpSite->channel_length_km * 3280.84 : null);
    }

    public function getPresentationToMcStatus(): string
    {
        return $this->mhpSite->adminApproval && $this->mhpSite->adminApproval->design_estimate_date ? 'Yes' : 'No';
    }

    public function getSharedWithOpmStatus(): string
    {
        return $this->mhpSite->adminApproval && $this->mhpSite->adminApproval->eu_approval_submission_date ? 'Yes' : 'No';
    }

    public function getOpmReviewStatus(): string
    {
        return $this->mhpSite->adminApproval && $this->mhpSite->adminApproval->opm_validation_date ? 'Yes' : 'No';
    }

    public function getOpmVisitDate(): ?string
    {
        return optional($this->mhpSite->adminApproval?->opm_validation_date)?->format('Y-m-d');
    }

    public function getCivilCompletionDate(): ?string
    {
        $progress = $this->getLatestPhysicalProgress(null);
        return optional($progress?->progress_date)?->format('Y-m-d');
    }

    public function getTndCompletionDate(): ?string
    {
        $progress = $this->getLatestPhysicalProgress('T&D');
        return optional($progress?->progress_date)?->format('Y-m-d');
    }

    public function getEmeCompletionDate(): ?string
    {
        $progress = $this->getLatestPhysicalProgress('EME');
        return optional($progress?->progress_date)?->format('Y-m-d');
    }

    public function getHtConductorLengthKm(): ?float
    {
        // Force refresh relation if empty to be sure
        $works = $this->mhpSite->tAndDWorks;
        
        if ($works->isEmpty()) {
            \Illuminate\Support\Facades\Log::error("Site {$this->mhpSite->id}: Eager loaded T&D Empty. Retrying direct query.");
            $works = $this->mhpSite->tAndDWorks()->get();
        }

        \Illuminate\Support\Facades\Log::error("Site {$this->mhpSite->id}: Final T&D Count: " . $works->count());

        $first = $works->sortByDesc('date_of_initiation')->first();
        
        if ($this->mhpSite->id == 5) {
             \Illuminate\Support\Facades\Log::error("DEBUG SITE 5: Found Work? " . ($first ? 'Yes' : 'No'));
             if ($first) {
                 \Illuminate\Support\Facades\Log::error("DEBUG SITE 5: HT Value: " . $first->ht_conductor_length_km);
             }
        }

        $val = $first?->ht_conductor_length_km;
        if ($val) {
            return $val;
        }
        
        \Illuminate\Support\Facades\Log::error("Site {$this->mhpSite->id}: Fallback to MHP Site HT: {$this->mhpSite->tl_ht_km}");
        return $this->mhpSite->tl_ht_km;
    }

    public function getLtConductorLengthKm(): ?float
    {
        $val = $this->mhpSite->tAndDWorks->sortByDesc('date_of_initiation')->first()?->lt_conductor_length_km;
        if ($val) {
            return $val;
        }
        return $this->mhpSite->tl_lt_km;
    }
}

