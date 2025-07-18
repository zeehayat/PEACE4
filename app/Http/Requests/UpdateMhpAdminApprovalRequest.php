<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMhpAdminApprovalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming route model binding: /mhp/admin-approvals/{admin_approval}
        $adminApproval = $this->route('admin_approval');
        // You might add a policy check here: $this->user()->can('update', $adminApproval);
        return $this->user()->hasAnyRole(['mhp', 'root', 'admin']);
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'mhp_site_id' => ['required', 'exists:mhp_sites,id'],
            'eu_approval_date' => ['nullable', 'date'],
            'approved_cost' => ['nullable', 'numeric', 'min:0'],
            'revised_cost_1' => ['nullable', 'numeric', 'min:0'],
            'revised_cost_2' => ['nullable', 'numeric', 'min:0'],
            'revised_cost_3' => ['nullable', 'numeric', 'min:0'],
            'hpp_inauguration_date' => ['nullable', 'date'],
            'technical_survey_date' => ['nullable', 'date'],
            'date_design_psu_submission' => ['nullable', 'date'],
            'headoffice_review_submission_date' => ['nullable', 'date'],
            'design_estimate_date' => ['nullable', 'date'],
            'eu_approval_submission_date' => ['nullable', 'date'],
            'opm_validation_date' => ['nullable', 'date'],
            'remarks' => ['nullable', 'string'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
            'attachments_to_delete' => ['nullable', 'array'],
            'attachments_to_delete.*' => ['exists:media,id'],
        ];
    }
}
