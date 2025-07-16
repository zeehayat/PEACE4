<script setup>
import { useForm, router } from '@inertiajs/vue3';
import { watch, ref } from 'vue';
import DatePicker from '@/Components/DatePicker.vue'; // Global component
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'; // Global component

const props = defineProps({
    mhpSiteId: [Number, String], // The MHP Site ID (required)
    approval: Object, // Existing approval object for edit mode (null for create)
    action: String, // 'create' or 'update'
});

const emit = defineEmits(['success', 'cancel']); // Emit 'success' on save, 'cancel' on close

// Define all fields for the form
const form = useForm({
    _method: props.action === 'update' ? 'PUT' : 'POST', // For Inertia method spoofing
    mhp_site_id: props.mhpSiteId, // Always set from prop
    eu_approval_date: props.approval?.eu_approval_date || null,
    approved_cost: props.approval?.approved_cost ?? null,
    civil_work_start_date: props.approval?.civil_work_start_date || null,
    scheme_inauguration_date: props.approval?.scheme_inauguration_date || null,
    date_design_estimates_submission_psu: props.approval?.date_design_estimates_submission_psu || null,
    date_design_estimates_submission_opm_eu_review: props.approval?.date_design_estimates_submission_opm_eu_review || null,
    date_validation_visit_opm: props.approval?.date_validation_visit_opm || null,
    remarks: props.approval?.remarks || '', // Ensure remarks is handled

    // File-related properties for useForm
    attachments: [], // For new files to upload
    removed_attachments: [], // For IDs of files to remove
});

// For AttachmentUploader's :existing prop
const existingAttachments = ref(props.approval?.attachments_frontend || []); // Use attachments_frontend


// Watch for 'approval' prop changes (if modal is reused)
watch(
    () => props.approval,
    (newApproval) => {
        if (props.action === 'update' && newApproval) {
            form.mhp_site_id = props.mhpSiteId; // Ensure MHP Site ID is correct
            form.eu_approval_date = newApproval.eu_approval_date || null;
            form.approved_cost = newApproval.approved_cost ?? null;
            form.civil_work_start_date = newApproval.civil_work_start_date || null;
            form.scheme_inauguration_date = newApproval.scheme_inauguration_date || null;
            form.date_design_estimates_submission_psu = newApproval.date_design_estimates_submission_psu || null;
            form.date_design_estimates_submission_opm_eu_review = newApproval.date_design_estimates_submission_opm_eu_review || null;
            form.date_validation_visit_opm = newApproval.date_validation_visit_opm || null;
            form.remarks = newApproval.remarks || '';

            existingAttachments.value = newApproval.attachments_frontend || [];
            form.attachments = [];
            form.removed_attachments = [];
        } else if (props.action === 'create') {
            form.reset(); // Reset form for fresh creation
            form.mhp_site_id = props.mhpSiteId; // Re-set MHP Site ID
            form.attachments = [];
            form.removed_attachments = [];
            existingAttachments.value = [];
        }
    },
    { immediate: true, deep: true }
);


const handleRemoveExistingAttachment = (fileId) => {
    form.removed_attachments.push(fileId);
    existingAttachments.value = existingAttachments.value.filter(f => f.id !== fileId);
};


const submitForm = () => {
    const url = props.action === 'create'
        ? route('mhp.admin-approvals.store')
        : route('mhp.admin-approvals.update', props.approval.id);

    // Manually construct FormData for robustness with file uploads and _method spoofing
    const formDataPayload = new FormData();

    // Append standard fields from form.data()
    for (const key in form.data()) {
        // Skip attachments and removed_attachments as they are appended manually below
        if (key === 'attachments' || key === 'removed_attachments') {
            continue;
        }

        const value = form.data()[key];
        formDataPayload.append(key, value === null || value === undefined ? '' : value);
    }

    // Explicitly append _method for PUT/PATCH
    if (props.action === 'update') {
        formDataPayload.append('_method', 'PUT'); // Or 'PATCH' if your route is PATCH
    }

    // Append new attachments
    form.attachments.forEach(file => {
        if (file instanceof File) {
            formDataPayload.append('attachments[]', file);
        } else {
            console.warn('MhpAdminApprovalForm: Skipping invalid attachment:', file);
        }
    });

    // Append IDs of attachments to be removed
    form.removed_attachments.forEach(id => {
        formDataPayload.append('removed_attachments[]', id);
    });

    router.post(url, formDataPayload, { // Use router.post directly
        onSuccess: () => {
            emit('success', `MHP Admin Approval ${props.action === 'create' ? 'saved' : 'updated'} successfully!`);
        },
        onError: (errors) => {
            console.error('MhpAdminApprovalForm: Submission Errors:', errors);
            // Form errors will automatically populate form.errors for display
        },
    });
};

