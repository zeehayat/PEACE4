<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectFinancialInstallmentRequest extends FormRequest
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
            'installment_number' => ['required', 'integer', 'min:1'],
            'installment_date' => ['required', 'date'],
            'installment_amount' => ['required', 'numeric', 'min:0'],
            'category' => ['nullable', 'string', 'max:255'],
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
            $rules['activity_id'] = ['nullable'];
            $rules['activity_type'] = ['nullable'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'payment_for.required' => 'The activity type (Payment For) is required.',
            'activity_id.required' => 'A specific T&D work must be selected for T&D financial installment.',
            'activity_id.exists' => 'The selected T&D work does not exist.',
            'installment_number.required' => 'The installment number is required.',
            'installment_number.min' => 'The installment number must be at least 1.',
            'installment_date.required' => 'The installment date is required.',
            'installment_amount.required' => 'The installment amount is required.',
            'installment_amount.min' => 'The installment amount must be a positive value.',
        ];
    }
}
