<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class MhpSite extends Model
{
    /** @use HasFactory<\Database\Factories\MhpSiteFactory> */
    use HasFactory;
    protected $guarded = [];

    public function cbo():BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }

    public function adminApproval():HasOne
    {
        return $this->hasOne(MhpAdminApproval::class);
    }
    public function attachments():MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
