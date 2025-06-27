<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrrigationAdminApproval extends Model
{
    /** @use HasFactory<\Database\Factories\IrrigationAdminApprovalFactory> */
    use HasFactory;
    protected $fillable = [
        'irrigation_scheme_id',
        'eu_approval_date',
        'approved_cost',
        'civil_work_start_date',
        'scheme_inauguration_date',
    ];

    public function scheme()
    {
        return $this->belongsTo(IrrigationScheme::class, 'irrigation_scheme_id');
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
