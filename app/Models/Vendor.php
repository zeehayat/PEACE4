<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class Vendor extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'name',
        'contact_person',
        'phone',
        'email',
        'address',
        'ntn_no',
        'status', // ADDED: New status field
        'remarks', // ADDED: New remarks field
    ];

    protected $casts = [
        'status' => 'string', // Cast enum to string for consistent handling
    ];

    /**
     * The "booting" method of the model.
     * Ensures related media is deleted when Vendor is deleted.
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($vendor) {
            // Spatie Media Library's InteractsWithMedia trait handles deleting associated media files.
        });
    }

    // --- Spatie Media Library ---
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments'); // Main attachments for the Vendor
    }

    protected $appends = ['attachments_frontend']; // Append formatted attachments

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
