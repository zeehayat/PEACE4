<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\MediaLibrary\HasMedia; // Assuming T&D Works can have media
use Spatie\MediaLibrary\InteractsWithMedia; // Assuming T&D Works can have media
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia; // For accessor type hint

class TAndDWork extends Model implements HasMedia // Implement HasMedia if it can have attachments
{
    use HasFactory, InteractsWithMedia; // Use InteractsWithMedia if it can have attachments

    protected $table = 'transmission_and_distribution_works'; // Explicitly define table name

    protected $fillable = [
        'projectable_id',
        'projectable_type',
        'date_of_initiation_of_t_and_d_works',
        'step_up_transformers',     // Will be cast to array/json
        'step_down_transformers',   // Will be cast to array/json
        'ht_poles',
        'lt_poles',
        'ht_conductor_length_acsr_km',
        'ht_conductor_dia',
        'uaac_lt_conductor_length_km',
        'uaac_lt_conductor_dia',
        'remarks',
    ];

    // CRITICAL: Cast JSON columns to array for easy handling in PHP
    protected $casts = [
        'date_of_initiation_of_t_and_d_works' => 'date',
        'step_up_transformers' => 'array',
        'step_down_transformers' => 'array',
        'ht_conductor_length_acsr_km' => 'decimal:2', // Cast to decimal with 2 places
        'uaac_lt_conductor_length_km' => 'decimal:2',
    ];

    // Polymorphic relationship to MhpSite or IrrigationScheme
    public function projectable(): MorphTo
    {
        return $this->morphTo();
    }

    // Spatie Media Library integration (if T&D Works can have attachments)
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }

    protected $appends = ['attachments_frontend']; // Append formatted attachments for frontend

    public function getAttachmentsFrontendAttribute()
    {
        return $this->getMedia('attachments')->map(function (SpatieMedia $media) {
            return [
                'id' => $media->id,
                'name' => $media->name,
                'file_name' => $media->file_name,
                'url' => $media->getUrl(),
                'size' => $media->size,
            ];
        })->toArray();
    }
}
