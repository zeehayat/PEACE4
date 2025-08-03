<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateIrrigationSchemeContractRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'irrigation_scheme_id' => ['required', 'exists:irrigation_schemes,id'],
            'vendor_id' => ['nullable', 'exists:vendors,id'],
            'approved_vendor' => ['nullable', 'string', 'max:255'],
            'date_of_agreement_contract' => ['required', 'date'],
            'date_of_physical_start' => ['required', 'date'],
            'agreement_cost' => ['required', 'numeric', 'min:0'],
            'remarks' => ['nullable', 'string'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
            'attachments_to_delete' => ['nullable', 'array'],
            'attachments_to_delete.*' => ['exists:media,id'],
        ];
    }
}
