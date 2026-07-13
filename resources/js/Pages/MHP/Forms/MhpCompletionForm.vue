<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputGroup from '@/Components/FormComponents/InputGroup.vue';
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
        console.log(form)
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
            <InputGroup id="scheme_inauguration_date" label="Scheme Inauguration Date" :error="form.errors.scheme_inauguration_date">
                <DatePicker
                    id="scheme_inauguration_date"
                    v-model="form.scheme_inauguration_date"
                    :class="{ 'border-red-500': form.errors.scheme_inauguration_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <InputGroup id="testing_commissioning_date" label="Testing & Commissioning Date" :error="form.errors.testing_commissioning_date">
                <DatePicker
                    id="testing_commissioning_date"
                    v-model="form.testing_commissioning_date"
                    :class="{ 'border-red-500': form.errors.testing_commissioning_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <InputGroup id="handover_date" label="Handover Date" :error="form.errors.handover_date">
                <DatePicker
                    id="handover_date"
                    v-model="form.handover_date"
                    :class="{ 'border-red-500': form.errors.handover_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <InputGroup id="remarks" label="Remarks" class="md:col-span-2" :error="form.errors.remarks">
                <TextArea
                    id="remarks"
                    v-model="form.remarks"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.remarks }"
                />
            </InputGroup>
        </div>

        <InputGroup label="Attachments" class="mt-6" :error="form.errors.attachments">
            <AttachmentUploader
                :existing-attachments="existingAttachments"
                @update-files="handleFilePondUpdate"
                @delete-existing-attachments="handleAttachmentsToDelete"
                :error-message="form.errors.attachments"
            />
        </InputGroup>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button
                type="button"
                @click="handleCancel"
                class="inline-flex items-center px-4 py-2 bg-paper-200 border border-transparent rounded-md font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-300 focus:bg-paper-300 active:bg-paper-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition ease-in-out duration-150"
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
