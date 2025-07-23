<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMhpSiteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // For now, returning true as ACL is not implemented. Revert to authorization logic later.
        return true;
        // Example with user roles (if re-enabled later):
        // return $this->user()->hasAnyRole(['mhp', 'mhp-irrigation', 'root', 'admin']);
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'cbo_id' => ['required', 'exists:cbos,id'],
            'month_year_establishment' => ['nullable', 'date'],
            'established_by' => ['nullable', 'string', 'max:255'],
            'population' => ['nullable', 'integer', 'min:0'],
            'grid_status' => ['required', Rule::in(['On-Grid', 'Off-Grid', 'Partially on-Grid'])],
            'status' => ['required', Rule::in(['New', 'Rehabilitation', 'Upgradation'])], // Ensure 'Rehabilitation' matches enum
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

            // --- NEW FIELDS VALIDATION RULES ---
            'observed_discharge' => ['nullable', 'numeric', 'min:0'],
            'intake_details' => ['nullable', 'string'],
            'settling_basin_details' => ['nullable', 'string'],
            'approach_culvert_details' => ['nullable', 'string'],
            'headrace_channel_details' => ['nullable', 'string'],
            'aqueduct_details' => ['nullable', 'string'],
            'tailrace_details' => ['nullable', 'string'],
            'spillway_details' => ['nullable', 'string'],
            'retaining_walls_details' => ['nullable', 'string'],
            'design_net_head' => ['nullable', 'numeric', 'min:0'],
            'proposed_capacity_kw' => ['nullable', 'numeric', 'min:0'],
            'length_ft' => ['nullable', 'numeric', 'min:0'],
            'bottom_width_ft' => ['nullable', 'numeric', 'min:0'],
            'design_depth_ft' => ['nullable', 'numeric', 'min:0'],
            'freeboard_ft' => ['nullable', 'numeric', 'min:0'],
            'velocity_ft_per_sec' => ['nullable', 'numeric', 'min:0'],

            // --- ATTACHMENTS VALIDATION ---
            'attachments' => ['nullable', 'array'], // Array of new files to upload
            'attachments.*' => ['file', 'max:10240'], // Max 10MB per file, adjust as needed
            // No attachments_to_delete for store request
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     */
    public function messages(): array
    {
        return [
            'cbo_id.required' => 'The CBO is required.',
            'cbo_id.exists' => 'The selected CBO does not exist.',
            'grid_status.required' => 'The grid status is required.',
            'status.required' => 'The site status is required.',
            'attachments.*.file' => 'Each attachment must be a file.',
            'attachments.*.max' => 'Each attachment may not be larger than 10 MB.',
            'tentative_completion_date.after_or_equal' => 'The tentative completion date must be after or equal to the establishment date.',
            'physical_completion_date.after_or_equal' => 'The physical completion date must be after or equal to the financial initiation date.',
            // Add custom messages for new fields if desired
            '*.numeric' => 'The :attribute must be a number.',
            '*.min' => 'The :attribute must be at least :min.',
            '*.string' => 'The :attribute must be a string.',
            '*.date' => 'The :attribute must be a valid date.',
        ];
    }
}
