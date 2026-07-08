<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLrmNrmAchievementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => ['required', 'date'],
            'achieved_forest_area_value' => ['nullable', 'numeric', 'min:0'],
            'achieved_forest_area_unit' => ['nullable', 'string', 'max:50'],
            'achieved_fruit_area_value' => ['nullable', 'numeric', 'min:0'],
            'achieved_fruit_area_unit' => ['nullable', 'string', 'max:50'],
            'achieved_forest_plants_count' => ['nullable', 'integer', 'min:0'],
            'achieved_fruit_plants_count' => ['nullable', 'integer', 'min:0'],
            'achieved_drr_training_persons' => ['nullable', 'integer', 'min:0'],
            'achieved_check_dams_value' => ['nullable', 'numeric', 'min:0'],
            'achieved_check_dams_unit' => ['nullable', 'string', 'max:50'],
            'achieved_greenbelt_lawn_value' => ['nullable', 'numeric', 'min:0'],
            'achieved_greenbelt_lawn_unit' => ['nullable', 'string', 'max:50'],
            'achieved_composting_training_persons' => ['nullable', 'integer', 'min:0'],
            'achieved_pest_control_training_persons' => ['nullable', 'integer', 'min:0'],
            'achieved_pest_control_kits' => ['nullable', 'integer', 'min:0'],
            'remarks' => ['nullable', 'string'],
        ];
    }
}
