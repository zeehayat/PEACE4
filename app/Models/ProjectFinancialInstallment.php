<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ProjectFinancialInstallment extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ProjectFinancialInstallmentFactory> */
    use HasFactory, InteractsWithMedia;
    protected $fillable = [
        'projectable_id',
        'projectable_type',
        'installment_number',
        'installment_date',
        'installment_amount',
        'category',
        'remarks',
        'progress_type',
        't_and_d_work_id',
    ];

    public function projectable(): MorphTo
    {
        return $this->morphTo();
    }

    // NEW: Relationship to TAndDWork
    public function tAndDWork(): BelongsTo
    {
        return $this->belongsTo(TAndDWork::class, 't_and_d_work_id');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }
}
