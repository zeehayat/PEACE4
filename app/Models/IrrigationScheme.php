<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrrigationScheme extends Model
{
    /** @use HasFactory<\Database\Factories\IrrigationSchemeFactory> */
    use HasFactory;
    protected $fillable = [
        'cbo_id',
        'status',
        'beneficiary_farmers',
        'channel_length_km',
        'land_area_hectares',
    ];

    public function cbo()
    {
        return $this->belongsTo(Cbo::class);
    }

    public function adminApproval()
    {
        return $this->hasOne(IrrigationAdminApproval::class);
    }

    public function completions()
    {
        return $this->hasOne(IrrigationCompletion::class);
    }

    public function costRevisions()
    {
        return $this->morphMany(ProjectCostRevision::class, 'approvable');
    }

    public function financialInstallments()
    {
        return $this->morphMany(ProjectFinancialInstallment::class, 'projectable');
    }

    public function physicalProgresses()
    {
        return $this->morphMany(ProjectPhysicalProgress::class, 'projectable');
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
