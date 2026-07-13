<script setup>
import { reactive, watch, ref, onMounted, nextTick } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputGroup from '@/Components/FormComponents/InputGroup.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import SearchableVendorSelect from '@/Components/SearchableVendorSelect.vue';

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

watch(() => props.approval, (newApproval) => {
    isEditMode.value = !!newApproval;
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
    existingAttachments.value = newApproval?.attachments_frontend ?? [];
    form.clearErrors();
}, { immediate: true });

onMounted(() => {
    // The watcher handles form initialization on mount and prop changes.
});

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
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
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
            <InputGroup id="date_technical_surveys" label="Date of Technical Surveys" :required="true" :error="form.errors.date_technical_surveys">
                <DatePicker
                    id="date_technical_surveys"
                    v-model="form.date_technical_surveys"
                    :class="{ 'border-red-500': form.errors.date_technical_surveys }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Date of Detail Design & estimates Submitted to PSU -->
            <InputGroup
                id="date_design_estimates_submission_psu"
                label="Date of Design & Estimates Submitted to PSU"
                :required="true"
                help="PSU refers to the Project Support Unit that reviews and processes scheme design and cost estimates."
                :error="form.errors.date_design_estimates_submission_psu"
            >
                <DatePicker
                    id="date_design_estimates_submission_psu"
                    v-model="form.date_design_estimates_submission_psu"
                    :class="{ 'border-red-500': form.errors.date_design_estimates_submission_psu }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Date of Validation Visit by PSU -->
            <InputGroup
                id="date_validation_visit_psu"
                label="Date of Validation Visit by PSU"
                :required="true"
                help="PSU refers to the Project Support Unit that reviews and processes scheme design and cost estimates."
                :error="form.errors.date_validation_visit_psu"
            >
                <DatePicker
                    id="date_validation_visit_psu"
                    v-model="form.date_validation_visit_psu"
                    :class="{ 'border-red-500': form.errors.date_validation_visit_psu }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Approved Vendor -->
            <InputGroup id="approved_vendor" label="Approved Vendor (Name)" :error="form.errors.approved_vendor">
                <TextInput
                    id="approved_vendor"
                    v-model="form.approved_vendor"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.approved_vendor }"
                />
            </InputGroup>
            <!-- Vendor ID (linked to Vendors table) -->
            <InputGroup id="vendor_id" label="Select Vendor" :error="form.errors.vendor_id">
                <SearchableVendorSelect
                    id="vendor_id"
                    v-model="form.vendor_id"
                    :initial-vendor="approval?.vendor"
                    :error-message="form.errors.vendor_id"
                />
            </InputGroup>

            <!-- Approved Cost -->
            <InputGroup id="approved_cost" label="Approved Cost (PKR)" :required="true" :error="form.errors.approved_cost">
                <TextInput
                    id="approved_cost"
                    v-model="form.approved_cost"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.approved_cost }"
                />
            </InputGroup>
        </div>

        <!-- Attachments Section for Admin Approval -->
        <div class="mt-6">
            <InputGroup label="Attachments" :error="form.errors.attachments">
                <AttachmentUploader
                    v-model="form.attachments"
                    :existing-attachments="existingAttachments"
                    @remove-existing="handleAttachmentsToDelete"
                    :error-message="form.errors.attachments"
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
                {{ isEditMode ? 'Update Approval' : 'Add Approval' }}
            </PrimaryButton>
        </div>
    </form>
</template>
