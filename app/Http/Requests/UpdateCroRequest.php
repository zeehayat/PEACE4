<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'district' => ['required', 'string', 'max:255'],
            'tehsil' => ['required', 'string', 'max:255'],
            'village_council' => ['required', 'string', 'max:255'],
            'village' => ['required', 'string', 'max:255'],
            'date_final_community_dialogue' => ['nullable', 'date'],
            'no_of_community_dialogues' => ['nullable', 'integer', 'min:0'],
            'dialogue_participants' => ['nullable', 'integer', 'min:0'],
            'cro_name' => ['required', 'string', 'max:255'],
            'date_of_cro_formation' => ['nullable', 'date'],
            'total_members' => ['nullable', 'integer', 'min:0'],
            'gender' => ['nullable', 'string', 'in:Male,Female,Mixed'],
            'no_of_cro_members' => ['nullable', 'integer', 'min:0'],
            'president_name' => ['nullable', 'string', 'max:255'],
            'president_contact' => ['nullable', 'string', 'max:255'],
            'secretary_name' => ['nullable', 'string', 'max:255'],
            'secretary_contact' => ['nullable', 'string', 'max:255'],
            'date_exposure_visit' => ['nullable', 'date'],
            'exposure_visit_participants' => ['nullable', 'integer', 'min:0'],
            'date_om_training' => ['nullable', 'date'],
            'om_training_participants' => ['nullable', 'integer', 'min:0'],
            'date_electrical_training' => ['nullable', 'date'],
            'electrical_training_participants' => ['nullable', 'integer', 'min:0'],
            'remarks' => ['nullable', 'string'],
        ];
    }
}
