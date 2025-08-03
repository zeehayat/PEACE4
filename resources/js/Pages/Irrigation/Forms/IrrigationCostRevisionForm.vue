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
    approvalId: { type: Number, required: true },
    revision: { type: Object, default: null },
    mode: { type: String, default: 'create' },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref([]);

const form = useForm({
    approvable_id: props.approvalId,
    approvable_type: 'irrigation_admin_approval',
    revision_number: props.revision?.revision_number ?? null,
    revised_cost: props.revision?.revised_cost ?? null,
    approved_on: props.revision?.approved_on ?? null,
    remarks: props.revision?.remarks ?? '',
    attachments: [],
    attachments_to_delete: [],
});

watch(() => props.revision, (newVal) => {
    isEditMode.value = !!newVal;
    form.defaults(newVal ? {
        approvable_id: props.approvalId,
        approvable_type: 'irrigation_admin_approval',
        revision_number: newVal.revision_number,
        revised_cost: newVal.revised_cost,
        approved_on: newVal.approved_on,
        remarks: newVal.remarks,
    } : {
        approvable_id: props.approvalId,
        approvable_type: 'irrigation_admin_approval',
        revision_number: null,
        revised_cost: null,
        approved_on: null,
        remarks: '',
    });
    form.reset();
    existingAttachments.value = newVal?.attachments_frontend ?? [];
    form.clearErrors();
}, { immediate: true });

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('irrigation.admin-approvals.cost-revisions.update', { admin_approval: props.approvalId, cost_revision: props.revision.id })
        : route('irrigation.admin-approvals.cost-revisions.store', { admin_approval: props.approvalId });

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            emit('success', isEditMode.value ? 'Cost Revision updated!' : 'Cost Revision added!');
        },
        onError: (errors) => {
            console.error('Form errors:', errors);
        },
    });
};

const handleCancel = () => {
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <input type="hidden" v-model="form.approvable_id" />
        <input type="hidden" v-model="form.approvable_type" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <InputLabel for="revision_number" value="Revision Number" />
                <TextInput
                    id="revision_number"
                    v-model="form.revision_number"
                    type="number"
                    min="1"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.revision_number }"
                />
                <InputError class="mt-2" :message="form.errors.revision_number" />
            </div>
            <div>
                <InputLabel for="revised_cost" value="Revised Cost" />
                <TextInput
                    id="revised_cost"
                    v-model="form.revised_cost"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.revised_cost }"
                />
                <InputError class="mt-2" :message="form.errors.revised_cost" />
            </div>
            <div>
                <InputLabel for="approved_on" value="Approved On" />
                <DatePicker
                    id="approved_on"
                    v-model="form.approved_on"
                    :class="{ 'border-red-500': form.errors.approved_on }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.approved_on" />
            </div>
        </div>

        <div class="mt-4">
            <InputLabel for="remarks" value="Remarks" />
            <WysiwygEditor
                id="remarks"
                v-model="form.remarks"
                :class="{ 'border-red-500': form.errors.remarks }"
                :height="150"
            />
            <InputError class="mt-2" :message="form.errors.remarks" />
        </div>

        <div class="mt-4">
            <InputLabel value="Attachments" />
            <AttachmentUploader
                v-model="form.attachments"
                :existing-attachments="existingAttachments"
                @remove-existing="handleAttachmentsToDelete"
                :error-message="form.errors.attachments"
            />
            <InputError class="mt-2" :message="form.errors.attachments" />
        </div>

        <div class="flex justify-end mt-4 space-x-2">
            <button type="button" @click="handleCancel" class="btn-secondary">Cancel</button>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ isEditMode ? 'Update Revision' : 'Add Revision' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
