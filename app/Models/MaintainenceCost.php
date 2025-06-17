<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class MaintainenceCost extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function mhp():BelongsTo {
        return $this->belongsTo(Mhp::class);
    }

    public function attachments(): MorphMany {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
