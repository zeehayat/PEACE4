<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import DangerButton from '@/Components/DangerButton.vue';

const props = defineProps({
    mhpSiteId: {
        type: Number,
        required: true, // The MHP Site this T&D work belongs to
    },
    tAndDWork: {
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
const existingAttachments = ref(props.tAndDWork ? props.tAndDWork.attachments_frontend : []);

// Initialize form with default values or existing data for edit mode
const form = useForm({
    projectable_id: props.mhpSiteId,
    projectable_type: 'App\\Models\\MhpSite', // Hardcode for MHP for now
    name: props.tAndDWork ? props.tAndDWork.name : '',
    date_of_initiation: props.tAndDWork ? props.tAndDWork.date_of_initiation : null,
    step_up_transformers: props.tAndDWork && props.tAndDWork.step_up_transformers ? props.tAndDWork.step_up_transformers : [{ kva: null, qty: null }],
    step_down_transformers: props.tAndDWork && props.tAndDWork.step_down_transformers ? props.tAndDWork.step_down_transformers : [{ kva: null, qty: null }],
    ht_poles_quantity: props.tAndDWork ? props.tAndDWork.ht_poles_quantity : '',
    lt_poles_quantity: props.tAndDWork ? props.tAndDWork.lt_poles_quantity : '',
    ht_conductor_length_km: props.tAndDWork ? props.tAndDWork.ht_conductor_length_km : '',
    ht_conductor_type: props.tAndDWork ? props.tAndDWork.ht_conductor_type : '',
    lt_conductor_length_km: props.tAndDWork ? props.tAndDWork.lt_conductor_length_km : '',
    lt_conductor_type: props.tAndDWork ? props.tAndDWork.lt_conductor_type : '',
    scope_of_work: props.tAndDWork ? props.tAndDWork.scope_of_work : '',
    remarks: props.tAndDWork ? props.tAndDWork.remarks : '',
    attachments: [],
    attachments_to_delete: [],
});

// Methods for managing dynamic transformer fields
const addTransformer = (type) => {
    if (type === 'step_up') {
        form.step_up_transformers.push({ kva: null, qty: null });
    } else {
        form.step_down_transformers.push({ kva: null, qty: null });
    }
};

const removeTransformer = (type, index) => {
    if (type === 'step_up') {
        form.step_up_transformers.splice(index, 1);
        if (form.step_up_transformers.length === 0) form.step_up_transformers.push({ kva: null, qty: null });
    } else {
        form.step_down_transformers.splice(index, 1);
        if (form.step_down_transformers.length === 0) form.step_down_transformers.push({ kva: null, qty: null });
    }
};


// Handle attachment changes from AttachmentUploader
const handleFilePondUpdate = (files) => {
    form.attachments = files.map(fileItem => fileItem.file);
};

const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('mhp.t-and-d-works.update', { site: props.mhpSiteId, 't_and_d_work': props.tAndDWork.id })
        : route('mhp.t-and-d-works.store', { site: props.mhpSiteId }); // Pass mhpSiteId for store route

    const method = isEditMode.value ? 'post' : 'post'; // Laravel PUT/PATCH via POST with _method spoofing

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put'; // or 'patch'
        }
        // Filter out empty kva/qty entries if not strictly required
        data.step_up_transformers = data.step_up_transformers.filter(t => t.kva !== null && t.qty !== null);
        data.step_down_transformers = data.step_down_transformers.filter(t => t.kva !== null && t.qty !== null);

        return data;
    }).post(url, {
        onSuccess: () => {
            form.reset();
            emit('success', isEditMode.value ? 'T&D Work updated successfully!' : 'T&D Work created successfully!');
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

// Watch for prop changes to re-initialize form when modal re-opens for a different item
watch(() => props.tAndDWork, (newVal) => {
    if (newVal) {
        isEditMode.value = true;
        form.reset(); // Reset to clear old state and errors
        form.fill({
            projectable_id: props.mhpSiteId,
            projectable_type: 'App\\Models\\MhpSite',
            name: newVal.name,
            date_of_initiation: newVal.date_of_initiation,
            step_up_transformers: newVal.step_up_transformers && newVal.step_up_transformers.length > 0 ? newVal.step_up_transformers : [{ kva: null, qty: null }],
            step_down_transformers: newVal.step_down_transformers && newVal.step_down_transformers.length > 0 ? newVal.step_down_transformers : [{ kva: null, qty: null }],
            ht_poles_quantity: newVal.ht_poles_quantity,
            lt_poles_quantity: newVal.lt_poles_quantity,
            ht_conductor_length_km: newVal.ht_conductor_length_km,
            ht_conductor_type: newVal.ht_conductor_type,
            lt_conductor_length_km: newVal.lt_conductor_length_km,
            lt_conductor_type: newVal.lt_conductor_type,
            scope_of_work: newVal.scope_of_work,
            remarks: newVal.remarks,
            attachments: [],
            attachments_to_delete: [],
        });
        existingAttachments.value = newVal.attachments_frontend;
    } else {
        isEditMode.value = false;
        form.reset();
        form.projectable_id = props.mhpSiteId;
        form.projectable_type = 'App\\Models\\MhpSite';
        form.step_up_transformers = [{ kva: null, qty: null }]; // Ensure at least one field for new
        form.step_down_transformers = [{ kva: null, qty: null }];
        existingAttachments.value = [];
    }
}, { immediate: true });

onMounted(() => {
    if (!isEditMode.value) {
        form.projectable_id = props.mhpSiteId;
        form.projectable_type = 'App\\Models\\MhpSite';
    }
});
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <input type="hidden" v-model="form.projectable_id" />
        <input type="hidden" v-model="form.projectable_type" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <InputLabel for="name" value="Work Name / Title" />
                <TextInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.name }"
                />
                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <div>
                <InputLabel for="date_of_initiation" value="Date of Initiation" />
                <DatePicker
                    id="date_of_initiation"
                    v-model="form.date_of_initiation"
                    :class="{ 'border-red-500': form.errors.date_of_initiation }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.date_of_initiation" />
            </div>

            <div>
                <InputLabel for="ht_poles_quantity" value="HT Poles Quantity" />
                <TextInput
                    id="ht_poles_quantity"
                    v-model="form.ht_poles_quantity"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.ht_poles_quantity }"
                />
                <InputError class="mt-2" :message="form.errors.ht_poles_quantity" />
            </div>

            <div>
                <InputLabel for="lt_poles_quantity" value="LT Poles Quantity" />
                <TextInput
                    id="lt_poles_quantity"
                    v-model="form.lt_poles_quantity"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.lt_poles_quantity }"
                />
                <InputError class="mt-2" :message="form.errors.lt_poles_quantity" />
            </div>

            <div>
                <InputLabel for="ht_conductor_length_km" value="HT Conductor Length (KM)" />
                <TextInput
                    id="ht_conductor_length_km"
                    v-model="form.ht_conductor_length_km"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.ht_conductor_length_km }"
                />
                <InputError class="mt-2" :message="form.errors.ht_conductor_length_km" />
            </div>

            <div>
                <InputLabel for="ht_conductor_type" value="HT Conductor Type" />
                <TextInput
                    id="ht_conductor_type"
                    v-model="form.ht_conductor_type"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.ht_conductor_type }"
                />
                <InputError class="mt-2" :message="form.errors.ht_conductor_type" />
            </div>

            <div>
                <InputLabel for="lt_conductor_length_km" value="LT Conductor Length (KM)" />
                <TextInput
                    id="lt_conductor_length_km"
                    v-model="form.lt_conductor_length_km"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.lt_conductor_length_km }"
                />
                <InputError class="mt-2" :message="form.errors.lt_conductor_length_km" />
            </div>

            <div>
                <InputLabel for="lt_conductor_type" value="LT Conductor Type" />
                <TextInput
                    id="lt_conductor_type"
                    v-model="form.lt_conductor_type"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.lt_conductor_type }"
                />
                <InputError class="mt-2" :message="form.errors.lt_conductor_type" />
            </div>
        </div>

        <div class="mt-6 border p-4 rounded-lg bg-gray-50">
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center justify-between">
                Step-Up Transformers
                <PrimaryButton type="button" @click="addTransformer('step_up')" class="ml-4 px-3 py-1 text-sm">
                    + Add
                </PrimaryButton>
            </h3>
            <div v-for="(transformer, index) in form.step_up_transformers" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <InputLabel :for="`step_up_kva_${index}`" value="KVA" />
                    <TextInput
                        :id="`step_up_kva_${index}`"
                        v-model="transformer.kva"
                        type="number"
                        min="0"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors[`step_up_transformers.${index}.kva`] }"
                    />
                    <InputError class="mt-2" :message="form.errors[`step_up_transformers.${index}.kva`]" />
                </div>
                <div>
                    <InputLabel :for="`step_up_qty_${index}`" value="Quantity" />
                    <TextInput
                        :id="`step_up_qty_${index}`"
                        v-model="transformer.qty"
                        type="number"
                        min="0"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors[`step_up_transformers.${index}.qty`] }"
                    />
                    <InputError class="mt-2" :message="form.errors[`step_up_transformers.${index}.qty`]" />
                </div>
                <div class="flex items-end">
                    <DangerButton type="button" @click="removeTransformer('step_up', index)" class="px-3 py-2 text-sm">
                        Remove
                    </DangerButton>
                </div>
            </div>
            <InputError class="mt-2" :message="form.errors.step_up_transformers" />
        </div>

        <div class="mt-6 border p-4 rounded-lg bg-gray-50">
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center justify-between">
                Step-Down Transformers
                <PrimaryButton type="button" @click="addTransformer('step_down')" class="ml-4 px-3 py-1 text-sm">
                    + Add
                </PrimaryButton>
            </h3>
            <div v-for="(transformer, index) in form.step_down_transformers" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <InputLabel :for="`step_down_kva_${index}`" value="KVA" />
                    <TextInput
                        :id="`step_down_kva_${index}`"
                        v-model="transformer.kva"
                        type="number"
                        min="0"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors[`step_down_transformers.${index}.kva`] }"
                    />
                    <InputError class="mt-2" :message="form.errors[`step_down_transformers.${index}.kva`]" />
                </div>
                <div>
                    <InputLabel :for="`step_down_qty_${index}`" value="Quantity" />
                    <TextInput
                        :id="`step_down_qty_${index}`"
                        v-model="transformer.qty"
                        type="number"
                        min="0"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors[`step_down_transformers.${index}.qty`] }"
                    />
                    <InputError class="mt-2" :message="form.errors[`step_down_transformers.${index}.qty`]" />
                </div>
                <div class="flex items-end">
                    <DangerButton type="button" @click="removeTransformer('step_down', index)" class="px-3 py-2 text-sm">
                        Remove
                    </DangerButton>
                </div>
            </div>
            <InputError class="mt-2" :message="form.errors.step_down_transformers" />
        </div>


        <div class="mt-6">
            <InputLabel for="scope_of_work" value="Scope of Work" />
            <TextArea
                id="scope_of_work"
                v-model="form.scope_of_work"
                class="mt-1 block w-full"
                :class="{ 'border-red-500': form.errors.scope_of_work }"
            />
            <InputError class="mt-2" :message="form.errors.scope_of_work" />
        </div>

        <div class="mt-6">
            <InputLabel for="remarks" value="Remarks" />
            <TextArea
                id="remarks"
                v-model="form.remarks"
                class="mt-1 block w-full"
                :class="{ 'border-red-500': form.errors.remarks }"
            />
            <InputError class="mt-2" :message="form.errors.remarks" />
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
                {{ isEditMode ? 'Update T&D Work' : 'Add T&D Work' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* Scoped styles specific to this form, if any */
</style>
