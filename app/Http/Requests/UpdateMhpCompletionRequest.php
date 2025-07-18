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
        return $this->user()->hasAnyRole(['mhp', 'root', 'admin']);
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'mhp_site_id' => ['required', 'exists:mhp_sites,id'],
            'scheme_inauguration_date' => ['nullable', 'date'],
            'testing_commissioning_date' => ['nullable', 'date'],
            'handover_date' => ['nullable', 'date'],
            'remarks' => ['nullable', 'string'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
            'attachments_to_delete' => ['nullable', 'array'],
            'attachments_to_delete.*' => ['exists:media,id'],
        ];
    }
}
