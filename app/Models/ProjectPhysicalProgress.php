<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class ProjectPhysicalProgress extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'projectable_id',
        'projectable_type',
        'progress_percentage',
        'progress_date',
        'remarks',
        'payment_for',
        'activity_id',
        'activity_type',
    ];

    protected $casts = [
        'progress_percentage' => 'decimal:2',
        'progress_date' => 'date',
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
