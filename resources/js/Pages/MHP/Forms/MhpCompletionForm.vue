<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextArea from '@/Components/TextArea.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    mhpSiteId: {
        type: Number,
        required: true, // The MHP Site this completion belongs to
    },
    completion: {
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
const existingAttachments = ref(props.completion ? props.completion.attachments_frontend : []);

// Helper function to initialize form data
function getInitialFormData(completionData) {
    return {
        mhp_site_id: props.mhpSiteId,
        scheme_inauguration_date: completionData ? completionData.scheme_inauguration_date : null,
        testing_commissioning_date: completionData ? completionData.testing_commissioning_date : null,
        handover_date: completionData ? completionData.handover_date : null,
        remarks: completionData ? completionData.remarks : '',
        attachments: [],
        attachments_to_delete: [],
    };
}

const form = useForm(getInitialFormData(props.completion));

// Handle attachment changes from AttachmentUploader
const handleFilePondUpdate = (files) => {
    form.attachments = files.map(fileItem => fileItem.file);
};

const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

const handleSubmit = () => {
    // correct route names + params
    const url = isEditMode.value
        ? route('mhp.sites.completion.update', {
            site: props.mhpSiteId,
            completion: props.completion.id,
        })
        : route('mhp.sites.completion.store', {
            site: props.mhpSiteId,
        });

    form.transform((data) => {
        if (isEditMode.value) data._method = 'put';
        return data;
    }).post(url, {
        onSuccess: () => {
            form.reset(); // Resets to defaults, clearing the form
            emit('success', isEditMode.value
                ? 'MHP Completion updated successfully!'
                : 'MHP Completion created successfully!'
            );
        },
        onError: (errors) => console.error('Form errors:', errors),
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    form.reset();
    emit('cancel');
};

// Watch for prop changes to re-initialize form when modal re-opens for a different item
watch(() => props.completion, (newVal) => {
    isEditMode.value = !!newVal;

    // Set new defaults and reset the form to apply them
    form.defaults(getInitialFormData(newVal));
    form.reset();

    // Update existing attachments and clear errors
    existingAttachments.value = newVal ? newVal.attachments_frontend : [];
    form.clearErrors();
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
                <InputLabel for="scheme_inauguration_date" value="Scheme Inauguration Date" />
                <DatePicker
                    id="scheme_inauguration_date"
                    v-model="form.scheme_inauguration_date"
                    :class="{ 'border-red-500': form.errors.scheme_inauguration_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.scheme_inauguration_date" />
            </div>

            <div>
                <InputLabel for="testing_commissioning_date" value="Testing & Commissioning Date" />
                <DatePicker
                    id="testing_commissioning_date"
                    v-model="form.testing_commissioning_date"
                    :class="{ 'border-red-500': form.errors.testing_commissioning_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.testing_commissioning_date" />
            </div>

            <div>
                <InputLabel for="handover_date" value="Handover Date" />
                <DatePicker
                    id="handover_date"
                    v-model="form.handover_date"
                    :class="{ 'border-red-500': form.errors.handover_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.handover_date" />
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
                {{ isEditMode ? 'Update Completion' : 'Add Completion' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
