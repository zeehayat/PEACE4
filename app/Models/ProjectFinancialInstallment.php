<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ProjectFinancialInstallment extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFinancialInstallmentFactory> */
    use HasFactory;
    protected $fillable = [
        'installment_number',
        'installment_date',
        'installment_amount',
        'remarks',
    ];

    public function projectable():MorphTo
    {
        return $this->morphTo();
    }

    public function attachments():MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
