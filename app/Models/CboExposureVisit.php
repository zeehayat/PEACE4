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
    protected $fillable = [
        'cbo_id',
        'participants',
        'purpose_of_visit',
        'remarks', // Already exists
        'date_of_visit',
    ];
    protected $casts = [
        'participants' => 'integer',
        'date_of_visit' => 'date',
    ];



    public function cbo():BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }


    // --- Spatie Media Library ---
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments'); // Attachments for exposure visit
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
