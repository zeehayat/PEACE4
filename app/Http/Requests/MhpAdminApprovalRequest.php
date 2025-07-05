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
            'mhp_site_id'=>'required|exists:mhp_sites,id',
            'eu_approval_date'=>'required|date',
            'approved_cost'=>'required|numeric',
            'revised_cost_1'=>'nullable|numeric',
            'revised_cost_2'=>'nullable|numeric',
            'revised_cost_3'=>'nullable|numeric',
            'hpp_inauguration_date'=>'required|date',

            // newly added date fields
            'technical_survey_date'=>'required|date',
            'date_design_psu_submission'=>'required|date',
            'headoffice_review_submission_date'=>'required|date',
            'design_estimate_date'=>'required|date',
            'eu_approval_submission_date'=>'required|date',
            'opm_validation_date'=>'required|date',
            'attachments.*' => 'nullable|file|max:20480',
        ];
    }
}
