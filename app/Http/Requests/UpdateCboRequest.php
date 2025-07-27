<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCboRequest extends FormRequest
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
        // Get the CBO ID from the route for unique validation
        $cboId = $this->route('cbo'); // Assuming route model binding: /cbos/{cbo}

        return [
            'reference_code' => ['required', 'string', 'max:255', Rule::unique('cbos', 'reference_code')->ignore($cboId)],
            'district' => ['required', 'string', 'max:255'],
            'tehsil' => ['required', 'string', 'max:255'],
            'village_council' => ['required', 'string', 'max:255'],
            'village' => ['required', 'string', 'max:255'],
            'date_of_formation' => ['required', 'date'],
            'total_members' => ['required', 'integer', 'min:1'],
            'gender' => ['required', Rule::in(['Male', 'Female', 'Mixed'])],
            'num_cbo_members' => ['required', 'integer', 'min:1'],
            'president_name' => ['required', 'string', 'max:255'],
            'president_contact' => ['required', 'string', 'max:255'],
            'secretary_name' => ['required', 'string', 'max:255'],
            'secretary_contact' => ['required', 'string', 'max:255'],
            'remarks' => ['nullable', 'string'], // New field
            'attachments' => ['nullable', 'array'], // For new files
            'attachments.*' => ['file', 'max:10240'],
            'attachments_to_delete' => ['nullable', 'array'], // For existing files to delete
            'attachments_to_delete.*' => ['exists:media,id'], // Validate media IDs
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'reference_code.unique' => 'This CBO Reference Code already exists.',
            'gender.in' => 'The selected gender is invalid.',
            'total_members.min' => 'Total members must be at least 1.',
            'num_cbo_members.min' => 'Number of CBO members must be at least 1.',
            'attachments.*.max' => 'Each attachment may not be larger than 10 MB.',
            'attachments_to_delete.*.exists' => 'One or more attachment IDs to delete are invalid.',
        ];
    }
}
