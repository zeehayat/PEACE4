<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLrmCroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'village' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:100'],
            'male_members' => ['nullable', 'integer', 'min:0'],
            'female_members' => ['nullable', 'integer', 'min:0'],
            'total_members' => ['nullable', 'integer', 'min:0'],
            'president_name' => ['nullable', 'string', 'max:255'],
            'president_contact' => ['nullable', 'string', 'max:50'],
            'secretary_name' => ['nullable', 'string', 'max:255'],
            'secretary_contact' => ['nullable', 'string', 'max:50'],
            'remarks' => ['nullable', 'string'],
        ];
    }
}
