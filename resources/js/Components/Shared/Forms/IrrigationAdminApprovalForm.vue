<script setup>
import { ref, watch } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import DatePicker from '@/Components/DatePicker.vue'; // Assuming you use this DatePicker component

const props = defineProps({
    irrigationSchemeId: { type: [String, Number], required: true },
    approval: { type: Object, default: null }, // Existing approval object if in edit mode
    mode: { type: String, default: 'create' }, // 'create' or 'edit'
});

const emit = defineEmits(['saved', 'cancel']);

const newAttachments = ref([]);
const existingAttachments = ref([]);
const attachmentsToRemove = ref([]);

const form = useForm({
    _method: props.mode === 'edit' ? 'PUT' : 'POST',
    irrigation_scheme_id: props.irrigationSchemeId,
    eu_approval_date: '',
    approved_cost: '',
    civil_work_start_date: '', // From MHP, re-evaluate if needed for IrrigationAdminApproval
    scheme_inauguration_date: '', // From MHP, re-evaluate if needed for IrrigationAdminApproval
    date_design_estimates_submission_psu: '',
    date_design_estimates_submission_opm_eu_review: '',
    date_validation_visit_opm: '',
});

// Watch for changes in the 'approval' prop to populate the form for editing
watch(
    () => props.approval,
    (newApproval) => {
        if (newApproval && props.mode === 'edit') {
            form.irrigation_scheme_id = newApproval.irrigation_scheme_id;
            form.eu_approval_date = newApproval.eu_approval_date;
            form.approved_cost = newApproval.approved_cost;
            form.civil_work_start_date = newApproval.civil_work_start_date;
            form.scheme_inauguration_date = newApproval.scheme_inauguration_date;
            form.date_design_estimates_submission_psu = newApproval.date_design_estimates_submission_psu;
            form.date_design_estimates_submission_opm_eu_review = newApproval.date_design_estimates_submission_opm_eu_review;
            form.date_validation_visit_opm = newApproval.date_validation_visit_opm;
            existingAttachments.value = newApproval.attachments || [];
        } else if (props.mode === 'create') {
            // Reset form for creation if no existing approval or mode is create
            form.reset();
            form.irrigation_scheme_id = props.irrigationSchemeId; // Ensure scheme ID is set for new creation
            existingAttachments.value = [];
        }
        newAttachments.value = [];
        attachmentsToRemove.value = [];
    },
    { immediate: true, deep: true }
);

const removeExisting = (file) => {
    attachmentsToRemove.value.push(file.id);
    existingAttachments.value = existingAttachments.value.filter(f => f.id !== file.id);
};

const submit = () => {
    const data = new FormData();
    Object.entries(form.data()).forEach(([key, val]) => {
        // Append all form data, handling null/undefined values
        if (typeof val === 'number' || (typeof val === 'string' && val.match(/^\d+(\.\d+)?$/))) {
            data.append(key, val);
        } else {
            data.append(key, val ?? '');
        }
    });

    newAttachments.value.forEach(file => {
        data.append('attachments[]', file);
    });
    attachmentsToRemove.value.forEach(id => {
        data.append('removed_attachments[]', id);
    });

    const url = props.mode === 'create'
        ? route('irrigation.admin-approvals.store')
        : route('irrigation.admin-approvals.update', props.approval.id);

    router.post(url, data, {
        forceFormData: true,
        onSuccess: () => {
            emit('saved', `Irrigation Admin Approval ${props.mode === 'create' ? 'created' : 'updated'} successfully.`);
            emit('cancel'); // Close modal
        },
        onError: (errors) => {
            console.error('Validation Errors:', errors);
            // Inertia's useForm automatically populates form.errors
        },
    });
};
</script>

