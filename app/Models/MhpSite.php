<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class MhpSite extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    // Using $fillable for explicit control (recommended over $guarded = [])
    protected $fillable = [
        'cbo_id',
        'month_year_establishment',
        'established_by',
        'population',
        'grid_status',
        'status', // 'New', 'Rehabilitation', 'Upgradation'
        'existing_capacity_kw',
        'planned_capacity_kw',
        'head_ft',
        'design_discharge_cusecs',
        'channel_length_km',
        'tl_ht_km',
        'tl_lt_km',
        // 'transformers', // Removed - details now in TAndDWork
        'turbine_type',
        'alternator_type',
        'accessible',
        'domestic_units',
        'commercial_units',
        'estimated_cost',
        'per_kw_cost',
        'total_hh',
        'avg_hh_size',
        'cost_per_capita',
        'tentative_completion_date',
        'financial_initiation_date', // Added from DB schema
        'physical_completion_date',   // Added from DB schema
        'remarks',
    ];

    protected $casts = [
        'month_year_establishment' => 'date',
        'tentative_completion_date' => 'date',
        'financial_initiation_date' => 'date',
        'physical_completion_date' => 'date',
        'existing_capacity_kw' => 'decimal:2',
        'planned_capacity_kw' => 'decimal:2',
        'head_ft' => 'decimal:2',
        'design_discharge_cusecs' => 'decimal:2',
        'channel_length_km' => 'decimal:2',
        'tl_ht_km' => 'decimal:2',
        'tl_lt_km' => 'decimal:2',
        'estimated_cost' => 'decimal:2',
        'per_kw_cost' => 'decimal:2',
        'avg_hh_size' => 'decimal:2',
        'cost_per_capita' => 'decimal:2',
        'population' => 'integer', // Cast population to integer
        'total_hh' => 'integer',   // Cast total_hh to integer
        'domestic_units' => 'integer',
        'commercial_units' => 'integer',
    ];

    // --- Relationships ---
    public function cbo(): BelongsTo
    {
        return $this->belongsTo(Cbo::class);
    }

    public function adminApproval(): HasOne
    {
        return $this->hasOne(MhpAdminApproval::class, 'mhp_site_id');
    }

    public function completion(): HasOne
    {
        return $this->hasOne(MhpCompletion::class, 'mhp_site_id');
    }

    public function operationalCosts(): HasMany
    {
        return $this->hasMany(OperationalCost::class);
    }

    public function revenueRecords(): HasMany
    {
        return $this->hasMany(RevenueRecord::class);
    }

    // Polymorphic relationship to its own T&D Works
    public function tAndDWorks(): MorphMany
    {
        return $this->morphMany(TAndDWork::class, 'projectable');
    }

    // Polymorphic relationships to Physical and Financial Progress
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
        $this->addMediaCollection('attachments'); // Main attachments for the site
    }

    // Accessor for formatted attachments for frontend
    protected $appends = ['attachments_frontend', 'project_id'];

    public function getAttachmentsFrontendAttribute():array
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

    // Accessor for Project ID (CBO_CODE/MHP-ID)
    public function getProjectIdAttribute(): string
    {
        // Eager load CBO if not already loaded to prevent N+1 queries
        if (!$this->relationLoaded('cbo')) {
            $this->load('cbo');
        }
        return ($this->cbo->reference_code ?? 'N/A') . '/MHP-' . $this->id;
    }
}
