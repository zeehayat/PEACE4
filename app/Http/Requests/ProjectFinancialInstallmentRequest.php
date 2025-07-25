<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectFinancialInstallmentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'projectable_id' => ['nullable', 'integer'], // Changed from 'required'
            'projectable_type' => ['nullable', 'string', Rule::in(['App\\Models\\MhpSite', 'App\\Models\\IrrigationScheme'])], // Changed from 'required'
            'installment_number' => ['required', 'integer', 'min:1'],
            'installment_date' => ['required', 'date'],
            'installment_amount' => ['required', 'numeric', 'min:0'],
            'category' => ['nullable', 'string', 'max:255'],
            'remarks' => ['nullable', 'string'],
            'payment_for' => ['required', Rule::in(['T&D', 'EME', 'Civil'])],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
        ];
    }
}
