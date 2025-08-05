<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLrmCommitteeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Will be updated later with ACL
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'cbo_id' => ['required', 'exists:cbos,id'],
            'date_of_lrm_committee_formation' => ['required', 'date'],
            'no_of_lrm_committee_members' => ['required', 'integer', 'min:1'],
            'date_of_nrm_plan_finalization' => ['nullable', 'date', 'after_or_equal:date_of_lrm_committee_formation'],
            'has_afforestation_reforestation' => ['required', 'boolean'],
            'forest_plants' => ['nullable', 'array'],
            'forest_plants.*' => ['string', 'max:255'], // Each plant name
            'fruit_plants' => ['nullable', 'array'],
            'fruit_plants.*' => ['string', 'max:255'], // Each fruit plant name
            'total_land_covered_hectares' => ['nullable', 'numeric', 'min:0'],
            'remarks' => ['nullable', 'string'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'], // Max 10MB per file
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'cbo_id.exists' => 'The selected CBO does not exist.',
            'no_of_lrm_committee_members.min' => 'Number of LRM Committee Members must be at least 1.',
            'date_of_nrm_plan_finalization.after_or_equal' => 'NRM Plan Finalization Date must be after or equal to Committee Formation Date.',
            'total_land_covered_hectares.min' => 'Total Land Covered must be a non-negative number.',
            'attachments.*.max' => 'Each attachment may not be larger than 10 MB.',
        ];
    }
}
