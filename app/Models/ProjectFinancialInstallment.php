<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class ProjectFinancialInstallment extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'projectable_id',
        'projectable_type',
        'installment_number',
        'installment_date',
        'installment_amount',
        'category',
        'remarks',
        'payment_for',
        'activity_id',
        'activity_type',
    ];

    protected $casts = [
        'installment_number' => 'integer',
        'installment_date' => 'date',
        'installment_amount' => 'decimal:2',
        'payment_for' => 'string',
    ];

    public function projectable(): MorphTo
    {
        return $this->morphTo();
    }

    // Links to the specific activity (e.g., TAndDWork, if activity_type is set)
    public function activity(): MorphTo
    {
        return $this->morphTo();
    }

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
