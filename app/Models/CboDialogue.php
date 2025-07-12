<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class CboDialogue extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\CboDialogueFactory> */
    use HasFactory, InteractsWithMedia;
    protected $fillable = ['cbo_id', 'date_of_dialogue', 'participants'];

    public function cbo()
    {
        return $this->belongsTo(Cbo::class);
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }

    protected $appends = ['attachments'];
    public function getAttachmentsAttribute(): array
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
