<script setup>
import { reactive, watch, ref, onMounted, nextTick } from 'vue'; // Import nextTick
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
        required: true,
    },
    exposureVisit: {
        type: Object,
        default: null,
    },
    mode: {
        type: String,
        default: 'create',
    },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref([]);

function getInitialFormData(visit) {
    return {
        cbo_id: props.cboId,
        date_of_visit: visit ? visit.date_of_visit : null,
        participants: visit ? visit.participants : null,
        purpose_of_visit: visit ? visit.purpose_of_visit : '',
        remarks: visit ? visit.remarks : '',
        attachments: [],
        attachments_to_delete: [],
    };
}

const form = useForm(getInitialFormData(props.exposureVisit));

// FIX: Wrap the watcher logic in nextTick
watch(() => props.exposureVisit, async (newVal) => { // Make watcher async
    console.log('--- CboExposureVisitForm: props.exposureVisit watcher triggered ---');
    console.log('Watcher received newVal (exposureVisit prop):', newVal);

    isEditMode.value = !!newVal;

    // Defer execution to ensure `form` is fully reactive/initialized
    await nextTick(); // <--- ADD THIS LINE

    // Set the new default values for the form based on the prop
    form.defaults(getInitialFormData(newVal));

    // Reset the form to apply the new defaults and clear any dirty state/errors
    form.reset();

    // Update existing attachments separately
    existingAttachments.value = newVal ? newVal.attachments_frontend : [];

    form.clearErrors(); // Clear any previous validation errors
    console.log('CboExposureVisitForm: Form and attachments initialized based on new prop.');
}, { immediate: true });

onMounted(() => {
    console.log('--- CboExposureVisitForm: Mounted ---');
    console.log('CboExposureVisitForm: Initial form.data() on mount:', form.data());
    console.log('CboExposureVisitForm: Initial existingAttachments on mount:', existingAttachments.value);
});

const handleAttachmentsToDelete = (id) => {
    console.log('--- CboExposureVisitForm: handleAttachmentsToDelete called ---');
    console.log('Deleting attachment ID:', id);
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    console.log('--- CboExposureVisitForm: handleSubmit triggered ---');
    console.log('Form data before POST:', form.data());
    console.log('Attachments array before POST:', form.attachments);

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
            console.log('--- CboExposureVisitForm: Submission Success ---');
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'Exposure Visit updated successfully!' : 'Exposure Visit added successfully!');
        },
        onError: (errors) => {
            console.error('--- CboExposureVisitForm: Submission Error ---');
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    console.log('--- CboExposureVisitForm: Cancel triggered ---');
    form.reset();
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};
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
