<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCboExposureVisitRequest extends FormRequest
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
            'cbo_id' => ['required', 'exists:cbos,id'],
            'participants' => ['nullable', 'integer', 'min:0'],
            'purpose_of_visit' => ['nullable', 'string', 'max:255'],
            'remarks' => ['nullable', 'string'],
            'date_of_visit' => ['required', 'date'],
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
            'cbo_id.exists' => 'The selected CBO does not exist.',
            'participants.min' => 'Participants must be a non-negative number.',
            'attachments.*.max' => 'Each attachment may not be larger than 10 MB.',
            'attachments_to_delete.*.exists' => 'One or more attachment IDs to delete are invalid.',
        ];
    }
}
