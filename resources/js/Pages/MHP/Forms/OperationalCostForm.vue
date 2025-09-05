<script setup>
import { watch, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    // The ID of the MHP site to which this cost belongs
    siteId: {
        type: Number,
        required: true,
    },
    // The cost object to be edited (null for creation)
    cost: {
        type: Object,
        default: null,
    },
    // The mode of the form: 'create' or 'update'
    mode: {
        type: String,
        default: 'create',
    },
    // The list of available expense types for the dropdown
    expenseTypes: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['success', 'cancel']);

// Determines if the form is in edit mode based on the 'mode' prop
const isEditMode = ref(props.mode === 'update');

// Stores existing attachments for the attachment uploader in edit mode
const existingAttachments = ref(props.cost && props.cost.media ? props.cost.media.map(media => ({
    id: media.id,
    name: media.name,
    file_name: media.url,
    url: media.url,
    size: media.size,
    mime_type: media.mime_type,
})) : []);

// Initializes the form using Inertia's `useForm` helper
const form = useForm({
    mhp_site_id: props.siteId,
    cost_date: props.cost?.cost_date || null,
    expense_type_id: props.cost?.expense_type_id || '',
    amount: props.cost?.amount || '',
    remarks: props.cost?.remarks || '',
    attachments: [], // Array for new files to be uploaded
    attachments_to_delete: [], // Array for existing files to be deleted
});

/**
 * Handles the `update-files` event from the AttachmentUploader.
 * Stores the newly selected files in the form data.
 * @param files The array of file objects from the uploader.
 */
const handleFilePondUpdate = (files) => {
    form.attachments = files.map(fileItem => fileItem.file);
};

/**
 * Handles the `delete-existing-attachments` event.
 * Stores the IDs of attachments to be deleted.
 * @param ids The array of IDs for attachments to delete.
 */
const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

/**
 * Submits the form data to the backend API.
 * Uses the appropriate route for creation or update.
 */
const handleSubmit = () => {
    const url = isEditMode.value
        ? route('mhp.operational-costs.update', props.cost.id)
        : route('mhp.operational-costs.store');

    form.transform((data) => ({
        ...data,
        // Add a PUT method for updates
        ...(isEditMode.value ? { _method: 'put' } : {}),
    })).post(url, {
        onSuccess: () => {
            const message = isEditMode.value ? 'Operational Cost updated successfully!' : 'Operational Cost recorded successfully!';
            form.reset();
            emit('success', message);
        },
        onError: (errors) => {
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        forceFormData: true, // Forces multipart/form-data for file uploads
    });
};

/**
 * Resets the form and emits the `cancel` event.
 */
const handleCancel = () => {
    form.reset();
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-4 space-y-6 bg-gray-50 rounded-lg shadow-inner">
        <input type="hidden" v-model="form.mhp_site_id" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <InputLabel for="cost_date" value="Cost Date" />
                <DatePicker id="cost_date" v-model="form.cost_date" :class="{ 'border-red-500': form.errors.cost_date }" placeholder="Select Date" />
                <InputError class="mt-2" :message="form.errors.cost_date" />
            </div>

            <div>
                <InputLabel for="expense_type_id" value="Expense Type" />
                <SelectInput id="expense_type_id" v-model="form.expense_type_id" :options="expenseTypes" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.expense_type_id }" />
                <InputError class="mt-2" :message="form.errors.expense_type_id" />
            </div>

            <div class="md:col-span-2">
                <InputLabel for="amount" value="Amount" />
                <TextInput id="amount" v-model="form.amount" type="number" step="0.01" min="0" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.amount }" />
                <InputError class="mt-2" :message="form.errors.amount" />
            </div>

            <div class="md:col-span-2">
                <InputLabel for="remarks" value="Remarks" />
                <TextArea id="remarks" v-model="form.remarks" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.remarks }" />
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
            <InputError class="mt-2" :message="form.errors['attachments.0']" />
        </div>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button type="button" @click="handleCancel" class="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                Cancel
            </button>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ isEditMode ? 'Update Cost' : 'Record Cost' }}
            </PrimaryButton>
        </div>
    </form>
</template>
