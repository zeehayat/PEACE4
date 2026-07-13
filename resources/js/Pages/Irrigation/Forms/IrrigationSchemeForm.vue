<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputGroup from '@/Components/FormComponents/InputGroup.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue';

const props = defineProps({
    scheme: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
});

const emit = defineEmits(['success', 'cancel']);

const page = usePage();

const isEditMode = ref(!!props.scheme);
const existingAttachments = ref([]);

//const schemeTypeOptions = ['New', 'Rehabilitation']; // Example options, adjust as needed
//const subSchemeTypeOptions = ['Sub A', 'Sub B', 'Sub C']; // Example options, adjust as needed
const statusOptions = ['New', 'Rehabilitation']; // Example options, adjust as needed

// Function to get the initial data for the form based on a scheme object or null
function getInitialFormData(scheme) {
    return {
        cbo_id: scheme ? scheme.cbo_id : null,
        status: scheme ? scheme.status : 'New',
        remarks: scheme ? scheme.remarks : '',
        direct_household_beneficiary: scheme ? scheme.direct_household_beneficiary : null,
        indirect_household_beneficiary: scheme ? scheme.indirect_household_beneficiary : null,
        attachments: [],
        attachments_to_delete: [],

        // Profile fields
        profile: {
            beneficiary_farmers: scheme?.profile ? scheme.profile.beneficiary_farmers : null,
            channel_length_km: scheme?.profile ? scheme.profile.channel_length_km : null,
            land_area_hectares: scheme?.profile ? scheme.profile.land_area_hectares : null,
            additional_area_covered: scheme?.profile ? scheme.profile.additional_area_covered : null,
            month_year_establishment: scheme?.profile ? scheme.profile.month_year_establishment : null,
            established_by: scheme?.profile ? scheme.profile.established_by : '',
            date_technical_surveys: scheme?.profile ? scheme.profile.date_technical_surveys : null,
            northening: scheme?.profile ? scheme.profile.northening : null,
            easting: scheme?.profile ? scheme.profile.easting : null,
            elevation: scheme?.profile ? scheme.profile.elevation : null,
            social_assessment_date: scheme?.profile ? scheme.profile.social_assessment_date : null,
            detail_design_finalized_date: scheme?.profile ? scheme.profile.detail_design_finalized_date : null,
            work_initiated_date: scheme?.profile ? scheme.profile.work_initiated_date : null,
            work_completed_date: scheme?.profile ? scheme.profile.work_completed_date : null,
            om_training_date: scheme?.profile ? scheme.profile.om_training_date : null,
            handover_date: scheme?.profile ? scheme.profile.handover_date : null,
            beneficiary_hhs: scheme?.profile ? scheme.profile.beneficiary_hhs : null,
            ho_approval_date: scheme?.profile ? scheme.profile.ho_approval_date : null,
            project_duration: scheme?.profile ? scheme.profile.project_duration : null,
            channel_length_rehab_rft: scheme?.profile ? scheme.profile.channel_length_rehab_rft : null,
            channel_length_new_rft: scheme?.profile ? scheme.profile.channel_length_new_rft : null,
            protection_length_rft: scheme?.profile ? scheme.profile.protection_length_rft : null,
            intake_length_rft: scheme?.profile ? scheme.profile.intake_length_rft : null,
        },
    };
}

const form = useForm(getInitialFormData(props.scheme));

