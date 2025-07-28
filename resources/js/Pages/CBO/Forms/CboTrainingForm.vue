<script setup>
import { reactive, watch, ref, onMounted, nextTick } from 'vue'; // Import nextTick
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
    cboId: {
        type: Number,
        required: true, // The parent CBO ID
    },
    training: {
        type: Object,
        default: null, // Existing training object for edit mode
    },
    mode: {
        type: String,
        default: 'create', // 'create' or 'update'
    },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref([]); // Initialized as empty array, filled by watcher

// Options for select inputs
const trainingTypeOptions = ['O&M Training', 'Electrical Appliance'];
const trainingGenderOptions = ['Male', 'Female', 'Mixed'];

// Function to get the initial data for the form based on a training object or null
function getInitialFormData(training) {
    return {
        cbo_id: props.cboId,
        date_of_training: training ? training.date_of_training : null,
        training_type: training ? training.training_type : 'O&M Training',
        training_gender: training ? training.training_gender : 'Mixed',
        total_participants: training ? training.total_participants : null,
        remarks: training ? training.remarks : '',
        attachments: [],
        attachments_to_delete: [],
    };
}

// Initialize form using a function to ensure it's always a useForm instance
const form = useForm(getInitialFormData(props.training));

// Watch for prop.training changes to update the form
watch(() => props.training, async (newVal) => { // Make watcher async
    console.log('--- CboTrainingForm: props.training watcher triggered ---');
    console.log('Watcher received newVal (training prop):', newVal);

    isEditMode.value = !!newVal;

    // Defer execution to ensure `form` is fully reactive/initialized
    await nextTick(); // <--- ADD THIS LINE

    // Set the new default values for the form based on the prop
    form.defaults(getInitialFormData(newVal));

    // Reset the form to apply the new defaults and clear any dirty state/errors
    form.reset();

    // Update existing attachments separately
    existingAttachments.value = newVal ? newVal.attachments_frontend : [];

    form.clearErrors();
    console.log('CboTrainingForm: Form and attachments initialized based on new prop.');
}, { immediate: true });

onMounted(() => {
    console.log('--- CboTrainingForm: Mounted ---');
    console.log('CboTrainingForm: Initial form.data() on mount:', form.data());
    console.log('CboTrainingForm: Initial existingAttachments on mount:', existingAttachments.value);
});

const handleAttachmentsToDelete = (id) => {
    console.log('--- CboTrainingForm: handleAttachmentsToDelete called ---');
    console.log('Deleting attachment ID:', id);
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    console.log('--- CboTrainingForm: handleSubmit triggered ---');
    console.log('Form data before POST:', form.data());
    console.log('Attachments array before POST:', form.attachments);

    const url = isEditMode.value
        ? route('cbo.cbos.trainings.update', { cbo: props.cboId, training: props.training.id })
        : route('cbo.cbos.trainings.store', { cbo: props.cboId });

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            console.log('--- CboTrainingForm: Submission Success ---');
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'Training updated successfully!' : 'Training added successfully!');
        },
        onError: (errors) => {
            console.error('--- CboTrainingForm: Submission Error ---');
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    console.log('--- CboTrainingForm: Cancel triggered ---');
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
            <!-- Date of Training -->
            <div>
                <InputLabel for="date_of_training" value="Date of Training" />
                <DatePicker
                    id="date_of_training"
                    v-model="form.date_of_training"
                    :class="{ 'border-red-500': form.errors.date_of_training }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.date_of_training" />
            </div>

            <!-- Training Type -->
            <div>
                <InputLabel for="training_type" value="Training Type" />
                <SelectInput
                    id="training_type"
                    v-model="form.training_type"
                    :options="trainingTypeOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.training_type }"
                />
                <InputError class="mt-2" :message="form.errors.training_type" />
            </div>

            <!-- Training Gender -->
            <div>
                <InputLabel for="training_gender" value="Training Gender" />
                <SelectInput
                    id="training_gender"
                    v-model="form.training_gender"
                    :options="trainingGenderOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.training_gender }"
                />
                <InputError class="mt-2" :message="form.errors.training_gender" />
            </div>

            <!-- Total Participants -->
            <div>
                <InputLabel for="total_participants" value="Total Participants" />
                <TextInput
                    id="total_participants"
                    v-model="form.total_participants"
                    type="number"
                    min="1"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.total_participants }"
                />
                <InputError class="mt-2" :message="form.errors.total_participants" />
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
                {{ isEditMode ? 'Update Training' : 'Add Training' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
