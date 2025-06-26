<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CboDialogue extends Model
{
    /** @use HasFactory<\Database\Factories\CboDialogueFactory> */
    use HasFactory;
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
