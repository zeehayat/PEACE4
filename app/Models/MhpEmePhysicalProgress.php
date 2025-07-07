<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class MhpEmePhysicalProgress extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    protected $table = 'mhp_eme_physical_progresses';

    protected $fillable = [
        'mhp_site_id',
        'milestone_percent',
        'date',
        'works',
        'remarks',
    ];

    /**
     * Get the MHP site this progress belongs to.
     */
    public function mhpSite(): BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }
}
