<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class RevenueRecord extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia; // Added InteractsWithMedia

    protected $fillable = [
        'mhp_site_id',
        'billing_month',
        'connection_charges',
        'billing_amount',
        'line_rent_amount',
        'late_payment_surcharge',
        'fine_additional_cost',
    ];

    protected $casts = [
        'billing_month' => 'date',
        'connection_charges' => 'decimal:2',
        'billing_amount' => 'decimal:2',
        'line_rent_amount' => 'decimal:2',
        'late_payment_surcharge' => 'decimal:2',
        'fine_additional_cost' => 'decimal:2',
    ];

    public function mhpSite(): BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }

    // --- Spatie Media Library ---
    // Removed old custom attachments() method
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }

    protected $appends = ['attachments_frontend'];

    public function getAttachmentsFrontendAttribute()
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
