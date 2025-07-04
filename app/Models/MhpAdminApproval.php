<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class MhpAdminApproval extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\MhpAdminApprovalFactory> */
    use HasFactory, InteractsWithMedia;
    protected $fillable = [
        'mhp_site_id',
        'eu_approval_date',
        'approved_cost',
        'revised_cost_1',
        'revised_cost_2',
        'revised_cost_3',
        'hpp_inauguration_date',
        'revised_cost_1',
        'revised_cost_2',
        'revised_cost_3',

        // newly added date fields
        'technical_survey_date',
        'date_design_psu_submission',
        'headoffice_review_submission_date',
        'design_estimate_date',
        'eu_approval_submission_date',
        'opm_validation_date',
    ];
    protected $casts = [
        'technical_survey_date' => 'date',
        'date_design_psu_submission' => 'date',
        'headoffice_review_submission_date' => 'date',
        'design_estimate_date' => 'date',
        'eu_approval_submission_date' => 'date',
        'opm_validation_date' => 'date',
        'hpp_inauguration_date'=>'date',
    ];

    public function mhpSite():BelongsTo
    {
        return $this->belongsTo(MhpSite::class);
    }

}
