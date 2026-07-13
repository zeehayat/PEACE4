<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputGroup from '@/Components/FormComponents/InputGroup.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';

const props = defineProps({
    mhpSiteId: { type: Number, required: true },
    approval: { type: Object, default: null }, // This prop carries the existing approval object
    action: { type: String, default: 'create' }, // 'create' or 'update'
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.action === 'update');
const existingAttachments = ref([]); // Will be populated by the watcher

// Function to get initial form data for useForm and form.defaults
function getInitialFormData(approvalData) {
    return {
        mhp_site_id: props.mhpSiteId, // Always use prop.mhpSiteId
        eu_approval_date: approvalData ? approvalData.eu_approval_date : null,
        approved_cost: approvalData ? approvalData.approved_cost : '',
        revised_cost_1: approvalData ? approvalData.revised_cost_1 : null,
        revised_cost_2: approvalData ? approvalData.revised_cost_2 : null,
        revised_cost_3: approvalData ? approvalData.revised_cost_3 : null,
        hpp_inauguration_date: approvalData ? approvalData.hpp_inauguration_date : null,
        technical_survey_date: approvalData ? approvalData.technical_survey_date : null,
        date_design_psu_submission: approvalData ? approvalData.date_design_psu_submission : null,
        headoffice_review_submission_date: approvalData ? approvalData.headoffice_review_submission_date : null,
        design_estimate_date: approvalData ? approvalData.design_estimate_date : null,
        eu_approval_submission_date: approvalData ? approvalData.eu_approval_submission_date : null,
        opm_validation_date: approvalData ? approvalData.opm_validation_date : null,
        remarks: approvalData ? approvalData.remarks : '',
        attachments: [], // New files to upload
        attachments_to_delete: [], // IDs of attachments to delete
    };
}

// Initialize form using the helper function
const form = useForm(getInitialFormData(props.approval));

// Watch for changes in the 'approval' prop to re-initialize the form
watch(() => props.approval, (newApproval) => {
    console.log('--- MhpAdminApprovalForm: props.approval watcher triggered ---');
    console.log('Watcher received newApproval prop:', newApproval);

    isEditMode.value = !!newApproval; // Update edit mode flag

    // Set defaults based on the new prop value, then reset the form
    form.defaults(getInitialFormData(newApproval));
    form.reset(); // This applies the new defaults and clears dirty state/errors

    // Update existing attachments separately
    existingAttachments.value = newApproval ? newApproval.attachments_frontend : [];

    form.clearErrors(); // Clear any previous validation errors
    console.log('MhpAdminApprovalForm: Form and attachments initialized based on new prop.');
}, { immediate: true }); // Run immediately on component mount

onMounted(() => {
    console.log('--- MhpAdminApprovalForm: Mounted ---');
    console.log('MhpAdminApprovalForm: Initial form.data() on mount:', form.data());
    console.log('MhpAdminApprovalForm: Initial existingAttachments on mount:', existingAttachments.value);
});

const handleAttachmentsToDelete = (id) => {
    console.log('--- MhpAdminApprovalForm: handleAttachmentsToDelete called ---');
    console.log('Deleting attachment ID:', id);
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    console.log('--- MhpAdminApprovalForm: handleSubmit triggered ---');
    console.log('Form data before POST:', form.data());
    console.log('Attachments array before POST:', form.attachments);

    const url = isEditMode.value
        ? route('mhp.admin-approvals.update', { site: props.mhpSiteId, admin_approval: props.approval.id })
        : route('mhp.admin-approvals.store', { site: props.mhpSiteId });

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            console.log('--- MhpAdminApprovalForm: Submission Success ---');
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'Admin Approval updated successfully!' : 'Admin Approval created successfully!');
        },
        onError: (errors) => {
            console.error('--- MhpAdminApprovalForm: Submission Error ---');
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    console.log('--- MhpAdminApprovalForm: Cancel triggered ---');
    form.reset();
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <input type="hidden" v-model="form.mhp_site_id" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- EU Approval Date -->
            <InputGroup id="eu_approval_date" label="EU Approval Date" :error="form.errors.eu_approval_date">
                <DatePicker
                    id="eu_approval_date"
                    v-model="form.eu_approval_date"
                    :class="{ 'border-red-500': form.errors.eu_approval_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Approved Cost -->
            <InputGroup id="approved_cost" label="Approved Cost" :error="form.errors.approved_cost">
                <TextInput
                    id="approved_cost"
                    v-model="form.approved_cost"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.approved_cost }"
                />
            </InputGroup>

            <!-- Revised Cost 1 -->
            <InputGroup id="revised_cost_1" label="Revised Cost 1" :error="form.errors.revised_cost_1">
                <TextInput
                    id="revised_cost_1"
                    v-model="form.revised_cost_1"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.revised_cost_1 }"
                />
            </InputGroup>

            <!-- Revised Cost 2 -->
            <InputGroup id="revised_cost_2" label="Revised Cost 2" :error="form.errors.revised_cost_2">
                <TextInput
                    id="revised_cost_2"
                    v-model="form.revised_cost_2"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.revised_cost_2 }"
                />
            </InputGroup>

            <!-- Revised Cost 3 -->
            <InputGroup id="revised_cost_3" label="Revised Cost 3" :error="form.errors.revised_cost_3">
                <TextInput
                    id="revised_cost_3"
                    v-model="form.revised_cost_3"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.revised_cost_3 }"
                />
            </InputGroup>

            <!-- HPP Inauguration Date -->
            <InputGroup
                id="hpp_inauguration_date"
                label="HPP Inauguration Date"
                help="HPP means Hydro Power Plant — the date the plant was formally inaugurated."
                :error="form.errors.hpp_inauguration_date"
            >
                <DatePicker
                    id="hpp_inauguration_date"
                    v-model="form.hpp_inauguration_date"
                    :class="{ 'border-red-500': form.errors.hpp_inauguration_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Technical Survey Date -->
            <InputGroup id="technical_survey_date" label="Technical Survey Date" :error="form.errors.technical_survey_date">
                <DatePicker
                    id="technical_survey_date"
                    v-model="form.technical_survey_date"
                    :class="{ 'border-red-500': form.errors.technical_survey_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Date Design PSU Submission -->
            <InputGroup
                id="date_design_psu_submission"
                label="Date Design PSU Submission"
                help="PSU means Project Support Unit — the date the design/estimate package was submitted to the PSU for review."
                :error="form.errors.date_design_psu_submission"
            >
                <DatePicker
                    id="date_design_psu_submission"
                    v-model="form.date_design_psu_submission"
                    :class="{ 'border-red-500': form.errors.date_design_psu_submission }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Head Office Review Submission Date -->
            <InputGroup id="headoffice_review_submission_date" label="Head Office Review Submission Date" :error="form.errors.headoffice_review_submission_date">
                <DatePicker
                    id="headoffice_review_submission_date"
                    v-model="form.headoffice_review_submission_date"
                    :class="{ 'border-red-500': form.errors.headoffice_review_submission_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Design Estimate Date -->
            <InputGroup id="design_estimate_date" label="Design Estimate Date" :error="form.errors.design_estimate_date">
                <DatePicker
                    id="design_estimate_date"
                    v-model="form.design_estimate_date"
                    :class="{ 'border-red-500': form.errors.design_estimate_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- EU Approval Submission Date -->
            <InputGroup
                id="eu_approval_submission_date"
                label="EU Approval Submission Date"
                help="The date this site's approval package was submitted to the European Union (EU) for sign-off."
                :error="form.errors.eu_approval_submission_date"
            >
                <DatePicker
                    id="eu_approval_submission_date"
                    v-model="form.eu_approval_submission_date"
                    :class="{ 'border-red-500': form.errors.eu_approval_submission_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- OPM Validation Date -->
            <InputGroup
                id="opm_validation_date"
                label="OPM Validation Date"
                help="OPM means Office of the Prime Minister — the date the OPM validated this site's approval."
                :error="form.errors.opm_validation_date"
            >
                <DatePicker
                    id="opm_validation_date"
                    v-model="form.opm_validation_date"
                    :class="{ 'border-red-500': form.errors.opm_validation_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Remarks (WYSIWYG Editor) -->
            <InputGroup id="remarks" label="Remarks" class="md:col-span-2" :error="form.errors.remarks">
                <WysiwygEditor
                    id="remarks"
                    v-model="form.remarks"
                    :class="{ 'border-red-500': form.errors.remarks }"
                    :height="200"
                />
            </InputGroup>
        </div>

        <!-- Attachments Section -->
        <InputGroup label="Attachments" class="mt-6" :error="form.errors.attachments">
            <AttachmentUploader
                v-model="form.attachments"
                :existing-attachments="existingAttachments"
                @remove-existing="handleAttachmentsToDelete"
                :error-message="form.errors.attachments"
            />
        </InputGroup>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button
                type="button"
                @click="handleCancel"
                class="inline-flex items-center px-4 py-2 bg-paper-200 border border-transparent rounded-md font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-300 focus:bg-paper-300 active:bg-paper-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Cancel
            </button>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ isEditMode ? 'Update Approval' : 'Add Approval' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
