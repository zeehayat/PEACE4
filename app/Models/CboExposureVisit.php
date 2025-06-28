<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

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
}
