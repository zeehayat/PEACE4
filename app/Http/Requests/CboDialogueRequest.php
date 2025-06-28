<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CboDialogueRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {

        return [
            'cbo_id' => 'required|exists:cbos,id',
            'date_of_dialogue' => 'date|required',
            'participants' => 'required|numeric'

        ];
    }
}
