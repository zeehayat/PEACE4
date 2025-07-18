<script setup>
import { reactive, watch, ref, onMounted, computed } from 'vue';
import { useForm, router } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    mhpSiteId: {
        type: Number,
        required: true, // The MHP Site this financial installment belongs to
    },
    installment: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
    mode: {
        type: String,
        default: 'create', // 'create' or 'update'
    },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref(props.installment ? props.installment.attachments_frontend : []);
const tAndDWorksOptions = ref([]); // To store T&D works for selection
const fetchingTAndDWorks = ref(false);

const form = useForm({
    projectable_id: props.mhpSiteId,
    projectable_type: 'App\\Models\\MhpSite', // Hardcode for MHP for now
    installment_number: props.installment ? props.installment.installment_number : '',
    installment_date: props.installment ? props.installment.installment_date : null,
    installment_amount: props.installment ? props.installment.installment_amount : '',
    category: props.installment ? props.installment.category : '', // General financial category
    remarks: props.installment ? props.installment.remarks : '',
    payment_for: props.installment ? props.installment.payment_for : 'Civil', // Default to Civil
    activity_id: props.installment && props.installment.activity_type === 'App\\Models\\TAndDWork' ? props.installment.activity_id : null,
    activity_type: props.installment && props.installment.activity_type === 'App\\Models\\TAndDWork' ? 'App\\Models\\TAndDWork' : null,
    attachments: [],
    attachments_to_delete: [],
});

const paymentForOptions = ['Civil', 'EME', 'T&D'];
const categoryOptions = ['Initial', 'Mid-term', 'Final', 'Other']; // Example categories, adjust as needed

// Fetch T&D Works when payment_for is 'T&D' and component is mounted/site ID changes
const fetchTAndDWorks = async () => {
    if (form.payment_for === 'T&D' && props.mhpSiteId) {
        fetchingTAndDWorks.value = true;
        try {
            const response = await router.get(
                route('mhp.sites.t-and-d-works.index', { site: props.mhpSiteId, 'only-data': true }), // API endpoint
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    onSuccess: (page) => {
                        tAndDWorksOptions.value = page.props.tAndDWorks.data.map(work => ({
                            value: work.id,
                            label: work.name || `T&D Work #${work.id}`,
                        }));
                    },
                    onError: (errors) => {
                        console.error('Error fetching T&D works:', errors);
                    }
                }
            );
        } catch (error) {
            console.error('API call failed to fetch T&D works:', error);
        } finally {
            fetchingTAndDWorks.value = false;
        }
    } else {
        tAndDWorksOptions.value = [];
        form.activity_id = null;
        form.activity_type = null;
    }
};

// Watch for payment_for changes
watch(() => form.payment_for, (newVal) => {
    if (newVal === 'T&D') {
        fetchTAndDWorks();
    } else {
        form.activity_id = null;
        form.activity_type = null;
    }
}, { immediate: true });

// Watch for prop changes to re-initialize form
watch(() => props.installment, (newVal) => {
    if (newVal) {
        isEditMode.value = true;
        form.reset();
        form.fill({
            projectable_id: props.mhpSiteId,
            projectable_type: 'App\\Models\\MhpSite',
            installment_number: newVal.installment_number,
            installment_date: newVal.installment_date,
            installment_amount: newVal.installment_amount,
            category: newVal.category,
            remarks: newVal.remarks,
            payment_for: newVal.payment_for,
            activity_id: newVal.activity_type === 'App\\Models\\TAndDWork' ? newVal.activity_id : null,
            activity_type: newVal.activity_type === 'App\\Models\\TAndDWork' ? 'App\\Models\\TAndDWork' : null,
            attachments: [],
            attachments_to_delete: [],
        });
        existingAttachments.value = newVal.attachments_frontend;
    } else {
        isEditMode.value = false;
        form.reset();
        form.projectable_id = props.mhpSiteId;
        form.projectable_type = 'App\\Models\\MhpSite';
        form.payment_for = 'Civil'; // Default for new entry
        form.activity_id = null;
        form.activity_type = null;
        existingAttachments.value = [];
    }
}, { immediate: true });

onMounted(() => {
    if (form.payment_for === 'T&D' && !props.installment && props.mhpSiteId) {
        fetchTAndDWorks();
    }
});

const handleFilePondUpdate = (files) => {
    form.attachments = files.map(fileItem => fileItem.file);
};

const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('mhp.sites.financial-installments.update', { site: props.mhpSiteId, 'financial_installment': props.installment.id })
        : route('mhp.sites.financial-installments.store', { site: props.mhpSiteId });

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        if (data.payment_for === 'T&D') {
            data.activity_type = 'App\\Models\\TAndDWork';
        } else {
            data.activity_id = null;
            data.activity_type = null;
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            form.reset();
            emit('success', isEditMode.value ? 'Financial Installment updated successfully!' : 'Financial Installment recorded successfully!');
            form.attachments = [];
            form.attachments_to_delete = [];
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
                <InputLabel for="installment_amount" value="Installment Amount" />
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
                <InputLabel for="category" value="Category" />
                <SelectInput
                    id="category"
                    v-model="form.category"
                    :options="categoryOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.category }"
                />
                <InputError class="mt-2" :message="form.errors.category" />
            </div>

            <div>
                <InputLabel for="payment_for" value="Activity Type (Payment For)" />
                <SelectInput
                    id="payment_for"
                    v-model="form.payment_for"
                    :options="paymentForOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.payment_for }"
                />
                <InputError class="mt-2" :message="form.errors.payment_for" />
            </div>

            <div v-if="form.payment_for === 'T&D'">
                <InputLabel for="activity_id" value="Select T&D Work" />
                <SelectInput
                    id="activity_id"
                    v-model="form.activity_id"
                    :options="tAndDWorksOptions"
                    :disabled="fetchingTAndDWorks || tAndDWorksOptions.length === 0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.activity_id }"
                >
                    <option v-if="fetchingTAndDWorks">Loading T&D Works...</option>
                    <option v-if="!fetchingTAndDWorks && tAndDWorksOptions.length === 0">No T&D Works available for this site.</option>
                </SelectInput>
                <InputError class="mt-2" :message="form.errors.activity_id" />
                <p v-if="!fetchingTAndDWorks && tAndDWorksOptions.length === 0" class="mt-1 text-sm text-gray-500">
                    No T&D Works found for this site. You might need to add one first.
                </p>
            </div>
            <input type="hidden" v-model="form.activity_type" />

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
                {{ isEditMode ? 'Update Installment' : 'Record Installment' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
