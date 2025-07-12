<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class CboExposureVisit extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\CboExposureVisitFactory> */


    use HasFactory, InteractsWithMedia;
    protected $guarded = [];


    public function cbo():BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }

    public function attachments():MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }
    protected $appends = ['attachments'];
    public function getAttachmentsAttribute()
    {
        // Get media from the 'attachments' collection
        return $this->getMedia('attachments')->map(function (SpatieMedia $media) { // Changed App\Models\Media to SpatieMedia (the alias)
            return [
                'id' => $media->id,
                'name' => $media->name,
                'file_name' => $media->file_name,
                'url' => $media->getUrl(),
                'size' => $media->size,
            ];
        })->toArray(); // Convert to array for consistent JSON output
    }
}
