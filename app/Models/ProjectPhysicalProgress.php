<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ProjectPhysicalProgress extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ProjectPhysicalProgressFactory> */
    use HasFactory, InteractsWithMedia;
    protected $fillable = [
        'milestone_percent',
        'remarks',
    ];

    public function projectable():MorphTo
    {
        return $this->morphTo();
    }

    public function attachments():MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
