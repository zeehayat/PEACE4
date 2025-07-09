<script setup>
/**
 * Project/resources/js/Pages/Shared/Forms/IrrigationSchemeContractForm.vue
 *
 * This form is used for creating and editing Irrigation Scheme Contracts.
 * It's designed to be used within a modal.
 *
 * It takes 'irrigationSchemeId' to link the contract, and 'contract' object for edit mode.
 */

// ---------------------------------------------------------------------
// 1. Imports
// ---------------------------------------------------------------------
import { ref, watch } from 'vue'; // Vue reactivity fundamentals
import { useForm, router } from '@inertiajs/vue3'; // Inertia.js for form handling and routing
// TODO: Uncomment and add custom components incrementally in later steps
// import DatePicker from '@/Components/DatePicker.vue';
// import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
// import SearchableVendorSelect from '@/Components/SearchableVendorSelect.vue';

// ---------------------------------------------------------------------
// 2. Props and Emits
// ---------------------------------------------------------------------
const props = defineProps({
    // The ID of the Irrigation Scheme this contract belongs to (required for linking)
    irrigationSchemeId: { type: [String, Number], required: true },
    // 'contract' object contains existing data if we are in 'edit' mode. Null otherwise.
    contract: { type: Object, default: null },
    // 'mode' indicates whether the form is for 'create' (new contract) or 'edit' (existing contract).
    mode: { type: String, default: 'create' }, // 'create' or 'edit'
});

// Define custom events this component can emit to its parent
const emit = defineEmits(['saved', 'cancel']);

// ---------------------------------------------------------------------
// 3. Form State Management
// ---------------------------------------------------------------------

/**
 * `useForm` from Inertia.js manages the form's state, input values,
 * processing state, and automatic error handling.
 */
const form = useForm({
    // Laravel method spoofing for PUT/PATCH requests (required for Inertia)
    _method: props.mode === 'edit' ? 'PUT' : 'POST',
    // Link to the parent Irrigation Scheme
    irrigation_scheme_id: props.irrigationSchemeId,
    // --- Minimal fields for initial debugging ---
    // This field will be bound to a standard HTML input for the first test
    vendor_id: '',
    // This field will be bound to a standard HTML input for the first test
    date_civil_work_initiation: '',
    // Basic number input for initial test
    contract_amount: '',
    // --- Attachments (will be added in a later step) ---
    // attachments: [],
    // removed_attachments: [],
});

// ---------------------------------------------------------------------
// 4. Watchers
// ---------------------------------------------------------------------

/**
 * Watcher for the 'contract' prop.
 * This ensures the form is populated correctly when:
 * 1. The component mounts in 'edit' mode with existing contract data.
 * 2. The 'contract' prop changes (e.g., if the parent switches context).
 */
watch(
    () => props.contract, // Watch the 'contract' prop for changes
    (newContract) => {
        // If an existing contract object is provided and we are in 'edit' mode
        if (newContract && props.mode === 'edit') {
            // Populate form fields with data from the existing contract
            form.irrigation_scheme_id = newContract.irrigation_scheme_id;
            form.vendor_id = newContract.vendor_id;
            form.date_civil_work_initiation = newContract.date_civil_work_initiation;
            form.contract_amount = newContract.contract_amount;
            // TODO: Populate attachments if they are part of the contract model
            // existingAttachments.value = newContract.attachments || [];
        }
        // If no contract is provided (e.g., 'create' mode)
        else if (props.mode === 'create') {
            // Reset the form to its initial default state
            form.reset();
            // Ensure irrigation_scheme_id is correctly set for a new contract (it comes from props)
            form.irrigation_scheme_id = props.irrigationSchemeId;
            // TODO: Clear attachment refs if they were active
            // existingAttachments.value = [];
        }
        // TODO: Clear attachment-related refs
        // newAttachments.value = [];
        // attachmentsToRemove.value = [];
    },
    // immediate: true: This watcher runs immediately when the component is mounted.
    // deep: true: This watches for changes within the 'contract' object itself.
    { immediate: true, deep: true }
);

