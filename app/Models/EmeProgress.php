<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class EmeProgress extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function attachments(): MorphMany {
        return $this->morphMany(Attachment::class, 'attachable');
    }
    public function scheme(): MorphTo {
        return $this->morphTo(__FUNCTION__, 'scheme_type', 'scheme_id');
    }

    public function getIsMhpAttribute(): bool {
        return $this->scheme_type === 'mhp';
    }

    public function getIsIrrigationAttribute(): bool {
        return $this->scheme_type === 'irrigation';
    }
}
