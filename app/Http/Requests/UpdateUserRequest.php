<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user');

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($userId)],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'district_id' => ['nullable', 'exists:districts,id'],
            'roles' => ['nullable', 'array'],
            'roles.*' => ['exists:roles,name'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['exists:permissions,name'],
            'denied_permissions' => ['nullable', 'array'],
            'denied_permissions.*' => ['exists:permissions,name'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $overlap = array_intersect($this->input('permissions', []), $this->input('denied_permissions', []));
            if (! empty($overlap)) {
                $validator->errors()->add('denied_permissions', 'A permission cannot be both granted and denied: ' . implode(', ', $overlap));
            }
        });
    }
}
