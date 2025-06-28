<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectFinancialInstallmentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'installment_number' => 'required',
            'installment_date' => 'required',
            'installment_amount' => 'required',
            'remarks' => 'required',
        ];
    }
}