// ---------------------------------------------------------------------
// 5. Form Submission Logic
// ---------------------------------------------------------------------

/**
 * `submit` function is called when the form is submitted.
 * It handles sending the form data to the Laravel backend.
 */
const submit = () => {
    // Determine the correct API endpoint URL based on whether we are creating or updating
    const url = props.mode === 'create'
        ? route('irrigation.irrigation-scheme-contracts.store') // Laravel route for storing a new contract
        : route('irrigation.irrigation-scheme-contracts.update', props.contract.id); // Laravel route for updating an existing contract

    // Use Inertia's router.post for submission.
    // `router.post` automatically handles setting up FormData for file uploads.
    router.post(url, form, {
        // `onSuccess` callback runs after a successful response from the server
        onSuccess: () => {
            // Emit a 'saved' event to the parent component, indicating success
            emit('saved', `Irrigation Scheme Contract ${props.mode === 'create' ? 'created' : 'updated'} successfully.`);
            // Emit a 'cancel' event to signal the parent to close the modal
            emit('cancel');
            // Reset the form to clear inputs after successful submission
            form.reset();
        },
        // `onError` callback runs if there are validation errors or other server errors
        onError: (errors) => {
            // Log the errors to the console for debugging
            console.error('Validation Errors:', errors);
            // `useForm` automatically populates `form.errors`, which can be displayed in the template next to inputs
        },
    });
};
</script>

<template>
    <form @submit.prevent="submit" class="space-y-4 p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <div class="col-span-full">
                <label for="irrigation_scheme_id" class="block text-sm font-medium text-gray-700 mb-1">Irrigation Scheme ID</label>
                <input
                    type="text"
                    :value="irrigationSchemeId"
                    id="irrigation_scheme_id"
                    class="input-compact bg-gray-100"
                    readonly
                />
            </div>

            <div>
                <label for="vendor_id" class="block text-sm font-medium text-gray-700 mb-1">Contractor (Vendor ID for Test)</label>
                <input
                    type="number"
                    id="vendor_id"
                    v-model="form.vendor_id"
                    class="input-compact"
                    placeholder="Enter Vendor ID (e.g., 1)"
                />
                <div v-if="form.errors.vendor_id" class="text-red-500 text-xs mt-1">{{ form.errors.vendor_id }}</div>
            </div>

            <div>
                <label for="date_civil_work_initiation" class="block text-sm font-medium text-gray-700 mb-1">Date of Civil Work Initiation (YYYY-MM-DD)</label>
                <input
                    type="date"
                    id="date_civil_work_initiation"
                    v-model="form.date_civil_work_initiation"
                    class="input-compact"
                />
                <div v-if="form.errors.date_civil_work_initiation" class="text-red-500 text-xs mt-1">{{ form.errors.date_civil_work_initiation }}</div>
            </div>

            <div>
                <label for="contract_amount" class="block text-sm font-medium text-gray-700 mb-1">Contract Amount</label>
                <input
                    type="number"
                    step="0.01"
                    id="contract_amount"
                    v-model="form.contract_amount"
                    class="input-compact"
                />
                <div v-if="form.errors.contract_amount" class="text-red-500 text-xs mt-1">{{ form.errors.contract_amount }}</div>
            </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
            <button
                type="button"
                @click="emit('cancel')"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Cancel
            </button>
            <button
                type="submit"
                :disabled="form.processing"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {{ form.processing ? 'Saving...' : (props.mode === 'create' ? 'Create Contract' : 'Update Contract') }}
            </button>
        </div>
    </form>
</template>

<style scoped>
/* INPUT STYLING: Consistent style for form inputs */
.input-compact {
    @apply appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
/* LABEL STYLING: Reduce margin for compactness */
label {
    margin-bottom: 0.25rem;
}
</style>
