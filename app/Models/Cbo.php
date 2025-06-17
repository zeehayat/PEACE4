<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Cbo extends Model
{
    protected $guarded = [];

    public function mhps():HasMany {
        return $this->hasMany(Mhp::class);
    }

    public function irrigationSchemes():HasMany {
        return $this->hasMany(IrrigationScheme::class);
    }

    public function cboActivities():HasMany {
        return $this->hasMany(CboActivity::class);
    }

    public function attachments(): MorphMany {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
