<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Query\Builder;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class MhpSite extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

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
        'financial_initiation_date',
        'physical_completion_date',
        'remarks',

        // --- NEW FIELDS FROM MIGRATION ---
        'observed_discharge',
        'intake_details',
        'settling_basin_details',
        'approach_culvert_details',
        'headrace_channel_details',
        'aqueduct_details',
        'tailrace_details',
        'spillway_details',
        'retaining_walls_details',
        'design_net_head',
        'proposed_capacity_kw',
        'length_ft',
        'bottom_width_ft',
        'design_depth_ft',
        'freeboard_ft',
        'velocity_ft_per_sec',
        // 'tentative_completion_years', // Excluded as per discussion
        // 'tentative_completion_months', // Excluded as per discussion
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
        'population' => 'integer',
        'total_hh' => 'integer',
        'domestic_units' => 'integer',
        'commercial_units' => 'integer',

        // --- NEW FIELDS CASTS ---
        'observed_discharge' => 'decimal:2',
        'design_net_head' => 'decimal:2',
        'proposed_capacity_kw' => 'decimal:2',
        'length_ft' => 'decimal:2',
        'bottom_width_ft' => 'decimal:2',
        'design_depth_ft' => 'decimal:2',
        'freeboard_ft' => 'decimal:2',
        'velocity_ft_per_sec' => 'decimal:2',
        // 'tentative_completion_years' => 'integer', // Excluded as per discussion
        // 'tentative_completion_months' => 'integer', // Excluded as per discussion
    ];
    /**
     * Scope a query to only include MHP Sites appropriate for the given user.
     */
    public function scopeForUser(Builder $query, User $user): void
    {
        // If the user has a district-level role, join with the CBO table
        // and filter by the user's district.
        if ($user->hasAnyRole(['M&E-DISTRICT', 'Engineer-DISTRICT', 'KPO-DISTRICT', 'Viewer-DISTRICT'])) {
            $query->whereHas('cbo', function (Builder $cboQuery) use ($user) {
                $cboQuery->where('district', $user->district->name);
            });
        }
        // Head Office users will see all sites because the condition is false for them.
    }
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

    // Accessor for Project ID (CBO_CODE/MHP-ID)
    public function getProjectIdAttribute(): string
    {
        // Eager load CBO if not already loaded to prevent N+1 queries
        if (!$this->relationLoaded('cbo')) {
            $this->load('cbo');
        }
        return ($this->cbo->reference_code ?? 'N/A') . '/MHP-' . $this->id;
    }
    public function physicalProgresses()
    {
        return $this->morphMany(\App\Models\ProjectPhysicalProgress::class, 'projectable');
    }

    public function latestPhysicalProgress()
    {
        return $this->morphOne(\App\Models\ProjectPhysicalProgress::class, 'projectable')
            ->latestOfMany('progress_date');
    }

    public function latestFinancialInstallment(): HasOne
    {
        return $this->hasOne(ProjectFinancialInstallment::class, 'projectable_id')
            ->where('projectable_type', MhpSite::class)
            ->latest('installment_date');
    }
}