// Watch for prop.scheme changes to update the form
watch(() => props.scheme, (newScheme) => {
    isEditMode.value = !!newScheme;
    form.defaults(getInitialFormData(newScheme));
    form.reset();
    existingAttachments.value = newScheme ? newScheme.attachments_frontend : [];
    form.clearErrors();
}, { immediate: true });

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('irrigation.schemes.update', props.scheme.id)
        : route('irrigation.schemes.store');

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'Irrigation Scheme updated successfully!' : 'Irrigation Scheme created successfully!');
        },
        onError: (errors) => {
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    form.reset();
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- CBO -->
            <InputGroup id="cbo_id" label="CBO" :required="true" :error="form.errors.cbo_id">
                <SearchableCboSelect
                    id="cbo_id"
                    v-model="form.cbo_id"
                    :initial-cbo-object="scheme ? scheme.cbo : null"
                    :class="{ 'border-red-500': form.errors.cbo_id }"
                />
            </InputGroup>

            <!-- Scheme Type -->
            <InputGroup id="scheme_type" label="Scheme Type" class="hidden" :error="form.errors.scheme_type">
                <TextInput
                    id="scheme_type"
                    v-model="form.scheme_type"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.scheme_type }"
                />
            </InputGroup>

            <!-- Sub Scheme Type -->
            <InputGroup id="sub_scheme_type" label="Sub Scheme Type" class="hidden" :error="form.errors.sub_scheme_type">
                <TextInput
                    id="sub_scheme_type"
                    v-model="form.sub_scheme_type"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.sub_scheme_type }"
                />
            </InputGroup>

            <!-- Scheme Status -->
            <InputGroup id="status" label="Status" :required="true" :error="form.errors.status">
                <SelectInput
                    id="status"
                    v-model="form.status"
                    :options="statusOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.status }"
                />
            </InputGroup>

            <!-- Remarks -->
            <InputGroup id="remarks" label="Remarks" class="md:col-span-2" :error="form.errors.remarks">
                <WysiwygEditor
                    id="remarks"
                    v-model="form.remarks"
                    :class="{ 'border-red-500': form.errors.remarks }"
                    :height="200"
                />
            </InputGroup>

            <!-- Attachments Section for IrrigationScheme -->
            <InputGroup label="Scheme Attachments" class="md:col-span-2" :error="form.errors.attachments">
                <AttachmentUploader
                    v-model="form.attachments"
                    :existing-attachments="existingAttachments"
                    @remove-existing="handleAttachmentsToDelete"
                    :error-message="form.errors.attachments"
                />
            </InputGroup>
        </div>

        <h3 class="text-lg font-semibold border-b pb-2 mt-8">Profile Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Beneficiary Farmers -->
            <InputGroup id="beneficiary_farmers" label="Beneficiary Farmers" :error="form.errors['profile.beneficiary_farmers']">
                <TextInput
                    id="beneficiary_farmers"
                    v-model="form.profile.beneficiary_farmers"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.beneficiary_farmers'] }"
                />
            </InputGroup>

            <!-- Direct Household Beneficiary -->
            <InputGroup id="direct_household_beneficiary" label="Direct Household Beneficiaries" :error="form.errors.direct_household_beneficiary">
                <TextInput
                    id="direct_household_beneficiary"
                    v-model="form.direct_household_beneficiary"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.direct_household_beneficiary }"
                />
            </InputGroup>

            <!-- Indirect Household Beneficiary -->
            <InputGroup id="indirect_household_beneficiary" label="Indirect Household Beneficiaries" :error="form.errors.indirect_household_beneficiary">
                <TextInput
                    id="indirect_household_beneficiary"
                    v-model="form.indirect_household_beneficiary"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.indirect_household_beneficiary }"
                />
            </InputGroup>

            <!-- Channel Length -->
            <InputGroup id="channel_length_km" label="Channel Length (KM)" :error="form.errors['profile.channel_length_km']">
                <TextInput
                    id="channel_length_km"
                    v-model="form.profile.channel_length_km"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.channel_length_km'] }"
                />
            </InputGroup>

            <!-- Land Area -->
            <InputGroup id="land_area_hectares" label="Land Area (Hectares)" :error="form.errors['profile.land_area_hectares']">
                <TextInput
                    id="land_area_hectares"
                    v-model="form.profile.land_area_hectares"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.land_area_hectares'] }"
                />
            </InputGroup>

             <!-- Additional Area Covered -->
            <InputGroup id="additional_area_covered" label="Additional Area Covered (Hectares)" :error="form.errors['profile.additional_area_covered']">
                <TextInput
                    id="additional_area_covered"
                    v-model="form.profile.additional_area_covered"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.additional_area_covered'] }"
                />
            </InputGroup>

            <!-- Month/Year of Establishment -->
            <InputGroup id="month_year_establishment" label="Month & Year of Establishment" :error="form.errors['profile.month_year_establishment']">
                <DatePicker
                    id="month_year_establishment"
                    v-model="form.profile.month_year_establishment"
                    :class="{ 'border-red-500': form.errors['profile.month_year_establishment'] }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Established By -->
            <InputGroup id="established_by" label="Established By" :error="form.errors['profile.established_by']">
                <TextInput
                    id="established_by"
                    v-model="form.profile.established_by"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.established_by'] }"
                />
            </InputGroup>

            <!-- Date Technical Surveys -->
            <InputGroup id="date_technical_surveys" label="Date of Technical Surveys" :error="form.errors['profile.date_technical_surveys']">
                <DatePicker
                    id="date_technical_surveys"
                    v-model="form.profile.date_technical_surveys"
                    :class="{ 'border-red-500': form.errors['profile.date_technical_surveys'] }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Social Assessment Date -->
            <InputGroup id="social_assessment_date" label="Social Assessment Date" :error="form.errors['profile.social_assessment_date']">
                <DatePicker
                    id="social_assessment_date"
                    v-model="form.profile.social_assessment_date"
                    :class="{ 'border-red-500': form.errors['profile.social_assessment_date'] }"
                    placeholder="Select Date"
                />
            </InputGroup>

             <!-- Detail Design Finalized Date -->
            <InputGroup id="detail_design_finalized_date" label="Detailed Design Finalized Date" :error="form.errors['profile.detail_design_finalized_date']">
                <DatePicker
                    id="detail_design_finalized_date"
                    v-model="form.profile.detail_design_finalized_date"
                    :class="{ 'border-red-500': form.errors['profile.detail_design_finalized_date'] }"
                    placeholder="Select Date"
                />
            </InputGroup>

             <!-- Work Initiated Date -->
            <InputGroup id="work_initiated_date" label="Work Initiated Date" :error="form.errors['profile.work_initiated_date']">
                <DatePicker
                    id="work_initiated_date"
                    v-model="form.profile.work_initiated_date"
                    :class="{ 'border-red-500': form.errors['profile.work_initiated_date'] }"
                    placeholder="Select Date"
                />
            </InputGroup>

             <!-- Work Completed Date -->
            <InputGroup id="work_completed_date" label="Work Completed Date" :error="form.errors['profile.work_completed_date']">
                <DatePicker
                    id="work_completed_date"
                    v-model="form.profile.work_completed_date"
                    :class="{ 'border-red-500': form.errors['profile.work_completed_date'] }"
                    placeholder="Select Date"
                />
            </InputGroup>

             <!-- O&M Training Date -->
            <InputGroup
                id="om_training_date"
                label="O&M Training Date"
                help="O&M means Operations & Maintenance — training given to the CBO on running and maintaining the scheme after handover."
                :error="form.errors['profile.om_training_date']"
            >
                <DatePicker
                    id="om_training_date"
                    v-model="form.profile.om_training_date"
                    :class="{ 'border-red-500': form.errors['profile.om_training_date'] }"
                    placeholder="Select Date"
                />
            </InputGroup>

             <!-- Handover Date -->
            <InputGroup id="handover_date" label="Handed Over Date" :error="form.errors['profile.handover_date']">
                <DatePicker
                    id="handover_date"
                    v-model="form.profile.handover_date"
                    :class="{ 'border-red-500': form.errors['profile.handover_date'] }"
                    placeholder="Select Date"
                />
            </InputGroup>

             <!-- Beneficiary HHs -->
            <InputGroup
                id="beneficiary_hhs"
                label="Beneficiary HHs"
                help="HHs means households."
                :error="form.errors['profile.beneficiary_hhs']"
            >
                <TextInput
                    id="beneficiary_hhs"
                    v-model="form.profile.beneficiary_hhs"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.beneficiary_hhs'] }"
                />
            </InputGroup>

            <!-- HO Approval & Duration -->
            <InputGroup
                id="ho_approval_date"
                label="Date of Approval from HO"
                help="The date SRSP's Head Office (HO) formally approved this scheme for construction."
                :error="form.errors['profile.ho_approval_date']"
            >
                <DatePicker
                    id="ho_approval_date"
                    v-model="form.profile.ho_approval_date"
                    :class="{ 'border-red-500': form.errors['profile.ho_approval_date'] }"
                    placeholder="Select Date"
                />
            </InputGroup>
            <InputGroup id="project_duration" label="Duration of the Project" :error="form.errors['profile.project_duration']">
                <TextInput
                    id="project_duration"
                    v-model="form.profile.project_duration"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.project_duration'] }"
                />
            </InputGroup>

            <!-- New Physical Dimension Fields -->
            <InputGroup
                id="channel_length_rehab_rft"
                label="Channel Running Feet (REHAB)"
                help="RFT means Running Feet, a linear measurement unit used for this scheme's channel, protection, and intake works."
                :error="form.errors['profile.channel_length_rehab_rft']"
            >
                <TextInput
                    id="channel_length_rehab_rft"
                    v-model="form.profile.channel_length_rehab_rft"
                     type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.channel_length_rehab_rft'] }"
                />
            </InputGroup>
            <InputGroup
                id="channel_length_new_rft"
                label="Channel Running Feet (NEW)"
                help="RFT means Running Feet, a linear measurement unit used for this scheme's channel, protection, and intake works."
                :error="form.errors['profile.channel_length_new_rft']"
            >
                <TextInput
                    id="channel_length_new_rft"
                    v-model="form.profile.channel_length_new_rft"
                     type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.channel_length_new_rft'] }"
                />
            </InputGroup>
            <InputGroup
                id="protection_length_rft"
                label="Protection Length (Running Feet)"
                help="RFT means Running Feet, a linear measurement unit used for this scheme's channel, protection, and intake works."
                :error="form.errors['profile.protection_length_rft']"
            >
                <TextInput
                    id="protection_length_rft"
                    v-model="form.profile.protection_length_rft"
                     type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.protection_length_rft'] }"
                />
            </InputGroup>
            <InputGroup
                id="intake_length_rft"
                label="Intake Length (Running Feet)"
                help="RFT means Running Feet, a linear measurement unit used for this scheme's channel, protection, and intake works."
                :error="form.errors['profile.intake_length_rft']"
            >
                <TextInput
                    id="intake_length_rft"
                    v-model="form.profile.intake_length_rft"
                     type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.intake_length_rft'] }"
                />
            </InputGroup>

            <!-- Northening -->
            <InputGroup
                id="northening"
                label="Northening"
                help="The northing coordinate (UTM/GPS) marking this scheme's north-south position."
                :error="form.errors['profile.northening']"
            >
                <TextInput
                    id="northening"
                    v-model="form.profile.northening"
                    type="number"
                    step="0.000001"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.northening'] }"
                />
            </InputGroup>

            <!-- Easting -->
            <InputGroup
                id="easting"
                label="Easting"
                help="The easting coordinate (UTM/GPS) marking this scheme's east-west position."
                :error="form.errors['profile.easting']"
            >
                <TextInput
                    id="easting"
                    v-model="form.profile.easting"
                    type="number"
                    step="0.000001"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.easting'] }"
                />
            </InputGroup>

            <!-- Elevation -->
            <InputGroup id="elevation" label="Elevation" :error="form.errors['profile.elevation']">
                <TextInput
                    id="elevation"
                    v-model="form.profile.elevation"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.elevation'] }"
                />
            </InputGroup>

        </div>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button
                type="button"
                @click="handleCancel"
                class="inline-flex items-center px-4 py-2 bg-paper-200 border border-transparent rounded-md font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-300 focus:bg-paper-300 active:bg-paper-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Cancel
            </button>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ isEditMode ? 'Update Scheme' : 'Create Scheme' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
