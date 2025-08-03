<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreIrrigationAdminApprovalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'irrigation_scheme_id' => ['required', 'exists:irrigation_schemes,id'],
            'approved_cost' => ['required', 'numeric', 'min:0'],
            'date_technical_surveys' => ['required', 'date'],
            'date_design_estimates_submission_psu' => ['required', 'date'],
            'date_validation_visit_psu' => ['required', 'date'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
        ];
    }
}
