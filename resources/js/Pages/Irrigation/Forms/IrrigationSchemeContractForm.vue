<script setup>
import { reactive, watch, ref, onMounted, computed } from 'vue';
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
import SearchableVendorSelect from '@/Components/SearchableVendorSelect.vue';

const props = defineProps({
    schemeId: { type: Number, required: true },
    contract: { type: Object, default: null },
    mode: { type: String, default: 'create' },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref([]);

function getInitialFormData(contract) {
    return {
        irrigation_scheme_id: props.schemeId,
        vendor_id: contract?.vendor_id ?? null,
        approved_vendor: contract?.approved_vendor ?? '',
        date_of_agreement_contract: contract?.date_of_agreement_contract ?? null,
        date_of_physical_start: contract?.date_of_physical_start ?? null,
        agreement_cost: contract?.agreement_cost ?? null,
        remarks: contract?.remarks ?? '',
        attachments: [],
        attachments_to_delete: [],
    };
}

const form = useForm(getInitialFormData(props.contract));

watch(() => props.contract, (newVal) => {
    isEditMode.value = !!newVal;
    form.defaults(getInitialFormData(newVal));
    form.reset();
    existingAttachments.value = newVal?.attachments_frontend ?? [];
    form.clearErrors();
}, { immediate: true });

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('irrigation.schemes.irrigation-scheme-contracts.update', { scheme: props.schemeId, irrigation_scheme_contract: props.contract.id })
        : route('irrigation.schemes.irrigation-scheme-contracts.store', { scheme: props.schemeId });

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            emit('success', isEditMode.value ? 'Scheme Contract updated!' : 'Scheme Contract added!');
        },
        onError: (errors) => {
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <input type="hidden" v-model="form.irrigation_scheme_id" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Approved Vendor (Name) -->
            <InputGroup id="approved_vendor" label="Approved Vendor (Name)" :error="form.errors.approved_vendor">
                <TextInput
                    id="approved_vendor"
                    v-model="form.approved_vendor"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.approved_vendor }"
                />
            </InputGroup>
            <!-- Vendor ID (Searchable Select) -->
            <InputGroup id="vendor_id" label="Select Vendor" :error="form.errors.vendor_id">
                <SearchableVendorSelect
                    id="vendor_id"
                    v-model="form.vendor_id"
                    :initial-vendor="contract?.vendor"
                    :class="{ 'border-red-500': form.errors.vendor_id }"
                />
            </InputGroup>

            <!-- Date of Agreement Contract -->
            <InputGroup id="date_of_agreement_contract" label="Date of Agreement Contract" :required="true" :error="form.errors.date_of_agreement_contract">
                <DatePicker
                    id="date_of_agreement_contract"
                    v-model="form.date_of_agreement_contract"
                    :class="{ 'border-red-500': form.errors.date_of_agreement_contract }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Date of Physical Start -->
            <InputGroup id="date_of_physical_start" label="Date of Physical Start" :required="true" :error="form.errors.date_of_physical_start">
                <DatePicker
                    id="date_of_physical_start"
                    v-model="form.date_of_physical_start"
                    :class="{ 'border-red-500': form.errors.date_of_physical_start }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Agreement Cost -->
            <InputGroup id="agreement_cost" label="Agreement Cost (PKR)" :required="true" :error="form.errors.agreement_cost">
                <TextInput
                    id="agreement_cost"
                    v-model="form.agreement_cost"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.agreement_cost }"
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
                {{ isEditMode ? 'Update Contract' : 'Add Contract' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
