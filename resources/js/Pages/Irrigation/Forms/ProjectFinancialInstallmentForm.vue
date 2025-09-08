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
    installment: { type: Object, default: null },
    mode: { type: String, default: 'create' },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref([]);

// For irrigation schemes, payment is always Civil.
const paymentForOptions = ['Civil'];

function getInitialFormData(installment) {
    return {
        projectable_id: props.schemeId,
        projectable_type: 'irrigation_scheme',
        installment_number: installment ? installment.installment_number : null,
        installment_date: installment ? installment.installment_date : null,
        installment_amount: installment ? installment.installment_amount : null,
        category: installment ? installment.category : '',
        remarks: installment ? installment.remarks : '',
        payment_for: 'Civil', // Force value to 'Civil'
        attachments: [],
        attachments_to_delete: [],
    };
}

const form = useForm(getInitialFormData(props.installment));

watch(() => props.installment, (newVal) => {
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
        ? route('irrigation.schemes.financial-installments.update', { scheme: props.schemeId, financial_installment: props.installment.id })
        : route('irrigation.schemes.financial-installments.store', { scheme: props.schemeId });

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
            emit('success', isEditMode.value ? 'Financial Installment updated!' : 'Financial Installment added!');
        },
        onError: (errors) => {
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        forceFormData: true,
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
                <InputLabel for="installment_number" value="Installment Number" />
                <TextInput
                    id="installment_number"
                    v-model="form.installment_number"
                    type="number"
                    min="1"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.installment_number }"
                />
                <InputError class="mt-2" :message="form.errors.installment_number" />
            </div>

            <div>
                <InputLabel for="installment_date" value="Installment Date" />
                <DatePicker
                    id="installment_date"
                    v-model="form.installment_date"
                    :class="{ 'border-red-500': form.errors.installment_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.installment_date" />
            </div>

            <div>
                <InputLabel for="installment_amount" value="Installment Amount (PKR)" />
                <TextInput
                    id="installment_amount"
                    v-model="form.installment_amount"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.installment_amount }"
                />
                <InputError class="mt-2" :message="form.errors.installment_amount" />
            </div>

            <div>
                <InputLabel for="payment_for" value="Payment For" />
                <SelectInput
                    disabled
                    id="payment_for"
                    v-model="form.payment_for"
                    :options="paymentForOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.payment_for }"
                />
                <InputError class="mt-2" :message="form.errors.payment_for" />
            </div>

            <div>
                <InputLabel for="category" value="Category (Optional)" />
                <TextInput
                    id="category"
                    v-model="form.category"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.category }"
                />
                <InputError class="mt-2" :message="form.errors.category" />
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
                {{ isEditMode ? 'Update Installment' : 'Add Installment' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
