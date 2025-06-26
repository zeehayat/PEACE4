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
    protected $fillable = [
        'cbo_id', 'population', 'grid_status', 'status',
        'existing_capacity_kw', 'planned_capacity_kw', 'head_ft',
        'design_discharge_cusecs', 'channel_length_km', 'tl_ht_km',
        'tl_lt_km', 'transformers', 'turbine_type', 'alternator_type',
        'accessible', 'domestic_units', 'commercial_units',
        'estimated_cost', 'per_kw_cost', 'total_hh',
        'avg_hh_size', 'cost_per_capita',
    ];

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
