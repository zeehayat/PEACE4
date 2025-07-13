<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MhpAdminApprovalRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'mhp_site_id' => ['required', 'exists:mhp_sites,id'], // This is required
            'eu_approval_date' => ['nullable', 'date'], // Make nullable if optional
            'approved_cost' => ['nullable', 'numeric', 'min:0'], // Make nullable if optional
            'civil_work_start_date' => ['nullable', 'date'], // Make nullable if optional
            'scheme_inauguration_date' => ['nullable', 'date'], // Make nullable if optional

            // FIX: Ensure all these date fields are 'nullable' if they are optional
            'date_design_estimates_submission_psu' => ['nullable', 'date'],
            'date_design_estimates_submission_opm_eu_review' => ['nullable', 'date'],
            'date_validation_visit_opm' => ['nullable', 'date'],
            'hpp_inauguration_date' => ['nullable', 'date'], // Add this if it's new
            'technical_survey_date' => ['nullable', 'date'], // Add this if it's new
            'headoffice_review_submission_date' => ['nullable', 'date'], // Add this if it's new
            'design_estimate_date' => ['nullable', 'date'], // Add this if it's new
            'eu_approval_submission_date' => ['nullable', 'date'], // Add this if it's new
            'opm_validation_date' => ['nullable', 'date'], // Add this if it's new

            'attachments.*' => ['nullable', 'file', 'max:20480'],
            'removed_attachments' => ['nullable', 'array'],
            'removed_attachments.*' => ['exists:media,id'],
        ];
    }
}
