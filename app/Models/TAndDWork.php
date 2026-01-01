<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class TAndDWork extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $table = 'transmission_and_distribution_works';

    protected $fillable = [
        'projectable_id',
        'projectable_type',

        'name',
        'date_of_initiation',
        'step_up_transformers',
        'step_down_transformers',
        'ht_poles_quantity',
        'lt_poles_quantity',
        'ht_conductor_length_km',
        'ht_conductor_type',
        'lt_conductor_length_km',
        'lt_conductor_type',
        'scope_of_work',
        'estimated_cost',
        'completion_date',
        // Procurement
        'advertisement_date',
        'pre_bid_meeting_date',
        'technical_bid_opening_date',
        'financial_bid_opening_date',
        'contract_award_date',
        'contractor_amount',
        // Progress
        'financial_progress_percent',
        'amount_disbursed',
        'amount_remaining',
        'physical_progress_percent',
        'progress_description',
        'remarks',
    ];

    protected $casts = [
        'date_of_initiation' => 'date',
        'step_up_transformers' => 'array',
        'step_down_transformers' => 'array',
        'ht_conductor_length_km' => 'decimal:2',
        'lt_conductor_length_km' => 'decimal:2',
        'estimated_cost' => 'decimal:2',
        'completion_date' => 'date',
        'advertisement_date' => 'date',
        'pre_bid_meeting_date' => 'date',
        'technical_bid_opening_date' => 'date',
        'financial_bid_opening_date' => 'date',
        'contract_award_date' => 'date',
        'contractor_amount' => 'decimal:2',
        'financial_progress_percent' => 'decimal:2',
        'amount_disbursed' => 'decimal:2',
        'amount_remaining' => 'decimal:2',
        'physical_progress_percent' => 'decimal:2',
    ];

    public function projectable(): MorphTo
    {
        return $this->morphTo();
    }

    public function physicalProgresses(): MorphMany
    {
        return $this->morphMany(ProjectPhysicalProgress::class, 'activity');
    }

    public function financialInstallments(): MorphMany
    {
        return $this->morphMany(ProjectFinancialInstallment::class, 'activity');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }

    protected $appends = ['attachments_frontend'];

    public function getAttachmentsFrontendAttribute()
    {
        return $this->getMedia('attachments')->map(fn (SpatieMedia $media) => [
            'id' => $media->id,
            'name' => $media->name,
            'file_name' => $media->file_name,
            'url' => $media->getUrl(),
            'size' => $media->size,
            'mime_type' => $media->mime_type,
        ])->toArray();
    }
}
