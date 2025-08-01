<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class IrrigationScheme extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'cbo_id',
        'status',
        'remarks',
    ];

    protected $casts = [
        // No specific casts needed for the core fields
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($scheme) {
            $scheme->profile->delete();
            // We need to trigger the deletion of the approval record to cascade its children
            $scheme->adminApproval->delete(); // <--- Delete the related approval record
            $scheme->physicalProgresses->each(fn ($progress) => $progress->delete());
            $scheme->financialInstallments->each(fn ($installment) => $installment->delete());
        });
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

    // Relationship to the new approval table
    public function adminApproval(): HasOne
    {
        return $this->hasOne(IrrigationAdminApproval::class);
    }

    public function physicalProgresses(): MorphMany
    {
        return $this->morphMany(ProjectPhysicalProgress::class, 'projectable');
    }

    public function financialInstallments(): MorphMany
    {
        return $this->morphMany(ProjectFinancialInstallment::class, 'projectable');
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
