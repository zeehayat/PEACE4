<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OmCost extends Model
{
    /** @use HasFactory<\Database\Factories\OmCostFactory> */
    use HasFactory;
    protected $fillable = [
        'mhp_site_id',
        'cost_date',
        'o_and_m_cost',
        'rehab_reconstruction_cost',
        'repair_civil_work_cost',
        'repair_tnd_cost',
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
