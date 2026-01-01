<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
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
        attachments: [],
        attachments_to_delete: [],

        // Profile fields
        profile: {
            beneficiary_farmers: scheme?.profile ? scheme.profile.beneficiary_farmers : null,
            channel_length_km: scheme?.profile ? scheme.profile.channel_length_km : null,
            land_area_hectares: scheme?.profile ? scheme.profile.land_area_hectares : null,
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
            <div>
                <InputLabel for="cbo_id" value="" />
                <SearchableCboSelect
                    id="cbo_id"
                    v-model="form.cbo_id"
                    :initial-cbo-object="scheme ? scheme.cbo : null"
                    :class="{ 'border-red-500': form.errors.cbo_id }"
                />
                <InputError class="mt-2" :message="form.errors.cbo_id" />
            </div>

            <!-- Scheme Type -->
            <div class="hidden">
                <InputLabel for="scheme_type" value="Scheme Type" />
                <TextInput
                    id="scheme_type"
                    v-model="form.scheme_type"

                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.scheme_type }"
                />
                <InputError class="mt-2" :message="form.errors.scheme_type" />
            </div>

            <!-- Sub Scheme Type -->
            <div class="hidden">
                <InputLabel for="sub_scheme_type" value="Sub Scheme Type" />
                <TextInput
                    id="sub_scheme_type"
                    v-model="form.sub_scheme_type"

                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.sub_scheme_type }"
                />
                <InputError class="mt-2" :message="form.errors.sub_scheme_type" />
            </div>

            <!-- Scheme Status -->
            <div>
                <InputLabel for="status" value="Status" />
                <SelectInput
                    id="status"
                    v-model="form.status"
                    :options="statusOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.status }"
                />
                <InputError class="mt-2" :message="form.errors.status" />
            </div>

            <!-- Remarks -->
            <div class="md:col-span-2">
                <InputLabel for="remarks" value="Remarks" />
                <WysiwygEditor
                    id="remarks"
                    v-model="form.remarks"
                    :class="{ 'border-red-500': form.errors.remarks }"
                    :height="200"
                />
                <InputError class="mt-2" :message="form.errors.remarks" />
            </div>

            <!-- Attachments Section for IrrigationScheme -->
            <div class="md:col-span-2">
                <InputLabel value="Scheme Attachments" />
                <AttachmentUploader
                    v-model="form.attachments"
                    :existing-attachments="existingAttachments"
                    @remove-existing="handleAttachmentsToDelete"
                    :error-message="form.errors.attachments"
                />
                <InputError class="mt-2" :message="form.errors.attachments" />
            </div>
        </div>

        <h3 class="text-lg font-semibold border-b pb-2 mt-8">Profile Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Beneficiary Farmers -->
            <div>
                <InputLabel for="beneficiary_farmers" value="Beneficiary Farmers" />
                <TextInput
                    id="beneficiary_farmers"
                    v-model="form.profile.beneficiary_farmers"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.beneficiary_farmers'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.beneficiary_farmers']" />
            </div>

            <!-- Channel Length -->
            <div>
                <InputLabel for="channel_length_km" value="Channel Length (KM)" />
                <TextInput
                    id="channel_length_km"
                    v-model="form.profile.channel_length_km"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.channel_length_km'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.channel_length_km']" />
            </div>

            <!-- Land Area -->
            <div>
                <InputLabel for="land_area_hectares" value="Land Area (Hectares)" />
                <TextInput
                    id="land_area_hectares"
                    v-model="form.profile.land_area_hectares"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.land_area_hectares'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.land_area_hectares']" />
            </div>

            <!-- Month/Year of Establishment -->
            <div>
                <InputLabel for="month_year_establishment" value="Month & Year of Establishment" />
                <DatePicker
                    id="month_year_establishment"
                    v-model="form.profile.month_year_establishment"
                    :class="{ 'border-red-500': form.errors['profile.month_year_establishment'] }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors['profile.month_year_establishment']" />
            </div>

            <!-- Established By -->
            <div>
                <InputLabel for="established_by" value="Established By" />
                <TextInput
                    id="established_by"
                    v-model="form.profile.established_by"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.established_by'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.established_by']" />
            </div>

            <!-- Date Technical Surveys -->
            <div>
                <InputLabel for="date_technical_surveys" value="Date of Technical Surveys" />
                <DatePicker
                    id="date_technical_surveys"
                    v-model="form.profile.date_technical_surveys"
                    :class="{ 'border-red-500': form.errors['profile.date_technical_surveys'] }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors['profile.date_technical_surveys']" />
            </div>
            
            <!-- Social Assessment Date -->
            <div>
                <InputLabel for="social_assessment_date" value="Social Assessment Date" />
                <DatePicker
                    id="social_assessment_date"
                    v-model="form.profile.social_assessment_date"
                    :class="{ 'border-red-500': form.errors['profile.social_assessment_date'] }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors['profile.social_assessment_date']" />
            </div>

             <!-- Detail Design Finalized Date -->
            <div>
                <InputLabel for="detail_design_finalized_date" value="Detailed Design Finalized Date" />
                <DatePicker
                    id="detail_design_finalized_date"
                    v-model="form.profile.detail_design_finalized_date"
                    :class="{ 'border-red-500': form.errors['profile.detail_design_finalized_date'] }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors['profile.detail_design_finalized_date']" />
            </div>

             <!-- Work Initiated Date -->
            <div>
                <InputLabel for="work_initiated_date" value="Work Initiated Date" />
                <DatePicker
                    id="work_initiated_date"
                    v-model="form.profile.work_initiated_date"
                    :class="{ 'border-red-500': form.errors['profile.work_initiated_date'] }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors['profile.work_initiated_date']" />
            </div>

             <!-- Work Completed Date -->
            <div>
                <InputLabel for="work_completed_date" value="Work Completed Date" />
                <DatePicker
                    id="work_completed_date"
                    v-model="form.profile.work_completed_date"
                    :class="{ 'border-red-500': form.errors['profile.work_completed_date'] }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors['profile.work_completed_date']" />
            </div>

             <!-- O&M Training Date -->
            <div>
                <InputLabel for="om_training_date" value="O&M Training Date" />
                <DatePicker
                    id="om_training_date"
                    v-model="form.profile.om_training_date"
                    :class="{ 'border-red-500': form.errors['profile.om_training_date'] }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors['profile.om_training_date']" />
            </div>

             <!-- Handover Date -->
            <div>
                <InputLabel for="handover_date" value="Handed Over Date" />
                <DatePicker
                    id="handover_date"
                    v-model="form.profile.handover_date"
                    :class="{ 'border-red-500': form.errors['profile.handover_date'] }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors['profile.handover_date']" />
            </div>

             <!-- Beneficiary HHs -->
            <div>
                <InputLabel for="beneficiary_hhs" value="Beneficiary HHs" />
                <TextInput
                    id="beneficiary_hhs"
                    v-model="form.profile.beneficiary_hhs"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.beneficiary_hhs'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.beneficiary_hhs']" />
            </div>

            <!-- HO Approval & Duration -->
             <div>
                <InputLabel for="ho_approval_date" value="Date of Approval from HO" />
                <DatePicker
                    id="ho_approval_date"
                    v-model="form.profile.ho_approval_date"
                    :class="{ 'border-red-500': form.errors['profile.ho_approval_date'] }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors['profile.ho_approval_date']" />
            </div>
             <div>
                <InputLabel for="project_duration" value="Duration of the Project" />
                <TextInput
                    id="project_duration"
                    v-model="form.profile.project_duration"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.project_duration'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.project_duration']" />
            </div>

            <!-- New Physical Dimension Fields -->
             <div>
                <InputLabel for="channel_length_rehab_rft" value="Channel Running Feet (REHAB)" />
                <TextInput
                    id="channel_length_rehab_rft"
                    v-model="form.profile.channel_length_rehab_rft"
                     type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.channel_length_rehab_rft'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.channel_length_rehab_rft']" />
            </div>
             <div>
                <InputLabel for="channel_length_new_rft" value="Channel Running Feet (NEW)" />
                <TextInput
                    id="channel_length_new_rft"
                    v-model="form.profile.channel_length_new_rft"
                     type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.channel_length_new_rft'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.channel_length_new_rft']" />
            </div>
             <div>
                <InputLabel for="protection_length_rft" value="Protection Length (Running Feet)" />
                <TextInput
                    id="protection_length_rft"
                    v-model="form.profile.protection_length_rft"
                     type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.protection_length_rft'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.protection_length_rft']" />
            </div>
             <div>
                <InputLabel for="intake_length_rft" value="Intake Length (Running Feet)" />
                <TextInput
                    id="intake_length_rft"
                    v-model="form.profile.intake_length_rft"
                     type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.intake_length_rft'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.intake_length_rft']" />
            </div>

            <!-- Northening -->
            <div>
                <InputLabel for="northening" value="Northening" />
                <TextInput
                    id="northening"
                    v-model="form.profile.northening"
                    type="number"
                    step="0.000001"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.northening'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.northening']" />
            </div>

            <!-- Easting -->
            <div>
                <InputLabel for="easting" value="Easting" />
                <TextInput
                    id="easting"
                    v-model="form.profile.easting"
                    type="number"
                    step="0.000001"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.easting'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.easting']" />
            </div>

            <!-- Elevation -->
            <div>
                <InputLabel for="elevation" value="Elevation" />
                <TextInput
                    id="elevation"
                    v-model="form.profile.elevation"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors['profile.elevation'] }"
                />
                <InputError class="mt-2" :message="form.errors['profile.elevation']" />
            </div>

        </div>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button
                type="button"
                @click="handleCancel"
                class="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
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
