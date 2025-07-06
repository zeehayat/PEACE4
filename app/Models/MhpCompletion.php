<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class MhpCompletion extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\MhpCompletionFactory> */
    use HasFactory, InteractsWithMedia;
    protected $fillable = [
        'mhp_site_id',
        'scheme_inauguration_date',
        'testing_commissioning_date',
        'handover_date',
        'remarks',
    ];

    public function mhpSite()
    {
        return $this->belongsTo(MhpSite::class);
    }


}
