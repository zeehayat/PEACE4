<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class MhpAdminApproval extends Model
{
    /** @use HasFactory<\Database\Factories\MhpAdminApprovalFactory> */
    use HasFactory;
    protected $fillable = [
        'mhp_site_id', 'eu_approval_date', 'approved_cost',
        'revised_cost_1', 'revised_cost_2', 'revised_cost_3',
        'hpp_inauguration_date',
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
