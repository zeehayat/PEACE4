<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class MhpEmeFinancialProgress extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    protected $table = 'mhp_eme_financial_progresses';

    protected $fillable = [
        'mhp_site_id',
        'installment_number',
        'initiation_date',
        'date',
        'amount',
        'cheque_no',
        'remaining_amount',
    ];

    /**
     * Get the MHP site this progress belongs to.
     */
    public function mhpSite(): BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }
}
