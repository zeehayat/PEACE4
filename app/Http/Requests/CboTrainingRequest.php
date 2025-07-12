<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CboTrainingRequest extends FormRequest
{
    public function authorize():bool
    {
        return true;
    }

    public function rules():array
    {
        return [
            'cbo_id' => ['required', 'exists:cbos,id'],
            'training_type' => ['required', 'string', 'max:255'],
            'training_gender' => ['required', 'string', 'in:male,female,mixed'],
            'date_of_training' => ['required', 'date'],
            'total_participants' => ['required', 'integer', 'min:1'],
            'remarks' => ['nullable', 'string', 'max:1000'], // NEW: Validation for remarks
            'attachments.*' => ['nullable', 'file', 'max:20480'], // Max 20MB per file
            'removed_attachments' => ['nullable', 'array'],
            'removed_attachments.*' => ['exists:media,id'],
        ];
    }
}
