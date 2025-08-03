<script setup>
import { reactive, watch, ref, onMounted, nextTick } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import SearchableVendorSelect from '@/Components/SearchableVendorSelect.vue';
import DangerButton from "@/Components/DangerButton.vue";

const props = defineProps({
    irrigationSchemeId: { type: Number, required: true },
    approval: { type: Object, default: null }, // This prop carries the existing approval object
    action: { type: String, default: 'create' }, // 'create' or 'update'
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.action === 'update');
const existingAttachments = ref([]);

const form = useForm({
    irrigation_scheme_id: props.irrigationSchemeId,
    approved_vendor: '',
    vendor_id: null,
    approved_cost: null,
    date_technical_surveys: null,
    date_design_estimates_submission_psu: null,
    date_validation_visit_psu: null,
    remarks: '',
    attachments: [],
    attachments_to_delete: [],
});

// Watch for changes in the 'approval' prop to initialize the form
watch(() => props.approval, (newApproval) => {
    console.log('--- IrrigationAdminApprovalForm: props.approval watcher triggered ---');
    console.log('Watcher received newApproval prop:', newApproval);

    isEditMode.value = !!newApproval;

    // Use form.defaults and form.reset for a robust reset mechanism
    form.defaults({
        irrigation_scheme_id: props.irrigationSchemeId,
        approved_vendor: newApproval?.approved_vendor ?? '',
        vendor_id: newApproval?.vendor_id ?? null,
        approved_cost: newApproval?.approved_cost ?? null,
        date_technical_surveys: newApproval?.date_technical_surveys ?? null,
        date_design_estimates_submission_psu: newApproval?.date_design_estimates_submission_psu ?? null,
        date_validation_visit_psu: newApproval?.date_validation_visit_psu ?? null,
        remarks: newApproval?.remarks ?? '',
        attachments: [],
        attachments_to_delete: [],
    });

    form.reset();

    // Update existing attachments separately and safely
    existingAttachments.value = newApproval?.attachments_frontend ?? [];

    form.clearErrors();
    console.log('IrrigationAdminApprovalForm: Form and attachments initialized based on new prop.');
}, { immediate: true });

onMounted(() => {
    console.log('--- IrrigationAdminApprovalForm: Mounted ---');
    console.log('IrrigationAdminApprovalForm: Initial form.data() on mount:', form.data());
    console.log('IrrigationAdminApprovalForm: Initial existingAttachments on mount:', existingAttachments.value);
});

const handleAttachmentsToDelete = (id) => {
    console.log('--- IrrigationAdminApprovalForm: handleAttachmentsToDelete called ---');
    console.log('Deleting attachment ID:', id);
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    console.log('--- IrrigationAdminApprovalForm: handleSubmit triggered ---');
    console.log('Form data before POST:', form.data());
    console.log('Attachments array before POST:', form.attachments);

    const url = isEditMode.value
        ? route('irrigation.admin-approvals.update', { scheme: props.irrigationSchemeId, admin_approval: props.approval.id })
        : route('irrigation.admin-approvals.store', { scheme: props.irrigationSchemeId });

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            console.log('--- IrrigationAdminApprovalForm: Submission Success ---');
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'Admin Approval updated successfully!' : 'Admin Approval created successfully!');
        },
        onError: (errors) => {
            console.error('--- IrrigationAdminApprovalForm: Submission Error ---');
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    console.log('--- IrrigationAdminApprovalForm: Cancel triggered ---');
    form.reset();
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};
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
                <InputLabel for="vendor_id" value="Select Vendor" />
                <SearchableVendorSelect
                    id="vendor_id"
                    v-model="form.vendor_id"
                    :initial-vendor="approval?.vendor"
                    :error-message="form.errors.vendor_id"
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
                            <p v-if="revision.remarks" class="text-xs text-gray-600 mt-1" v-html="revision.remarks"></p>
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
