<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class IrrigationAdminApproval extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'irrigation_scheme_id',
        'approved_vendor', // This varchar field remains
        'vendor_id', // <--- ADD THIS FOREIGN KEY
        'approved_cost',
        'date_technical_surveys',
        'date_design_estimates_submission_psu',
        'date_validation_visit_psu',
    ];

    protected $casts = [
        'approved_cost' => 'decimal:2',
        'date_technical_surveys' => 'date',
        'date_design_estimates_submission_psu' => 'date',
        'date_validation_visit_psu' => 'date',
    ];

    public function irrigationScheme(): BelongsTo
    {
        return $this->belongsTo(IrrigationScheme::class);
    }

    // Relationship to the new Vendor model
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function costRevisions(): MorphMany
    {
        return $this->morphMany(IrrigationCostRevision::class, 'approvable');
    }

    // --- Spatie Media Library ---
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
