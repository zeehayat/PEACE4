<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MhpAdminApprovalRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'mhp_site_id', 'eu_approval_date', 'approved_cost' => 'required',
            'revised_cost_1', 'revised_cost_2', 'revised_cost_3' => 'required',
            'hpp_inauguration_date' => 'required',
        ];
    }
}
