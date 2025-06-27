<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevenueRecord extends Model
{
    /** @use HasFactory<\Database\Factories\RevenueRecordFactory> */
    use HasFactory;
    protected $fillable = [
        'mhp_site_id',
        'billing_month',
        'connection_charges',
        'billing_amount',
        'line_rent_amount',
        'late_payment_surcharge',
        'fine_additional_cost',
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
