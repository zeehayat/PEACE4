<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class IrrigationCompletion extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'irrigation_scheme_id',
        'number_of_beneficiary_farmers',
        'length_of_irrigation_channels_km',
        'area_of_land_covered_hectares',
        'handing_over_to_community_date',
        'remarks',
    ];

    protected $casts = [
        'number_of_beneficiary_farmers' => 'integer',
        'length_of_irrigation_channels_km' => 'decimal:2',
        'area_of_land_covered_hectares' => 'decimal:2',
        'handing_over_to_community_date' => 'date',
    ];

    public function irrigationScheme(): BelongsTo
    {
        return $this->belongsTo(IrrigationScheme::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
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
