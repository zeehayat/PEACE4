<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class MhpAdminApproval extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'mhp_site_id',
        'eu_approval_date',
        'approved_cost',
        'revised_cost_1',
        'revised_cost_2',
        'revised_cost_3',
        'hpp_inauguration_date',
        'technical_survey_date',
        'date_design_psu_submission',
        'headoffice_review_submission_date',
        'design_estimate_date',
        'eu_approval_submission_date',
        'opm_validation_date',
        // Assuming 'civil_work_start_date' and 'mhp_inauguration_date' from your original schema
        // are covered by or superseded by 'hpp_inauguration_date' or other specific date fields.
        // If you need them distinctly, ensure they are in your migration and add them here.
        'remarks',
    ];

    protected $casts = [
        'eu_approval_date' => 'date',
        'approved_cost' => 'decimal:2',
        'revised_cost_1' => 'decimal:2',
        'revised_cost_2' => 'decimal:2',
        'revised_cost_3' => 'decimal:2',
        'hpp_inauguration_date' => 'date',
        'technical_survey_date' => 'date',
        'date_design_psu_submission' => 'date',
        'headoffice_review_submission_date' => 'date',
        'design_estimate_date' => 'date',
        'eu_approval_submission_date' => 'date',
        'opm_validation_date' => 'date',
    ];

    public function mhpSite(): BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }

    // --- Spatie Media Library ---
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
