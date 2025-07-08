<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class IrrigationCompletion extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\IrrigationCompletionFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'irrigation_scheme_id',
        'scheme_handover_date', // RENAMED: from 'handover_date'
        'remarks',
        // NEW: Fields moved from irrigation_schemes
        'date_completion_civil_works',
        'handover_to_community_date',
    ];

    protected $casts = [
        'scheme_handover_date' => 'date', // RENAMED
        // NEW: Fields casting
        'date_completion_civil_works' => 'date',
        'handover_to_community_date' => 'date',
    ];

    public function scheme():BelongsTo
    {
        return $this->belongsTo(IrrigationScheme::class, 'irrigation_scheme_id');
    }

    public function attachments():MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
    }
}
