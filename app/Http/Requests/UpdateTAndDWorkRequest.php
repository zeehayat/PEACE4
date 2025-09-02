<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTAndDWorkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming route model binding: /mhp/t-and-d-works/{t_and_d_work}
        $tAndDWork = $this->route('t_and_d_work');
        // You might add a policy check here: $this->user()->can('update', $tAndDWork);
       // return $this->user()->hasAnyRole(['mhp', 'root', 'admin']);
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // projectable_id and type are generally fixed after creation,
            // but might be included for consistency if controller always expects them.
//            'projectable_id' => ['required', 'integer'],
//            'projectable_type' => ['required', 'string', Rule::in(['App\\Models\\MhpSite', 'App\\Models\\IrrigationScheme'])],
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
            'attachments_to_delete' => ['nullable', 'array'],
            'attachments_to_delete.*' => ['exists:media,id'],
        ];
    }
}
