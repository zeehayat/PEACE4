<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
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
        ? route('mhp.admin-approvals.update', props.approval.id)
        : route('mhp.admin-approvals.store');

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
            <div>
                <InputLabel for="eu_approval_date" value="EU Approval Date" />
                <DatePicker
                    id="eu_approval_date"
                    v-model="form.eu_approval_date"
                    :class="{ 'border-red-500': form.errors.eu_approval_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.eu_approval_date" />
            </div>

            <!-- Approved Cost -->
            <div>
                <InputLabel for="approved_cost" value="Approved Cost" />
                <TextInput
                    id="approved_cost"
                    v-model="form.approved_cost"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.approved_cost }"
                />
                <InputError class="mt-2" :message="form.errors.approved_cost" />
            </div>

            <!-- Revised Cost 1 -->
            <div>
                <InputLabel for="revised_cost_1" value="Revised Cost 1" />
                <TextInput
                    id="revised_cost_1"
                    v-model="form.revised_cost_1"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.revised_cost_1 }"
                />
                <InputError class="mt-2" :message="form.errors.revised_cost_1" />
            </div>

            <!-- Revised Cost 2 -->
            <div>
                <InputLabel for="revised_cost_2" value="Revised Cost 2" />
                <TextInput
                    id="revised_cost_2"
                    v-model="form.revised_cost_2"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.revised_cost_2 }"
                />
                <InputError class="mt-2" :message="form.errors.revised_cost_2" />
            </div>

            <!-- Revised Cost 3 -->
            <div>
                <InputLabel for="revised_cost_3" value="Revised Cost 3" />
                <TextInput
                    id="revised_cost_3"
                    v-model="form.revised_cost_3"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.revised_cost_3 }"
                />
                <InputError class="mt-2" :message="form.errors.revised_cost_3" />
            </div>

            <!-- HPP Inauguration Date -->
            <div>
                <InputLabel for="hpp_inauguration_date" value="HPP Inauguration Date" />
                <DatePicker
                    id="hpp_inauguration_date"
                    v-model="form.hpp_inauguration_date"
                    :class="{ 'border-red-500': form.errors.hpp_inauguration_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.hpp_inauguration_date" />
            </div>

            <!-- Technical Survey Date -->
            <div>
                <InputLabel for="technical_survey_date" value="Technical Survey Date" />
                <DatePicker
                    id="technical_survey_date"
                    v-model="form.technical_survey_date"
                    :class="{ 'border-red-500': form.errors.technical_survey_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.technical_survey_date" />
            </div>

            <!-- Date Design PSU Submission -->
            <div>
                <InputLabel for="date_design_psu_submission" value="Date Design PSU Submission" />
                <DatePicker
                    id="date_design_psu_submission"
                    v-model="form.date_design_psu_submission"
                    :class="{ 'border-red-500': form.errors.date_design_psu_submission }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.date_design_psu_submission" />
            </div>

            <!-- Head Office Review Submission Date -->
            <div>
                <InputLabel for="headoffice_review_submission_date" value="Head Office Review Submission Date" />
                <DatePicker
                    id="headoffice_review_submission_date"
                    v-model="form.headoffice_review_submission_date"
                    :class="{ 'border-red-500': form.errors.headoffice_review_submission_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.headoffice_review_submission_date" />
            </div>

            <!-- Design Estimate Date -->
            <div>
                <InputLabel for="design_estimate_date" value="Design Estimate Date" />
                <DatePicker
                    id="design_estimate_date"
                    v-model="form.design_estimate_date"
                    :class="{ 'border-red-500': form.errors.design_estimate_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.design_estimate_date" />
            </div>

            <!-- EU Approval Submission Date -->
            <div>
                <InputLabel for="eu_approval_submission_date" value="EU Approval Submission Date" />
                <DatePicker
                    id="eu_approval_submission_date"
                    v-model="form.eu_approval_submission_date"
                    :class="{ 'border-red-500': form.errors.eu_approval_submission_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.eu_approval_submission_date" />
            </div>

            <!-- OPM Validation Date -->
            <div>
                <InputLabel for="opm_validation_date" value="OPM Validation Date" />
                <DatePicker
                    id="opm_validation_date"
                    v-model="form.opm_validation_date"
                    :class="{ 'border-red-500': form.errors.opm_validation_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.opm_validation_date" />
            </div>

            <!-- Remarks (WYSIWYG Editor) -->
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
        </div>

        <!-- Attachments Section -->
        <div class="mt-6">
            <InputLabel value="Attachments" />
            <AttachmentUploader
                v-model="form.attachments"
                :existing-attachments="existingAttachments"
                @remove-existing="handleAttachmentsToDelete"
                :error-message="form.errors.attachments"
            />
            <InputError class="mt-2" :message="form.errors.attachments" />
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
                {{ isEditMode ? 'Update Approval' : 'Add Approval' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
