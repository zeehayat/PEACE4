<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class IrrigationSchemeContract extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'irrigation_scheme_id',
        'vendor_id', // Foreign key to the vendors table
        'date_civil_work_initiation',
        'contract_amount',
    ];

    protected $casts = [
        'date_civil_work_initiation' => 'date',
        'contract_amount' => 'decimal:2', // Cast to decimal with 2 places
    ];

    // Relationship to the IrrigationScheme
    public function irrigationScheme(): BelongsTo
    {
        return $this->belongsTo(IrrigationScheme::class);
    }

    // Relationship to the Vendor (contractor)
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }
}
