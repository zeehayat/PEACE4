<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVendorRequest extends FormRequest
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
        // Get the Vendor ID from the route for unique validation
        $vendorId = $this->route('vendor'); // Assuming route model binding: /vendors/{vendor}

        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('vendors', 'name')->ignore($vendorId)],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string'],
            'ntn_no' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', Rule::in(['APPROVED', 'NEW', 'BLACK-LISTED', 'UNAPPROVED', 'OLD'])], // New field
            'remarks' => ['nullable', 'string'], // New field
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
            'attachments_to_delete' => ['nullable', 'array'],
            'attachments_to_delete.*' => ['exists:media,id'],
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
            'attachments_to_delete.*.exists' => 'One or more attachment IDs to delete are invalid.',
        ];
    }
}
