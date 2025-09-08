<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    schemeId: { type: Number, required: true },
    progress: { type: Object, default: null },
    mode: { type: String, default: 'create' },
    // Removed progressType prop as Irrigation schemes only have Civil progress
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref([]);

function getInitialFormData(progress) {
    return {
        projectable_id: props.schemeId,
        projectable_type: 'irrigation_scheme',
        progress_percentage: progress ? progress.progress_percentage : null,
        progress_date: progress ? progress.progress_date : null,
        remarks: progress ? progress.remarks : '',
        payment_for: 'Civil', // Always Civil for Irrigation Schemes
        attachments: [],
        attachments_to_delete: [],
    };
}

const form = useForm(getInitialFormData(props.progress));

watch(() => props.progress, (newVal) => {
    isEditMode.value = !!newVal;
    form.defaults(getInitialFormData(newVal));
    form.reset();
    existingAttachments.value = newVal?.attachments_frontend ?? [];
    form.clearErrors();
}, { immediate: true });

const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

const handleFileUpdate = (files) => {
    form.attachments = files.map(fileItem => fileItem.file);
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('irrigation.schemes.physical-progresses.update', { scheme: props.schemeId, physical_progress: props.progress.id })
        : route('irrigation.schemes.physical-progresses.store', { scheme: props.schemeId });

    form.transform((data) => {
        const transformedData = { ...data };
        if (isEditMode.value) {
            transformedData._method = 'put';
        }
        return transformedData;
    }).post(url, {
        onSuccess: () => {
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'Physical Progress updated!' : 'Physical Progress added!');
        },
        onError: (errors) => {
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        forceFormData: true, // Crucial for file uploads
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
        <input type="hidden" v-model="form.projectable_id" />
        <input type="hidden" v-model="form.projectable_type" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <InputLabel for="progress_date" value="Progress Date" />
                <DatePicker
                    id="progress_date"
                    v-model="form.progress_date"
                    :class="{ 'border-red-500': form.errors.progress_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.progress_date" />
            </div>

            <div>
                <InputLabel for="progress_percentage" value="Progress Percentage (%)" />
                <TextInput
                    id="progress_percentage"
                    v-model="form.progress_percentage"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.progress_percentage }"
                />
                <InputError class="mt-2" :message="form.errors.progress_percentage" />
            </div>

            <div>
                <InputLabel for="payment_for" value="Payment For" />
                <TextInput
                    disabled
                    id="payment_for"
                    v-model="form.payment_for"
                    type="text"
                    class="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                />
                <InputError class="mt-2" :message="form.errors.payment_for" />
            </div>

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

        <div class="mt-6">
            <InputLabel value="Attachments" />
            <AttachmentUploader
                @update-files="handleFileUpdate"
                :existing-attachments="existingAttachments"
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
                {{ isEditMode ? 'Update Progress' : 'Add Progress' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
