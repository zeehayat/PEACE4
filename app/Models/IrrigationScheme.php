<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;
use Illuminate\Database\Eloquent\Builder;
class IrrigationScheme extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'cbo_id',
        'status',
        'remarks',
        'scheme_type',
        'sub_scheme_type',
        'number_of_watercourses',
        'water_availability_cusecs',
    ];

    protected $casts = [
        'water_availability_cusecs' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($scheme) {
            if ($scheme->profile) {
                $scheme->profile->delete();
            }
            if ($scheme->adminApproval) {
                $scheme->adminApproval->delete();
            }
            if ($scheme->irrigation_completion) {
                $scheme->irrigation_completion->delete();
            }
            if ($scheme->irrigationSchemeContract) {
                $scheme->irrigationSchemeContract->delete();
            }

            if ($scheme->physicalProgresses) {
                $scheme->physicalProgresses->each(fn ($progress) => $progress->delete());
            }
            if ($scheme->financialInstallments) {
                $scheme->financialInstallments->each(fn ($installment) => $installment->delete());
            }
        });
    }
    public function scopeForUser(Builder $query, User $user): void
    {
        // If the user has a district-level role, join with the CBO table
        // and filter by the user's district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            $query->whereHas('cbo', function (Builder $cboQuery) use ($user) {
                $cboQuery->where('district', $user->district->name);
            });
        }
        // Head Office users will see all schemes because the condition is false for them.
    }

    // --- Relationships ---
    public function cbo(): BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }

    public function profile(): HasOne
    {
        return $this->hasOne(IrrigationSchemeProfile::class);
    }

    public function adminApproval(): HasOne
    {
        return $this->hasOne(IrrigationAdminApproval::class);
    }

    public function irrigation_completion(): HasOne
    {
        return $this->hasOne(IrrigationCompletion::class);
    }

    public function irrigationSchemeContract(): HasOne
    {
        return $this->hasOne(IrrigationSchemeContract::class);
    }



    public function financialInstallments(): MorphMany
    {
        return $this->morphMany(ProjectFinancialInstallment::class, 'projectable');
    }

    // FIX: Add custom relationships for fetching the latest records
    public function physicalProgresses()
    {
        return $this->morphMany(\App\Models\ProjectPhysicalProgress::class, 'projectable');
    }

    public function latestPhysicalProgress()
    {
        return $this->morphOne(\App\Models\ProjectPhysicalProgress::class, 'projectable')
            ->latestOfMany('progress_date');
    }

    public function latestFinancialInstallment(): MorphOne
    {
        return $this->morphOne(\App\Models\ProjectFinancialInstallment::class, 'projectable')
            ->latestOfMany('installment_date');
    }
    // --- Spatie Media Library ---
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments');
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
