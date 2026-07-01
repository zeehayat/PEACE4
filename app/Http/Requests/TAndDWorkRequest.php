<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Relations\Relation; // ADD THIS IMPORT

class TAndDWorkRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        // Get valid morph aliases for projectable types
        // This will give ['mhp_site', 'irrigation_scheme'] (if irrigation exists)
        //$validProjectableTypes = array_keys(Relation::getMorphMap());

        return [
            //'projectable_id' => ['nullable', 'integer'],
            // FIX: Use the keys (aliases) from the morph map for Rule::in
            //'projectable_type' => ['nullable', 'string', Rule::in($validProjectableTypes)],
            'name' => ['nullable', 'string', 'max:255'],
            'date_of_initiation' => ['nullable', 'date'],
            'step_up_transformers' => ['nullable', 'array'],
            'step_up_transformers.*.kva' => ['nullable', 'numeric', 'min:0'],
            'step_up_transformers.*.qty' => ['nullable', 'integer', 'min:0'],
            'step_down_transformers' => ['nullable', 'array'],
            'step_down_transformers.*.kva' => ['nullable', 'numeric', 'min:0'],
            'step_down_transformers.*.qty' => ['nullable', 'integer', 'min:0'],
            'ht_poles_quantity' => ['nullable', 'integer', 'min:0'],
            'lt_poles_quantity' => ['nullable', 'integer', 'min:0'],
            'ht_conductor_length_km' => ['nullable', 'numeric', 'min:0'],
            'ht_conductor_type' => ['nullable', 'string', 'max:255'],
            'lt_conductor_length_km' => ['nullable', 'numeric', 'min:0'],
            'lt_conductor_type' => ['nullable', 'string', 'max:255'],
            'scope_of_work' => ['nullable', 'string'],
            'remarks' => ['nullable', 'string'],
            'estimated_cost' => ['nullable', 'numeric', 'min:0'],
            'completion_date' => ['nullable', 'date'],
            'advertisement_date' => ['nullable', 'date'],
            'pre_bid_meeting_date' => ['nullable', 'date'],
            'technical_bid_opening_date' => ['nullable', 'date'],
            'financial_bid_opening_date' => ['nullable', 'date'],
            'contract_award_date' => ['nullable', 'date'],
            'contractor_amount' => ['nullable', 'numeric', 'min:0'],
            'financial_progress_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'amount_disbursed' => ['nullable', 'numeric', 'min:0'],
            'amount_remaining' => ['nullable', 'numeric', 'min:0'],
            'physical_progress_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'progress_description' => ['nullable', 'string'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
        ];
    }
}
