<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCboDialogueRequest extends FormRequest
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
            'date_of_dialogue' => ['required', 'date'],
            'participants' => ['required', 'integer', 'min:0'],
            'remarks' => ['nullable', 'string'], // Already exists
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
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
        ];
    }
}
