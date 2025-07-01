<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CboTrainingRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'cbo_id' => 'required',
            'training_type' => 'required',
            'date_of_training' => 'required',
            'total_participants' => 'required|integer',
        ];
    }
}
