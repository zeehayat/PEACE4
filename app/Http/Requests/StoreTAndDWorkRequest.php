<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Relations\Relation; // <--- ADD THIS IMPORT

class StoreTAndDWorkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
       // return $this->user()->hasAnyRole(['mhp', 'root', 'admin']);
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {


        // The projectable_id and projectable_type will likely come from the route or hidden fields
        // e.g., for MHP, projectable_id will be mhp_site_id, projectable_type will be 'App\Models\MhpSite'
        return [
            'projectable_id' => ['nullable', 'integer'],
            'projectable_type' => ['nullable', 'string', Rule::in(['App\\Models\\MhpSite', 'App\\Models\\IrrigationScheme'])],
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
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
        ];
    }
}
