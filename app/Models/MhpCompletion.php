<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpCompletion extends Model
{
    /** @use HasFactory<\Database\Factories\MhpCompletionFactory> */
    use HasFactory;
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

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
