<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TAndDWorkRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Adjust authorization logic as needed, e.g., using Gates or Policies
        return true;
    }

    public function rules(): array
    {
        // Define all validation rules for T&D Work fields
        return [
            'projectable_id' => ['required', 'integer'], // ID of the parent MhpSite or IrrigationScheme
            'projectable_type' => ['required', 'string', 'in:App\\Models\\MhpSite,App\\Models\\IrrigationScheme'], // Fully qualified class name

            'date_of_initiation_of_t_and_d_works' => ['nullable', 'date'],
            'step_up_transformers' => ['nullable', 'array'],
            // Validate nested array elements for KVA and Count
            'step_up_transformers.*.kva' => ['required_with:step_up_transformers.*.count', 'integer'], // KVA required if count exists
            'step_up_transformers.*.count' => ['required_with:step_up_transformers.*.kva', 'integer', 'min:1'], // Count required if KVA exists

            'step_down_transformers' => ['nullable', 'array'],
            'step_down_transformers.*.kva' => ['required_with:step_down_transformers.*.count', 'integer'],
            'step_down_transformers.*.count' => ['required_with:step_down_transformers.*.kva', 'integer', 'min:1'],

            'ht_poles' => ['nullable', 'integer'],
            'lt_poles' => ['nullable', 'integer'],
            'ht_conductor_length_acsr_km' => ['nullable', 'numeric', 'min:0'],
            'ht_conductor_dia' => ['nullable', 'string', 'max:255'],
            'uaac_lt_conductor_length_km' => ['nullable', 'numeric', 'min:0'],
            'uaac_lt_conductor_dia' => ['nullable', 'string', 'max:255'],
            'remarks' => ['nullable', 'string', 'max:1000'],

            // Validation for attachments and removed_attachments
            'attachments.*' => ['nullable', 'file', 'max:20480'], // Max 20MB per file
            'removed_attachments' => ['nullable', 'array'],
            'removed_attachments.*' => ['exists:media,id'],
        ];
    }
}
