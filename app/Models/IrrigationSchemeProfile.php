<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class IrrigationSchemeProfile extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'irrigation_scheme_id',
        'beneficiary_farmers',
        'channel_length_km',
        'land_area_hectares',
        'month_year_establishment',
        'established_by',
        'date_technical_surveys',
        'social_assessment_date',
        'detail_design_finalized_date',
        'work_initiated_date',
        'work_completed_date',
        'om_training_date',
        'handover_date',
        'beneficiary_hhs',
        'ho_approval_date',
        'project_duration',
        'channel_length_rehab_rft',
        'channel_length_new_rft',
        'protection_length_rft',
        'intake_length_rft',
        'northening',
        'easting',
        'elevation',
        'additional_area_covered',
    ];

    protected $casts = [
        'month_year_establishment' => 'date',
        'date_technical_surveys' => 'date',
        'social_assessment_date' => 'date',
        'detail_design_finalized_date' => 'date',
        'work_initiated_date' => 'date',
        'work_completed_date' => 'date',
        'om_training_date' => 'date',
        'handover_date' => 'date',
        'beneficiary_hhs' => 'integer',
        'ho_approval_date' => 'date',
        'channel_length_rehab_rft' => 'decimal:2',
        'channel_length_new_rft' => 'decimal:2',
        'protection_length_rft' => 'decimal:2',
        'intake_length_rft' => 'decimal:2',
        'channel_length_km' => 'decimal:2',
        'land_area_hectares' => 'decimal:2',
        'northening' => 'decimal:6',
        'easting' => 'decimal:6',
        'elevation' => 'decimal:2',
        'additional_area_covered' => 'decimal:2',
    ];

    /**
     * Get the irrigation scheme that owns the profile.
     */
    public function irrigationScheme(): BelongsTo
    {
        return $this->belongsTo(IrrigationScheme::class);
    }

    // --- Spatie Media Library ---
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments'); // Attachments for the scheme profile
    }

    protected $appends = ['attachments_frontend'];

    public function getAttachmentsFrontendAttribute(): array
    {
        return $this->getMedia('attachments')->map(fn (SpatieMedia $media) => [
            'id' => $media->id,
            'name' => $media->name,
            'file_name' => $media->file_name,
            'url' => $media->getUrl(),
            'size' => $media->size,
            'mime_type' => $media->mime_type,
        ])->toArray();
    }
}
