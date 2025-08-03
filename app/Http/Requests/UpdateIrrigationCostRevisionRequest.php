<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Relations\Relation; // Import for morph map

class UpdateIrrigationCostRevisionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $validApprovableTypes = array_keys(Relation::getMorphMap());

        return [
            'approvable_id' => ['required', 'integer'],
            'approvable_type' => ['required', 'string', Rule::in($validApprovableTypes)],
            'revision_number' => ['required', 'integer', 'min:1'],
            'revised_cost' => ['required', 'numeric', 'min:0'],
            'approved_on' => ['required', 'date'],
            'remarks' => ['nullable', 'string'],
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
            'attachments_to_delete' => ['nullable', 'array'],
            'attachments_to_delete.*' => ['exists:media,id'],
        ];
    }
}
