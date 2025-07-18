<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectPhysicalProgressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasAnyRole(['mhp', 'mhp-irrigation', 'root', 'admin']);
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $rules = [
            'projectable_id' => ['required', 'integer'],
            'projectable_type' => ['required', 'string', Rule::in(['App\\Models\\MhpSite', 'App\\Models\\IrrigationScheme'])],
            'progress_percentage' => ['required', 'numeric', 'min:0', 'max:100'],
            'progress_date' => ['required', 'date'],
            'remarks' => ['nullable', 'string'],
            'payment_for' => ['required', Rule::in(['T&D', 'EME', 'Civil'])],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
        ];

        // Conditional validation based on 'payment_for'
        if ($this->input('payment_for') === 'T&D') {
            $rules['activity_id'] = ['required', 'exists:transmission_and_distribution_works,id'];
            $rules['activity_type'] = ['required', 'string', Rule::in(['App\\Models\\TAndDWork'])];
        } else {
            // For EME and Civil, activity_id/type should be null
            $rules['activity_id'] = ['nullable'];
            $rules['activity_type'] = ['nullable'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'payment_for.required' => 'The activity type (Payment For) is required.',
            'activity_id.required' => 'A specific T&D work must be selected for T&D progress.',
            'activity_id.exists' => 'The selected T&D work does not exist.',
            'progress_percentage.required' => 'The progress percentage is required.',
            'progress_percentage.between' => 'The progress percentage must be between 0 and 100.',
            'progress_date.required' => 'The progress date is required.',
        ];
    }
}