const cancelForm = () => {
    emit('cancel'); // Emit 'cancel' to parent modal
};
</script>

<template>
    <form @submit.prevent="submitForm" class="p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <div class="col-span-full">
                <label for="mhp_site_id" class="block text-sm font-medium text-gray-700 mb-1">MHP Site ID</label>
                <div class="input-compact bg-gray-100 text-gray-700 font-semibold cursor-not-allowed flex items-center h-[38px] px-3 py-1.5 rounded-lg">
                    {{ mhpSiteId || 'N/A' }} </div>
                <input type="hidden" v-model="form.mhp_site_id" />
                <div v-if="form.errors.mhp_site_id" class="text-red-500 text-xs mt-1">{{ form.errors.mhp_site_id }}</div>
            </div>

            <div>
                <label for="eu_approval_date" class="block text-sm font-medium text-gray-700 mb-1">EU Approval Date</label>
                <DatePicker v-model="form.eu_approval_date" id="eu_approval_date" class="input-compact" />
                <div v-if="form.errors.eu_approval_date" class="text-red-500 text-xs mt-1">{{ form.errors.eu_approval_date }}</div>
            </div>

            <div>
                <label for="approved_cost" class="block text-sm font-medium text-gray-700 mb-1">Approved Cost</label>
                <input type="number" step="0.01" id="approved_cost" v-model.number="form.approved_cost" class="input-compact" />
                <div v-if="form.errors.approved_cost" class="text-red-500 text-xs mt-1">{{ form.errors.approved_cost }}</div>
            </div>

            <div>
                <label for="civil_work_start_date" class="block text-sm font-medium text-gray-700 mb-1">Civil Work Start Date</label>
                <DatePicker v-model="form.civil_work_start_date" id="civil_work_start_date" class="input-compact" />
                <div v-if="form.errors.civil_work_start_date" class="text-red-500 text-xs mt-1">{{ form.errors.civil_work_start_date }}</div>
            </div>

            <div>
                <label for="scheme_inauguration_date" class="block text-sm font-medium text-gray-700 mb-1">Scheme Inauguration Date</label>
                <DatePicker v-model="form.scheme_inauguration_date" id="scheme_inauguration_date" class="input-compact" />
                <div v-if="form.errors.scheme_inauguration_date" class="text-red-500 text-xs mt-1">{{ form.errors.scheme_inauguration_date }}</div>
            </div>

            <div>
                <label for="date_design_estimates_submission_psu" class="block text-sm font-medium text-gray-700 mb-1">Design/Estimates PSU Submission Date</label>
                <DatePicker v-model="form.date_design_estimates_submission_psu" id="date_design_estimates_submission_psu" class="input-compact" />
                <div v-if="form.errors.date_design_estimates_submission_psu" class="text-red-500 text-xs mt-1">{{ form.errors.date_design_estimates_submission_psu }}</div>
            </div>

            <div>
                <label for="date_design_estimates_submission_opm_eu_review" class="block text-sm font-medium text-gray-700 mb-1">Design/Estimates OPM/EU Review Date</label>
                <DatePicker v-model="form.date_design_estimates_submission_opm_eu_review" id="date_design_estimates_submission_opm_eu_review" class="input-compact" />
                <div v-if="form.errors.date_design_estimates_submission_opm_eu_review" class="text-red-500 text-xs mt-1">{{ form.errors.date_design_estimates_submission_opm_eu_review }}</div>
            </div>

            <div>
                <label for="date_validation_visit_opm" class="block text-sm font-medium text-gray-700 mb-1">Validation Visit OPM Date</label>
                <DatePicker v-model="form.date_validation_visit_opm" id="date_validation_visit_opm" class="input-compact" />
                <div v-if="form.errors.date_validation_visit_opm" class="text-red-500 text-xs mt-1">{{ form.errors.date_validation_visit_opm }}</div>
            </div>

            <div class="col-span-full">
                <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea id="remarks" v-model="form.remarks" rows="3" class="input-compact"></textarea>
                <div v-if="form.errors.remarks" class="text-red-500 text-xs mt-1">{{ form.errors.remarks }}</div>
            </div>
        </div>

        <div class="mt-6">
            <AttachmentUploader
                v-model="form.attachments"
                :existing="existingAttachments"
                @removeExisting="handleRemoveExistingAttachment"
                label="Approval Attachments"
            />
            <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">{{ form.errors['attachments.0'] }}</div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="cancelForm" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
            </button>
            <button type="submit" :disabled="form.processing" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ form.processing ? 'Saving...' : (action === 'create' ? 'Add Approval' : 'Update Approval') }}
            </button>
        </div>
    </form>
</template>

<style scoped>
.input-compact {
    @apply appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
label {
    margin-bottom: 0.25rem;
}
</style>
