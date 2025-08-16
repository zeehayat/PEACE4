<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;
use Illuminate\Database\Eloquent\Builder;
class LrmCommittee extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'cbo_id',
        'date_of_lrm_committee_formation',
        'no_of_lrm_committee_members',
        'date_of_nrm_plan_finalization',
        'has_afforestation_reforestation',
        'forest_plants',
        'fruit_plants',
        'total_land_covered_hectares',
        'remarks',
    ];

    protected $casts = [
        'date_of_lrm_committee_formation' => 'date',
        'no_of_lrm_committee_members' => 'integer',
        'date_of_nrm_plan_finalization' => 'date',
        'has_afforestation_reforestation' => 'boolean',
        'forest_plants' => 'array', // Cast JSON to array
        'fruit_plants' => 'array',   // Cast JSON to array
        'total_land_covered_hectares' => 'decimal:2',
    ];

    /**
     * The "booting" method of the model.
     * Ensures related media is deleted when LrmCommittee is deleted.
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($lrmCommittee) {
            // Spatie Media Library's InteractsWithMedia trait handles deleting associated media files.
            // If LRM Committee had any HasMany relationships that are NOT cascade deleted by DB,
            // you'd add $lrmCommittee->relatedModels->each(fn($model) => $model->delete()); here.
        });
    }
    public function scopeForUser(Builder $query, User $user): void
    {
        // If the user has a district-level role, filter by the user's district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            $query->whereHas('cbo', function (Builder $cboQuery) use ($user) {
                $cboQuery->where('district', $user->district->name);
            });
        }
        // Head Office users will see all committees.
    }
    // --- Relationships ---
    public function cbo(): BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }

    // --- Spatie Media Library ---
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments'); // Main attachments for the LRM Committee
    }

    protected $appends = ['attachments_frontend'];

    public function getAttachmentsFrontendAttribute(): array
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
