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
            'cbo_id' => 'required',
            'date_of_visit' => 'required',

        ];
    }
}
