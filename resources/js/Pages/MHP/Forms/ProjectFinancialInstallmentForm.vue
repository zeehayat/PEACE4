<script setup>
import { watch, ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';

import InputGroup from '@/Components/FormComponents/InputGroup.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    mhpSiteId: {
        type: Number,
        required: true,
    },
    installment: {
        type: Object,
        default: null,
    },
    mode: {
        type: String,
        default: 'create',
    },
    progressType: {
        type: String,
        default: null,
    },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref(props.installment ? props.installment.attachments_frontend : []);
const tAndDWorksOptions = ref([]);
const fetchingTAndDWorks = ref(false);

const form = useForm({
    projectable_id: props.mhpSiteId,
    projectable_type: 'App\\Models\\MhpSite',
    installment_number: props.installment?.installment_number || '',
    installment_date: props.installment?.installment_date || null,
    installment_amount: props.installment?.installment_amount || '',
    cheque_no: props.installment?.cheque_no || '',
    category: props.installment?.category || '',
    remarks: props.installment?.remarks || '',
    payment_for: props.installment?.payment_for || props.progressType || 'Civil',
    activity_id: props.installment?.activity_type === 'App\\Models\\TAndDWork' ? props.installment.activity_id : null,
    activity_type: props.installment?.activity_type === 'App\\Models\\TAndDWork' ? 'App\\Models\\TAndDWork' : null,
    attachments: [],
    attachments_to_delete: [],
});

const paymentForOptions = ['Civil', 'EME', 'T&D'];
const categoryOptions = ['Initial', 'Mid-term', 'Final', 'Other'];

const fetchTAndDWorks = async () => {
    if (form.payment_for !== 'T&D' || !props.mhpSiteId) {
        tAndDWorksOptions.value = [];
        form.activity_id = null;
        form.activity_type = null;
        return;
    }
    fetchingTAndDWorks.value = true;
    try {
        const response = await axios.get(route('sites.t-and-d-works.index', { site: props.mhpSiteId, 'only-data': true }));
        tAndDWorksOptions.value = response.data.fullTAndDWorks.map(work => ({
            value: work.id,
            label: work.name || `T&D Work #${work.id}`,
        }));
    } catch (error) {
        console.error('API call failed to fetch T&D works:', error);
    } finally {
        fetchingTAndDWorks.value = false;
    }
};

watch(() => form.payment_for, fetchTAndDWorks, { immediate: true });

const handleFilePondUpdate = (files) => {
    form.attachments = files.map(fileItem => fileItem.file);
};

const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('mhp.sites.financial-installments.update', { site: props.mhpSiteId, financial_installment: props.installment.id })
        : route('mhp.sites.financial-installments.store', { site: props.mhpSiteId });

    form.transform((data) => {
        const transformedData = { ...data };
        if (isEditMode.value) {
            transformedData._method = 'put';
        }
        if (transformedData.payment_for !== 'T&D') {
            transformedData.activity_id = null;
            transformedData.activity_type = null;
        } else {
            transformedData.activity_type = 'App\\Models\\TAndDWork';
        }
        return transformedData;
    }).post(url, {
        onSuccess: () => {
            form.reset();
            emit('success', isEditMode.value ? 'Financial Installment updated successfully!' : 'Financial Installment recorded successfully!');
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
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <input type="hidden" v-model="form.projectable_id" />
        <input type="hidden" v-model="form.projectable_type" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup id="installment_number" label="Installment Number" :required="true" :error="form.errors.installment_number">
                <TextInput id="installment_number" v-model="form.installment_number" type="number" min="1" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.installment_number }" />
            </InputGroup>

            <InputGroup id="installment_date" label="Installment Date" :required="true" :error="form.errors.installment_date">
                <DatePicker id="installment_date" v-model="form.installment_date" :class="{ 'border-red-500': form.errors.installment_date }" placeholder="Select Date" />
            </InputGroup>

            <InputGroup id="installment_amount" label="Installment Amount" :required="true" :error="form.errors.installment_amount">
                <TextInput id="installment_amount" v-model="form.installment_amount" type="number" step="0.01" min="0" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.installment_amount }" />
            </InputGroup>

            <InputGroup id="cheque_no" label="Cheque Number" :error="form.errors.cheque_no">
                <TextInput id="cheque_no" v-model="form.cheque_no" type="text" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.cheque_no }" />
            </InputGroup>

            <InputGroup id="category" label="Category" :error="form.errors.category">
                <SelectInput id="category" v-model="form.category" :options="categoryOptions" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.category }" />
            </InputGroup>

            <InputGroup v-if="!progressType" id="payment_for" label="Activity Type (Payment For)" :required="true" :error="form.errors.payment_for">
                <SelectInput id="payment_for" v-model="form.payment_for" :options="paymentForOptions" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.payment_for }" />
            </InputGroup>
            <input v-else type="hidden" v-model="form.payment_for" />

            <InputGroup v-if="form.payment_for === 'T&D'" id="activity_id" label="Select T&D Work" :error="form.errors.activity_id">
                <SelectInput id="activity_id" v-model="form.activity_id" :options="tAndDWorksOptions" :disabled="fetchingTAndDWorks || tAndDWorksOptions.length === 0" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.activity_id }">
                    <option v-if="fetchingTAndDWorks" disabled>Loading T&D Works...</option>
                    <option v-if="!fetchingTAndDWorks && tAndDWorksOptions.length === 0" disabled>No T&D Works available for this site.</option>
                </SelectInput>
                <p v-if="!fetchingTAndDWorks && tAndDWorksOptions.length === 0" class="mt-1 text-sm text-ink-500">
                    No T&D Works found. Add one first.
                </p>
            </InputGroup>
            <input type="hidden" v-model="form.activity_type" />

            <InputGroup id="remarks" label="Remarks" class="md:col-span-2" :error="form.errors.remarks">
                <TextArea id="remarks" v-model="form.remarks" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.remarks }" />
            </InputGroup>
        </div>

        <InputGroup label="Attachments" class="mt-6" :error="form.errors.attachments">
            <AttachmentUploader :existing-attachments="existingAttachments" @update-files="handleFilePondUpdate" @delete-existing-attachments="handleAttachmentsToDelete" :error-message="form.errors.attachments" />
        </InputGroup>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button type="button" @click="handleCancel" class="inline-flex items-center px-4 py-2 bg-paper-200 border border-transparent rounded-md font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-300 focus:bg-paper-300 active:bg-paper-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition ease-in-out duration-150">
                Cancel
            </button>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ isEditMode ? 'Update Installment' : 'Record Installment' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
