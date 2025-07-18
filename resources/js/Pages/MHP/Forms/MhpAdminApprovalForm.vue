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

const props = defineProps({
    mhpSiteId: {
        type: Number,
        required: true, // The MHP Site this approval belongs to
    },
    approval: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
    action: {
        type: String,
        default: 'create', // 'create' or 'update'
    },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.action === 'update');
const existingAttachments = ref(props.approval ? props.approval.attachments_frontend : []);

const form = useForm({
    mhp_site_id: props.mhpSiteId,
    eu_approval_date: props.approval ? props.approval.eu_approval_date : null,
    approved_cost: props.approval ? props.approval.approved_cost : '',
    revised_cost_1: props.approval ? props.approval.revised_cost_1 : '',
    revised_cost_2: props.approval ? props.approval.revised_cost_2 : '',
    revised_cost_3: props.approval ? props.approval.revised_cost_3 : '',
    hpp_inauguration_date: props.approval ? props.approval.hpp_inauguration_date : null,
    technical_survey_date: props.approval ? props.approval.technical_survey_date : null,
    date_design_psu_submission: props.approval ? props.approval.date_design_psu_submission : null,
    headoffice_review_submission_date: props.approval ? props.approval.headoffice_review_submission_date : null,
    design_estimate_date: props.approval ? props.approval.design_estimate_date : null,
    eu_approval_submission_date: props.approval ? props.approval.eu_approval_submission_date : null,
    opm_validation_date: props.approval ? props.approval.opm_validation_date : null,
    remarks: props.approval ? props.approval.remarks : '',
    attachments: [],
    attachments_to_delete: [],
});


// Handle attachment changes from AttachmentUploader
const handleFilePondUpdate = (files) => {
    form.attachments = files.map(fileItem => fileItem.file);
};

const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('mhp.admin-approvals.update', props.approval.id)
        : route('mhp.admin-approvals.store');

    const method = isEditMode.value ? 'post' : 'post'; // Laravel PUT/PATCH via POST with _method spoofing

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put'; // or 'patch'
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            form.reset();
            emit('success', isEditMode.value ? 'Admin Approval updated successfully!' : 'Admin Approval created successfully!');
            form.attachments = [];
            form.attachments_to_delete = [];
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
    emit('cancel');
};

// Watch for prop changes if the component might be reused for different approvals
watch(() => props.approval, (newApproval) => {
    if (newApproval) {
        isEditMode.value = true;
        form.mhp_site_id = props.mhpSiteId; // Ensure site ID is always correct
        form.eu_approval_date = newApproval.eu_approval_date;
        form.approved_cost = newApproval.approved_cost;
        form.revised_cost_1 = newApproval.revised_cost_1;
        form.revised_cost_2 = newApproval.revised_cost_2;
        form.revised_cost_3 = newApproval.revised_cost_3;
        form.hpp_inauguration_date = newApproval.hpp_inauguration_date;
        form.technical_survey_date = newApproval.technical_survey_date;
        form.date_design_psu_submission = newApproval.date_design_psu_submission;
        form.headoffice_review_submission_date = newApproval.headoffice_review_submission_date;
        form.design_estimate_date = newApproval.design_estimate_date;
        form.eu_approval_submission_date = newApproval.eu_approval_submission_date;
        form.opm_validation_date = newApproval.opm_validation_date;
        form.remarks = newApproval.remarks;
        existingAttachments.value = newApproval.attachments_frontend;
        form.attachments_to_delete = [];
        form.attachments = [];
        form.clearErrors();
    } else {
        isEditMode.value = false;
        form.reset();
        form.mhp_site_id = props.mhpSiteId; // Ensure site ID is set for new creation
        existingAttachments.value = [];
        form.clearErrors();
    }
}, { immediate: true });

onMounted(() => {
    if (!isEditMode.value) {
        form.mhp_site_id = props.mhpSiteId; // Set site ID on mount for create mode
    }
});
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <input type="hidden" v-model="form.mhp_site_id" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div class="md:col-span-2">
                <InputLabel for="remarks" value="Remarks" />
                <TextArea
                    id="remarks"
                    v-model="form.remarks"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.remarks }"
                />
                <InputError class="mt-2" :message="form.errors.remarks" />
            </div>
        </div>

        <div class="mt-6">
            <InputLabel value="Attachments" />
            <AttachmentUploader
                :existing-attachments="existingAttachments"
                @update-files="handleFilePondUpdate"
                @delete-existing-attachments="handleAttachmentsToDelete"
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
