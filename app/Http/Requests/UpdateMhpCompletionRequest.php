<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMhpCompletionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming route model binding: /mhp/completions/{completion}
        $completion = $this->route('completion');
        // You might add a policy check here: $this->user()->can('update', $completion);
       // return $this->user()->hasAnyRole(['mhp', 'root', 'admin']);
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'completion_date' => ['nullable','date'],
            'civil_works_status' => ['nullable','string','max:255'],
            'electro_mechanical_status' => ['nullable','string','max:255'],
            'remarks' => ['nullable','string'],
            'attachments' => ['array'],
            'attachments.*' => ['file'],
            'attachments_to_delete' => ['array'],
            'attachments_to_delete.*' => ['integer'],
        ];


    }
}
