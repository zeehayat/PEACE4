<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    cboId: {
        type: Number,
        required: true, // The parent CBO ID
    },
    exposureVisit: {
        type: Object,
        default: null, // Existing exposure visit object for edit mode
    },
    mode: {
        type: String,
        default: 'create', // 'create' or 'update'
    },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref(props.exposureVisit ? props.exposureVisit.attachments_frontend : []);

const form = useForm({
    cbo_id: props.cboId,
    date_of_visit: props.exposureVisit ? props.exposureVisit.date_of_visit : null,
    participants: props.exposureVisit ? props.exposureVisit.participants : null,
    purpose_of_visit: props.exposureVisit ? props.exposureVisit.purpose_of_visit : '',
    remarks: props.exposureVisit ? props.exposureVisit.remarks : '',
    attachments: [],
    attachments_to_delete: [],
});

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('cbo.cbos.exposure-visits.update', { cbo: props.cboId, 'exposure_visit': props.exposureVisit.id })
        : route('cbo.cbos.exposure-visits.store', { cbo: props.cboId });

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
            emit('success', isEditMode.value ? 'Exposure Visit updated successfully!' : 'Exposure Visit added successfully!');
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

watch(() => props.exposureVisit, (newVal) => {
    if (newVal) {
        isEditMode.value = true;
        form.fill({
            cbo_id: props.cboId,
            date_of_visit: newVal.date_of_visit,
            participants: newVal.participants,
            purpose_of_visit: newVal.purpose_of_visit,
            remarks: newVal.remarks,
            attachments: [],
            attachments_to_delete: [],
        });
        existingAttachments.value = newVal.attachments_frontend;
        form.clearErrors();
    } else {
        isEditMode.value = false;
        form.reset();
        form.cbo_id = props.cboId;
        existingAttachments.value = [];
        form.attachments = [];
        form.attachments_to_delete = [];
        form.clearErrors();
    }
}, { immediate: true });

onMounted(() => {
    if (!isEditMode.value && props.exposureVisit === null) {
        form.reset();
        form.cbo_id = props.cboId;
        existingAttachments.value = [];
        form.attachments = [];
        form.attachments_to_delete = [];
    }
});
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <input type="hidden" v-model="form.cbo_id" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Date of Visit -->
            <div>
                <InputLabel for="date_of_visit" value="Date of Visit" />
                <DatePicker
                    id="date_of_visit"
                    v-model="form.date_of_visit"
                    :class="{ 'border-red-500': form.errors.date_of_visit }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.date_of_visit" />
            </div>

            <!-- Participants -->
            <div>
                <InputLabel for="participants" value="Participants" />
                <TextInput
                    id="participants"
                    v-model="form.participants"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.participants }"
                />
                <InputError class="mt-2" :message="form.errors.participants" />
            </div>

            <!-- Purpose of Visit -->
            <div class="md:col-span-2">
                <InputLabel for="purpose_of_visit" value="Purpose of Visit" />
                <TextInput
                    id="purpose_of_visit"
                    v-model="form.purpose_of_visit"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.purpose_of_visit }"
                />
                <InputError class="mt-2" :message="form.errors.purpose_of_visit" />
            </div>

            <!-- Remarks (WYSIWYG Editor) -->
            <div class="md:col-span-2">
                <InputLabel for="remarks" value="Remarks" />
                <WysiwygEditor
                    id="remarks"
                    v-model="form.remarks"
                    :class="{ 'border-red-500': form.errors.remarks }"
                    :height="200"
                />
                <InputError class="mt-2" :message="form.errors.remarks" />
            </div>
        </div>

        <!-- Attachments Section -->
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
                {{ isEditMode ? 'Update Visit' : 'Add Visit' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
