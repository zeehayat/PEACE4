<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class MaintainenceCost extends Model
{
    protected $guarded = [];

    public function mhp() {
        return $this->belongsTo(Mhp::class);
    }

    public function attachments(): MorphMany {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
