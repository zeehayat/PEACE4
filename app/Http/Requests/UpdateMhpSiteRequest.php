<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMhpSiteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Ensure user has permission and can update this specific site
        // You might add a policy check here: $this->user()->can('update', $this->route('site'));
       // return $this->user()->hasAnyRole(['mhp', 'mhp-irrigation', 'root', 'admin']);
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        // Retrieve the MhpSite instance being updated
        $site = $this->route('site'); // Assuming route model binding: /mhp/sites/{site}

        return [
            'cbo_id' => ['required', 'exists:cbos,id'],
            'month_year_establishment' => ['nullable', 'date'],
            'established_by' => ['nullable', 'string', 'max:255'],
            'population' => ['nullable', 'integer', 'min:0'],
            'grid_status' => ['required', Rule::in(['On-Grid', 'Off-Grid', 'Partially on-Grid'])],
            'status' => ['required', Rule::in(['New', 'Rehabilitation', 'Upgradation'])],
            'existing_capacity_kw' => ['nullable', 'numeric', 'min:0'],
            'planned_capacity_kw' => ['nullable', 'numeric', 'min:0'],
            'head_ft' => ['nullable', 'numeric', 'min:0'],
            'design_discharge_cusecs' => ['nullable', 'numeric', 'min:0'],
            'channel_length_km' => ['nullable', 'numeric', 'min:0'],
            'tl_ht_km' => ['nullable', 'numeric', 'min:0'],
            'tl_lt_km' => ['nullable', 'numeric', 'min:0'],
            'turbine_type' => ['nullable', 'string', 'max:255'],
            'alternator_type' => ['nullable', 'string', 'max:255'],
            'accessible' => ['nullable', Rule::in(['Yes', 'No'])],
            'domestic_units' => ['nullable', 'integer', 'min:0'],
            'commercial_units' => ['nullable', 'integer', 'min:0'],
            'estimated_cost' => ['nullable', 'numeric', 'min:0'],
            'per_kw_cost' => ['nullable', 'numeric', 'min:0'],
            'total_hh' => ['nullable', 'integer', 'min:0'],
            'avg_hh_size' => ['nullable', 'numeric', 'min:0'],
            'cost_per_capita' => ['nullable', 'numeric', 'min:0'],
            'tentative_completion_date' => ['nullable', 'date', 'after_or_equal:month_year_establishment'],
            'financial_initiation_date' => ['nullable', 'date'],
            'physical_completion_date' => ['nullable', 'date', 'after_or_equal:financial_initiation_date'],
            'remarks' => ['nullable', 'string'],
            'attachments' => ['nullable', 'array'], // For Spatie Media Library
            'attachments.*' => ['file', 'max:10240'],
            'attachments_to_delete' => ['nullable', 'array'], // Array of media IDs to delete
            'attachments_to_delete.*' => ['exists:media,id'], // Validate that IDs exist in media table
        ];
    }
    public function messages(): array
    {
        return [
            'cbo_id.required' => 'The CBO is required.',
            'cbo_id.exists' => 'The selected CBO does not exist.',
            'grid_status.required' => 'The grid status is required.',
            'status.required' => 'The site status is required.',
            'attachments.*.file' => 'Each attachment must be a file.',
            'attachments.*.max' => 'Each attachment may not be larger than 10 MB.',
            'attachments_to_delete.*.exists' => 'One or more attachment IDs to delete are invalid.',
            'tentative_completion_date.after_or_equal' => 'The tentative completion date must be after or equal to the establishment date.',
            'physical_completion_date.after_or_equal' => 'The physical completion date must be after or equal to the financial initiation date.',
        ];
    }
}
