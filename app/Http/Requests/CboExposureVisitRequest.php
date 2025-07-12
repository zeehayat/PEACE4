<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CboExposureVisitRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'cbo_id' => ['required', 'exists:cbos,id'],
            'date_of_visit' => ['required', 'date'],
            'participants' => ['required', 'integer', 'min:1'],
            'purpose_of_visit' => ['nullable', 'string', 'max:255'],
            'remarks' => ['nullable', 'string', 'max:1000'],
            'attachments.*' => ['nullable', 'file', 'max:20480'],
            'removed_attachments' => ['nullable', 'array'],
            'removed_attachments.*' => ['exists:media,id'],

        ];
    }
}
