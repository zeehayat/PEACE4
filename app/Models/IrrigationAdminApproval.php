<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;


class IrrigationAdminApproval extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'irrigation_scheme_id',
        'eu_approval_date',
        'approved_cost',
        'civil_work_start_date',
        'scheme_inauguration_date',
        // New fields from recent migrations
        'date_design_estimates_submission_psu',
        'date_design_estimates_submission_opm_eu_review', // Corrected name from migration
        'date_validation_visit_opm',
    ];

    protected $casts = [
        'eu_approval_date' => 'date',
        'civil_work_start_date' => 'date',
        'scheme_inauguration_date' => 'date',
        // New fields casting
        'date_design_estimates_submission_psu' => 'date',
        'date_design_estimates_submission_opm_eu_review' => 'date', // Corrected name
        'date_validation_visit_opm' => 'date',
    ];

    public function scheme(): BelongsTo
    {
        return $this->belongsTo(IrrigationScheme::class, 'irrigation_scheme_id');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }
}
