<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class ProjectVisit extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'visitable_id',
        'visitable_type',
        'visit_date',
        'visitor_role',
        'visit_type',
        'visitor_name',
        'remarks',
    ];

    protected $casts = [
        'visit_date' => 'date',
    ];

    /**
     * Get the owning visitable model (polymorphic relationship).
     */
    public function visitable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Spatie Media Library collection registration.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }

    // Accessor to map Spatie media collections cleanly to a frontend array
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
