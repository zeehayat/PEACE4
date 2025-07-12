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
    protected $appends=['attachments'];

    public function cbo():BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }


    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }



    public function getAttachmentsAttribute()
    {
        return $this->getMedia('attachments')->map(function (SpatieMedia $media) {
            return [
                'id' => $media->id,
                'name' => $media->name,
                'file_name' => $media->file_name,
                'url' => $media->getUrl(),
                'size' => $media->size,
            ];
        })->toArray();
    }

}
