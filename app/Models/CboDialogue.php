<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

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

}
