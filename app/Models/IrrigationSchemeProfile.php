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
        'northening',
        'easting',
        'elevation',
    ];

    protected $casts = [
        'month_year_establishment' => 'date',
        'date_technical_surveys' => 'date',
        'channel_length_km' => 'decimal:2',
        'land_area_hectares' => 'decimal:2',
        'northening' => 'decimal:6',
        'easting' => 'decimal:6',
        'elevation' => 'decimal:2',
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
