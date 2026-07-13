<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputGroup from '@/Components/FormComponents/InputGroup.vue';
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
    dialogue: {
        type: Object,
        default: null, // Existing dialogue object for edit mode
    },
    mode: {
        type: String,
        default: 'create', // 'create' or 'update'
    },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref(props.dialogue ? props.dialogue.attachments_frontend : []);

const form = useForm({
    cbo_id: props.cboId,
    date_of_dialogue: props.dialogue ? props.dialogue.date_of_dialogue : null,
    participants: props.dialogue ? props.dialogue.participants : null,
    remarks: props.dialogue ? props.dialogue.remarks : '',
    attachments: [],
    attachments_to_delete: [],
});

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('cbo.cbos.dialogues.update', { cbo: props.cboId, dialogue: props.dialogue.id })
        : route('cbo.cbos.dialogues.store', { cbo: props.cboId });

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
            emit('success', isEditMode.value ? 'Dialogue updated successfully!' : 'Dialogue added successfully!');
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

watch(() => props.dialogue, (newVal) => {
    if (newVal) {
        isEditMode.value = true;
        form.fill({
            cbo_id: props.cboId,
            date_of_dialogue: newVal.date_of_dialogue,
            participants: newVal.participants,
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
    if (!isEditMode.value && props.dialogue === null) {
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
            <!-- Date of Dialogue -->
            <InputGroup id="date_of_dialogue" label="Date of Dialogue" :required="true" :error="form.errors.date_of_dialogue">
                <DatePicker
                    id="date_of_dialogue"
                    v-model="form.date_of_dialogue"
                    :class="{ 'border-red-500': form.errors.date_of_dialogue }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <!-- Participants -->
            <InputGroup id="participants" label="Participants" :required="true" :error="form.errors.participants">
                <TextInput
                    id="participants"
                    v-model="form.participants"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.participants }"
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

        <!-- Attachments Section -->
        <InputGroup label="Attachments" class="mt-6" :error="form.errors.attachments">
            <AttachmentUploader
                v-model="form.attachments"
                :existing-attachments="existingAttachments"
                @remove-existing="handleAttachmentsToDelete"
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
                {{ isEditMode ? 'Update Dialogue' : 'Add Dialogue' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
