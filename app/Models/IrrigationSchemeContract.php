<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class IrrigationSchemeContract extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'irrigation_scheme_id',
        'vendor_id', // <--- ADDED
        'approved_vendor', // <--- ADDED
        'date_of_agreement_contract',
        'date_of_physical_start',
        'agreement_cost',
        'remarks', // <--- ADDED
    ];

    protected $casts = [
        'date_of_agreement_contract' => 'date',
        'date_of_physical_start' => 'date',
        'agreement_cost' => 'decimal:2',
    ];

    public function irrigationScheme(): BelongsTo
    {
        return $this->belongsTo(IrrigationScheme::class);
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
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
