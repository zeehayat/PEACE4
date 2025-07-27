<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCboTrainingRequest extends FormRequest
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
            'training_type' => ['required', Rule::in(['O&M Training', 'Electrical Appliance'])],
            'training_gender' => ['required', Rule::in(['Male', 'Female', 'Mixed'])],
            'date_of_training' => ['required', 'date'],
            'total_participants' => ['required', 'integer', 'min:1'],
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
            'training_type.in' => 'The selected training type is invalid.',
            'training_gender.in' => 'The selected training gender is invalid.',
            'total_participants.min' => 'Total participants must be at least 1.',
            'attachments.*.max' => 'Each attachment may not be larger than 10 MB.',
        ];
    }
}
