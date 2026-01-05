<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateIrrigationSchemeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Will be updated later with ACL
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // Core Irrigation Scheme fields
            'cbo_id' => ['required', 'exists:cbos,id'],
            'scheme_type' => ['nullable', 'string', 'max:255'],
            'sub_scheme_type' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'remarks' => ['nullable', 'string'],
            'number_of_watercourses' => ['nullable', 'integer', 'min:0'],
            'water_availability_cusecs' => ['nullable', 'numeric', 'min:0'],

            // Nested profile fields
            'profile.beneficiary_farmers' => ['nullable', 'integer', 'min:0'],
            'profile.channel_length_km' => ['nullable', 'numeric', 'min:0'],
            'profile.land_area_hectares' => ['nullable', 'numeric', 'min:0'],
            'profile.month_year_establishment' => ['nullable', 'date'],
            'profile.established_by' => ['nullable', 'string', 'max:255'],
            'profile.date_technical_surveys' => ['nullable', 'date'],
            'profile.northening' => ['nullable', 'numeric'],
            'profile.easting' => ['nullable', 'numeric'],
            'profile.elevation' => ['nullable', 'numeric', 'min:0'],
            'profile.social_assessment_date' => ['nullable', 'date'],
            'profile.detail_design_finalized_date' => ['nullable', 'date'],
            'profile.work_initiated_date' => ['nullable', 'date'],
            'profile.work_completed_date' => ['nullable', 'date'],
            'profile.om_training_date' => ['nullable', 'date'],
            'profile.handover_date' => ['nullable', 'date'],
            'profile.beneficiary_hhs' => ['nullable', 'integer', 'min:0'],
            'profile.ho_approval_date' => ['nullable', 'date'],
            'profile.project_duration' => ['nullable', 'string', 'max:255'],
            'profile.channel_length_rehab_rft' => ['nullable', 'numeric', 'min:0'],
            'profile.channel_length_new_rft' => ['nullable', 'numeric', 'min:0'],
            'profile.protection_length_rft' => ['nullable', 'numeric', 'min:0'],
            'profile.intake_length_rft' => ['nullable', 'numeric', 'min:0'],

            // Attachment validation for the main scheme
            'attachments' => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:10240'],
            'attachments_to_delete' => ['nullable', 'array'],
            'attachments_to_delete.*' => ['exists:media,id'],
        ];
    }
}