<template>
    <form @submit.prevent="submit" class="space-y-4 p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <!-- Irrigation Scheme ID (Read-only) -->
            <div class="col-span-full">
                <label for="irrigation_scheme_id" class="block text-sm font-medium text-gray-700 mb-1">Irrigation Scheme ID</label>
                <input type="text" :value="irrigationSchemeId" id="irrigation_scheme_id" class="input-compact bg-gray-100" readonly />
            </div>

            <!-- EU Approval Date -->
            <div>
                <label for="eu_approval_date" class="block text-sm font-medium text-gray-700 mb-1">EU Approval Date</label>
                <DatePicker v-model="form.eu_approval_date" id="eu_approval_date" class="input-compact" />
                <div v-if="form.errors.eu_approval_date" class="text-red-500 text-xs mt-1">{{ form.errors.eu_approval_date }}</div>
            </div>

            <!-- Approved Cost -->
            <div>
                <label for="approved_cost" class="block text-sm font-medium text-gray-700 mb-1">Approved Cost</label>
                <input type="number" step="0.01" id="approved_cost" v-model="form.approved_cost" class="input-compact" />
                <div v-if="form.errors.approved_cost" class="text-red-500 text-xs mt-1">{{ form.errors.approved_cost }}</div>
            </div>

            <!-- Date Design & Estimates Submitted to PSU -->
            <div>
                <label for="date_design_estimates_submission_psu" class="block text-sm font-medium text-gray-700 mb-1">Design Submitted to PSU</label>
                <DatePicker v-model="form.date_design_estimates_submission_psu" id="date_design_estimates_submission_psu" class="input-compact" />
                <div v-if="form.errors.date_design_estimates_submission_psu" class="text-red-500 text-xs mt-1">{{ form.errors.date_design_estimates_submission_psu }}</div>
            </div>

            <!-- Date Design & Estimates Submission to OPM/EU for Review -->
            <div>
                <label for="date_design_estimates_submission_opm_eu_review" class="block text-sm font-medium text-gray-700 mb-1">Design Submitted to OPM/EU for Review</label>
                <DatePicker v-model="form.date_design_estimates_submission_opm_eu_review" id="date_design_estimates_submission_opm_eu_review" class="input-compact" />
                <div v-if="form.errors.date_design_estimates_submission_opm_eu_review" class="text-red-500 text-xs mt-1">{{ form.errors.date_design_estimates_submission_opm_eu_review }}</div>
            </div>

            <!-- Date of Validation Visit by OPM -->
            <div>
                <label for="date_validation_visit_opm" class="block text-sm font-medium text-gray-700 mb-1">Validation Visit by OPM</label>
                <DatePicker v-model="form.date_validation_visit_opm" id="date_validation_visit_opm" class="input-compact" />
                <div v-if="form.errors.date_validation_visit_opm" class="text-red-500 text-xs mt-1">{{ form.errors.date_validation_visit_opm }}</div>
            </div>

            <!-- Civil Work Start Date (from MHP, re-evaluate if needed here) -->
            <div>
                <label for="civil_work_start_date" class="block text-sm font-medium text-gray-700 mb-1">Civil Work Start Date</label>
                <DatePicker v-model="form.civil_work_start_date" id="civil_work_start_date" class="input-compact" />
                <div v-if="form.errors.civil_work_start_date" class="text-red-500 text-xs mt-1">{{ form.errors.civil_work_start_date }}</div>
            </div>

            <!-- Scheme Inauguration Date (from MHP, re-evaluate if needed here) -->
            <div>
                <label for="scheme_inauguration_date" class="block text-sm font-medium text-gray-700 mb-1">Scheme Inauguration Date</label>
                <DatePicker v-model="form.scheme_inauguration_date" id="scheme_inauguration_date" class="input-compact" />
                <div v-if="form.errors.scheme_inauguration_date" class="text-red-500 text-xs mt-1">{{ form.errors.scheme_inauguration_date }}</div>
            </div>
        </div>

        <div class="mt-6">
            <AttachmentUploader
                v-model="newAttachments"
                :existing="existingAttachments"
                @removeExisting="removeExisting"
                label="Approval Attachments"
            />
            <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">{{ form.errors['attachments.0'] }}</div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="emit('cancel')" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
            </button>
            <button type="submit" :disabled="form.processing" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ form.processing ? 'Saving...' : (mode === 'create' ? 'Save Approval' : 'Update Approval') }}
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
