<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
// CORRECT IMPORT: Ensure you import Spatie's Media model
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia; // Use an alias to prevent conflicts if App\Models\Media exists

class CboTraining extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = ['cbo_id', 'training_type', 'training_gender', 'date_of_training', 'total_participants','remarks'];

    protected $appends = ['attachments'];

    public function cbo(): BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }

    public function getAttachmentsAttribute():array
    {
        // CRITICAL FIX: Change the type hint in the closure's argument
        return $this->getMedia('attachments')->map(function (SpatieMedia $media) { // Changed 'App\Models\Media' to 'SpatieMedia'
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
