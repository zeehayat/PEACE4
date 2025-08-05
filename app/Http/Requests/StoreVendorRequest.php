<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVendorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Will be updated later with ACL
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:vendors,name'],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string'],
            'ntn_no' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', Rule::in(['APPROVED', 'NEW', 'BLACK-LISTED', 'UNAPPROVED', 'OLD'])], // New field
            'remarks' => ['nullable', 'string'], // New field
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'], // Max 10MB per file
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'name.unique' => 'A vendor with this name already exists.',
            'status.in' => 'The selected status is invalid.',
            'attachments.*.max' => 'Each attachment may not be larger than 10 MB.',
        ];
    }
}
