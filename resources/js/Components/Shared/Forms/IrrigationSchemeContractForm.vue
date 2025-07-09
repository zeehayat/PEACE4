<script setup>
import { ref, watch } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import DatePicker from '@/Components/DatePicker.vue'; // Assuming DatePicker is used
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'; // Assuming AttachmentUploader is used
import SearchableVendorSelect from '@/Components/SearchableVendorSelect.vue'; // NEW: Import SearchableVendorSelect

const props = defineProps({
    irrigationSchemeId: { type: [String, Number], required: true },
    contract: { type: Object, default: null }, // Existing contract object if editing
    mode: { type: String, default: 'create' }, // 'create' or 'edit'
});

const emit = defineEmits(['saved', 'cancel']);

const newAttachments = ref([]);
const existingAttachments = ref([]);
const attachmentsToRemove = ref([]);

const form = useForm({
    _method: props.mode === 'edit' ? 'PUT' : 'POST',
    irrigation_scheme_id: props.irrigationSchemeId,
    vendor_id: '', // To be bound by SearchableVendorSelect
    date_civil_work_initiation: '',
    contract_amount: '',
});

// Watch for changes in the 'contract' prop to populate the form for editing
watch(
    () => props.contract,
    (newContract) => {
        if (newContract && props.mode === 'edit') {
            form.irrigation_scheme_id = newContract.irrigation_scheme_id;
            form.vendor_id = newContract.vendor_id;
            form.date_civil_work_initiation = newContract.date_civil_work_initiation;
            form.contract_amount = newContract.contract_amount;
            // Assuming attachments can be directly on contract, otherwise adjust
            existingAttachments.value = newContract.attachments || [];
        } else if (props.mode === 'create') {
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
        ? route('irrigation.irrigation-scheme-contracts.store')
        : route('irrigation.irrigation-scheme-contracts.update', props.contract.id);

    router.post(url, data, {
        forceFormData: true,
        onSuccess: () => {
            emit('saved', `Irrigation Scheme Contract ${props.mode === 'create' ? 'created' : 'updated'} successfully.`);
            emit('cancel'); // Close modal
        },
        onError: (errors) => {
            console.error('Validation Errors:', errors);
            // form.errors automatically populates
        },
    });
};
</script>

<template>
    <form @submit.prevent="submit" class="space-y-4 p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <div class="col-span-full">
                <label for="irrigation_scheme_id" class="block text-sm font-medium text-gray-700 mb-1">Irrigation Scheme ID</label>
                <input type="text" :value="irrigationSchemeId" id="irrigation_scheme_id" class="input-compact bg-gray-100" readonly />
            </div>

            <div>
                <label for="vendor_id" class="block text-sm font-medium text-gray-700 mb-1">Select Contractor (Vendor)</label>
                <SearchableVendorSelect v-model:selected-vendor-id="form.vendor_id" />
                <div v-if="form.errors.vendor_id" class="text-red-500 text-xs mt-1">{{ form.errors.vendor_id }}</div>
            </div>

            <div>
                <label for="date_civil_work_initiation" class="block text-sm font-medium text-gray-700 mb-1">Date of Civil Work Initiation</label>
                <DatePicker v-model="form.date_civil_work_initiation" id="date_civil_work_initiation" class="input-compact" />
                <div v-if="form.errors.date_civil_work_initiation" class="text-red-500 text-xs mt-1">{{ form.errors.date_civil_work_initiation }}</div>
            </div>

            <div>
                <label for="contract_amount" class="block text-sm font-medium text-gray-700 mb-1">Contract Amount</label>
                <input type="number" step="0.01" id="contract_amount" v-model="form.contract_amount" class="input-compact" />
                <div v-if="form.errors.contract_amount" class="text-red-500 text-xs mt-1">{{ form.errors.contract_amount }}</div>
            </div>
        </div>

        <div class="mt-6">
            <AttachmentUploader
                v-model="newAttachments"
                :existing="existingAttachments"
                @removeExisting="removeExisting"
                label="Contract Attachments"
            />
            <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">{{ form.errors['attachments.0'] }}</div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="emit('cancel')" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
            </button>
            <button type="submit" :disabled="form.processing" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ form.processing ? 'Saving...' : (mode === 'create' ? 'Create Contract' : 'Update Contract') }}
            </button>
        </div>
    </form>
</template>

<style scoped>
/* Input styling from other forms for consistency */
.input-compact {
    @apply appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
label {
    margin-bottom: 0.25rem;
}
</style>
