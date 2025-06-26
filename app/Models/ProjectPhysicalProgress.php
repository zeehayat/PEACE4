<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ProjectPhysicalProgress extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectPhysicalProgressFactory> */
    use HasFactory;
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
