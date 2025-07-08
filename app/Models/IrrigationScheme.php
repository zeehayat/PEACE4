<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class IrrigationScheme extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\IrrigationSchemeFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'cbo_id',
        'status',
        'beneficiary_farmers',
        'channel_length_km',
        'land_area_hectares',
        // Fields from previous migrations (kept here)
        'month_year_establishment',
        'established_by',
        'date_technical_surveys',
        'northening',
        'easting',
        'elevation',
        // REMOVED: 'date_completion_civil_works', 'handover_to_community_date'
    ];

    protected $casts = [
        'month_year_establishment' => 'date',
        'date_technical_surveys' => 'date',
        // REMOVED: 'date_completion_civil_works' => 'date', 'handover_to_community_date' => 'date'
    ];

    public function cbo(): BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }

    public function attachments(): MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }

    // Polymorphic relationships (already existed)
    public function physicalProgresses(): MorphMany
    {
        return $this->morphMany(ProjectPhysicalProgress::class, 'projectable');
    }

    public function financialInstallments(): MorphMany
    {
        return $this->morphMany(ProjectFinancialInstallment::class, 'projectable');
    }

    // Relationship for scheme's contract details (added in previous step)
    public function irrigationSchemeContract(): HasOne
    {
        return $this->hasOne(IrrigationSchemeContract::class);
    }

    // Existing relationship for admin approval
    public function irrigationAdminApproval(): HasOne
    {
        return $this->hasOne(IrrigationAdminApproval::class);
    }

    // Existing relationship for completion (now holds the moved fields)
    public function irrigationCompletion(): HasOne
    {
        return $this->hasOne(IrrigationCompletion::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }
}
