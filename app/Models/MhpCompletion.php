<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class MhpCompletion extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $guarded=[];

    protected $casts = [
        'scheme_inauguration_date' => 'date',
        'testing_commissioning_date' => 'date',
        'handover_date' => 'date',
    ];

    public function mhpSite(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }

    // --- Spatie Media Library ---
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
