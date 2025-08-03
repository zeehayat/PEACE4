<script setup>
import { reactive, watch, ref, onMounted, computed } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import axios from 'axios';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import SearchableVendorSelect from '@/Components/SearchableVendorSelect.vue'; // Assuming a SearchableVendorSelect component exists

const props = defineProps({
    irrigationSchemeId: {
        type: Number,
        required: true, // The parent Irrigation Scheme ID
    },
    approval: {
        type: Object,
        default: null, // Existing approval object for update mode
    },
    action: {
        type: String,
        default: 'create', // 'create' or 'update'
    },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.action === 'update');

const existingAttachments = ref([]);
const existingCostRevisionAttachments = ref([]);

const costRevisions = ref([]); // Local state for the list of cost revisions
const showCostRevisionForm = ref(false);
const selectedCostRevision = ref(null);
const costRevisionMode = ref('create');

const form = useForm({
    irrigation_scheme_id: props.irrigationSchemeId,
    approved_vendor: props.approval?.approved_vendor ?? null,
    vendor_id: props.approval?.vendor_id ?? null,
    approved_cost: props.approval?.approved_cost ?? null,
    date_technical_surveys: props.approval?.date_technical_surveys ?? null,
    date_design_estimates_submission_psu: props.approval?.date_design_estimates_submission_psu ?? null,
    date_validation_visit_psu: props.approval?.date_validation_visit_psu ?? null,
    attachments: [],
    attachments_to_delete: [],
});

const revisionForm = useForm({
    approvable_id: props.approval?.id,
    approvable_type: props.approval?.id ? 'irrigation_admin_approval' : null,
    revision_number: null,
    revised_cost: null,
    approved_on: null,
    remarks: '',
    attachments: [],
    attachments_to_delete: [],
});


// Helper function to format nullable dates for display
const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        console.error('Error parsing date:', dateString, e);
        return 'Invalid Date';
    }
};

const fetchCostRevisions = async () => {
    if (!props.approval?.id) {
        costRevisions.value = [];
        return;
    }
    try {
        const response = await axios.get(
            route('irrigation.admin-approvals.cost-revisions.index', { admin_approval: props.approval.id, 'only-data': true })
        );
        costRevisions.value = response.data.costRevisions ?? [];
    } catch (error) {
        console.error('Error fetching cost revisions:', error);
    }
};

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('irrigation.schemes.admin-approvals.update', { scheme: props.irrigationSchemeId, admin_approval: props.approval.id })
        : route('irrigation.schemes.admin-approvals.store', { scheme: props.irrigationSchemeId });

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            emit('success', isEditMode.value ? 'Admin Approval updated successfully!' : 'Admin Approval created successfully!');
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

const openCreateRevisionForm = () => {
    selectedCostRevision.value = null;
    costRevisionMode.value = 'create';
    showCostRevisionForm.value = true;
};
const openEditRevisionForm = (revision) => {
    selectedCostRevision.value = revision;
    costRevisionMode.value = 'update';
    showCostRevisionForm.value = true;
};
const handleRevisionFormSuccess = () => {
    showCostRevisionForm.value = false;
    fetchCostRevisions();
};
const handleRevisionFormCancel = () => {
    showCostRevisionForm.value = false;
};

// Watch for prop.approval changes to re-initialize form
watch(() => props.approval, (newVal) => {
    isEditMode.value = !!newVal;
    form.fill(getInitialFormData(newVal));
    existingAttachments.value = newVal?.attachments_frontend ?? [];
    form.clearErrors();
    fetchCostRevisions(); // Fetch revisions when approval changes
}, { immediate: true });
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <input type="hidden" v-model="form.irrigation_scheme_id" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Date of technical surveys -->
            <div>
                <InputLabel for="date_technical_surveys" value="Date of Technical Surveys" />
                <DatePicker
                    id="date_technical_surveys"
                    v-model="form.date_technical_surveys"
                    :class="{ 'border-red-500': form.errors.date_technical_surveys }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.date_technical_surveys" />
            </div>

            <!-- Date of Detail Design & estimates Submitted to PSU -->
            <div>
                <InputLabel for="date_design_estimates_submission_psu" value="Date of Design & Estimates Submitted to PSU" />
                <DatePicker
                    id="date_design_estimates_submission_psu"
                    v-model="form.date_design_estimates_submission_psu"
                    :class="{ 'border-red-500': form.errors.date_design_estimates_submission_psu }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.date_design_estimates_submission_psu" />
            </div>

            <!-- Date of Validation Visit by PSU -->
            <div>
                <InputLabel for="date_validation_visit_psu" value="Date of Validation Visit by PSU" />
                <DatePicker
                    id="date_validation_visit_psu"
                    v-model="form.date_validation_visit_psu"
                    :class="{ 'border-red-500': form.errors.date_validation_visit_psu }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.date_validation_visit_psu" />
            </div>

            <!-- Approved Vendor -->
            <div>
                <InputLabel for="approved_vendor" value="Approved Vendor (Name)" />
                <TextInput
                    id="approved_vendor"
                    v-model="form.approved_vendor"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.approved_vendor }"
                />
                <InputError class="mt-2" :message="form.errors.approved_vendor" />
            </div>
            <!-- Vendor ID (linked to Vendors table) -->
            <div>
                <InputLabel for="vendor_id" value="Vendor" />
                <SearchableVendorSelect
                    id="vendor_id"
                    v-model="form.vendor_id"
                    :initial-vendor="approval?.vendor"
                    :class="{ 'border-red-500': form.errors.vendor_id }"
                />
                <InputError class="mt-2" :message="form.errors.vendor_id" />
            </div>

            <!-- Approved Cost -->
            <div>
                <InputLabel for="approved_cost" value="Approved Cost (PKR)" />
                <TextInput
                    id="approved_cost"
                    v-model="form.approved_cost"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.approved_cost }"
                />
                <InputError class="mt-2" :message="form.errors.approved_cost" />
            </div>
        </div>

        <!-- Cost Revisions Section -->
        <div v-if="isEditMode" class="mt-8 border-t pt-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-800">Cost Revisions</h3>
                <PrimaryButton @click="openCreateRevisionForm" :disabled="showCostRevisionForm">
                    + Add New Revision
                </PrimaryButton>
            </div>

            <div v-if="showCostRevisionForm">
                <!-- Placeholder for Cost Revision Form -->
                <p>Cost Revision Form will go here</p>
            </div>

            <div v-else>
                <div v-if="costRevisions.length > 0">
                    <div v-for="revision in costRevisions" :key="revision.id" class="border rounded-md p-4 mb-2 flex justify-between items-center bg-gray-50">
                        <div>
                            <p class="font-semibold">Revision #{{ revision.revision_number }}</p>
                            <p class="text-sm">Cost: PKR {{ revision.revised_cost }} on {{ formatNullableDate(revision.approved_on) }}</p>
                        </div>
                        <div class="flex space-x-2">
                            <PrimaryButton @click="openEditRevisionForm(revision)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                            <DangerButton @click="handleDeleteRevision(revision.id)" class="px-3 py-1 text-sm">Delete</DangerButton>
                        </div>
                    </div>
                </div>
                <p v-else class="text-gray-500 text-center">No cost revisions have been recorded.</p>
            </div>
        </div>

        <!-- Attachments Section for Admin Approval -->
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
