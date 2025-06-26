<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class MhpEmeProgress extends Model
{
    /** @use HasFactory<\Database\Factories\MhpEmeProgressFactory> */
    use HasFactory;


    use Illuminate\Database\Eloquent\Model;


    protected $fillable = [
        'mhp_site_id',
        'milestone_percent',
        'progress_date',
        'remarks',
    ];

    public function mhpSite():BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }

    public function attachments():MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }


}
