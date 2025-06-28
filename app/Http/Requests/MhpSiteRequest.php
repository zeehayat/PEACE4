<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MhpSiteRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'cbo_id', 'population', 'grid_status', 'status' => 'required',
            'existing_capacity_kw', 'planned_capacity_kw', 'head_ft' => 'required',
            'design_discharge_cusecs', 'channel_length_km', 'tl_ht_km' => 'required',
            'tl_lt_km', 'transformers', 'turbine_type', 'alternator_type' => 'required',
            'accessible', 'domestic_units', 'commercial_units' => 'required',
            'estimated_cost', 'per_kw_cost', 'total_hh' => 'required',
            'avg_hh_size', 'cost_per_capita' => 'required',
        ];
    }
}
