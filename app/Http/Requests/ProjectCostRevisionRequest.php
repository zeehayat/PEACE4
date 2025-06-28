<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectCostRevisionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'revision_number' => 'required',
            'revised_cost' => 'required',
            'approved_on' => 'required',
            'remarks' => 'required',
        ];
    }
}
