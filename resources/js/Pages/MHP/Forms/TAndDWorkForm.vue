<script setup>
import { watch, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputGroup from '@/Components/FormComponents/InputGroup.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import DangerButton from '@/Components/DangerButton.vue';

const props = defineProps({
    mhpSiteId: { type: Number, required: true },
    tAndDWork: { type: Object, default: null },
    action: { type: String, default: 'create' }, // 'create' | 'update'
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.action === 'update');
const existingAttachments = ref(props.tAndDWork ? props.tAndDWork.attachments_frontend : []);

// 🚫 Do NOT include projectable_* fields; controller sets them via relation
const form = useForm({
    name: props.tAndDWork?.name ?? '',
    date_of_initiation: props.tAndDWork?.date_of_initiation ?? null,
    step_up_transformers:
        props.tAndDWork?.step_up_transformers?.length
            ? props.tAndDWork.step_up_transformers
            : [{ kva: null, qty: null }],
    step_down_transformers:
        props.tAndDWork?.step_down_transformers?.length
            ? props.tAndDWork.step_down_transformers
            : [{ kva: null, qty: null }],
    ht_poles_quantity: props.tAndDWork?.ht_poles_quantity ?? '',
    lt_poles_quantity: props.tAndDWork?.lt_poles_quantity ?? '',
    ht_conductor_length_km: props.tAndDWork?.ht_conductor_length_km ?? '',
    ht_conductor_type: props.tAndDWork?.ht_conductor_type ?? '',
    lt_conductor_length_km: props.tAndDWork?.lt_conductor_length_km ?? '',
    lt_conductor_type: props.tAndDWork?.lt_conductor_type ?? '',
    scope_of_work: props.tAndDWork?.scope_of_work ?? '',
    remarks: props.tAndDWork?.remarks ?? '',
    estimated_cost: props.tAndDWork?.estimated_cost ?? null,
    completion_date: props.tAndDWork?.completion_date ?? null,

    // Procurement
    advertisement_date: props.tAndDWork?.advertisement_date ?? null,
    pre_bid_meeting_date: props.tAndDWork?.pre_bid_meeting_date ?? null,
    technical_bid_opening_date: props.tAndDWork?.technical_bid_opening_date ?? null,
    financial_bid_opening_date: props.tAndDWork?.financial_bid_opening_date ?? null,
    contract_award_date: props.tAndDWork?.contract_award_date ?? null,
    contractor_amount: props.tAndDWork?.contractor_amount ?? null,

    // Progress
    financial_progress_percent: props.tAndDWork?.financial_progress_percent ?? null,
    amount_disbursed: props.tAndDWork?.amount_disbursed ?? null,
    amount_remaining: props.tAndDWork?.amount_remaining ?? null,
    physical_progress_percent: props.tAndDWork?.physical_progress_percent ?? null,
    progress_description: props.tAndDWork?.progress_description ?? '',

    attachments: [],
    attachments_to_delete: [],
});

const addTransformer = (type) => {
    if (type === 'step_up') form.step_up_transformers.push({ kva: null, qty: null });
    else form.step_down_transformers.push({ kva: null, qty: null });
};

const removeTransformer = (type, index) => {
    if (type === 'step_up') {
        form.step_up_transformers.splice(index, 1);
        if (!form.step_up_transformers.length) form.step_up_transformers.push({ kva: null, qty: null });
    } else {
        form.step_down_transformers.splice(index, 1);
        if (!form.step_down_transformers.length) form.step_down_transformers.push({ kva: null, qty: null });
    }
};

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    const url = isEditMode.value
        // ✅ correct Ziggy name + params
        ? route('mhp.sites.t-and-d-works.update', { site: props.mhpSiteId, t_and_d_work: props.tAndDWork.id })
        : route('mhp.sites.t-and-d-works.store', { site: props.mhpSiteId });

    form.transform((data) => {
        if (isEditMode.value) data._method = 'put'; // method spoofing

        // Normalize all date fields to YYYY-MM-DD
        const dateFields = [
            'date_of_initiation',
            'completion_date',
            'advertisement_date',
            'pre_bid_meeting_date',
            'technical_bid_opening_date',
            'financial_bid_opening_date',
            'contract_award_date'
        ];
        dateFields.forEach(field => {
            if (data[field] && typeof data[field] === 'object' && data[field].toISOString) {
                data[field] = data[field].toISOString().slice(0, 10);
            }
        });

        // Filter empty transformer rows
        data.step_up_transformers = (data.step_up_transformers || []).filter(t => t.kva != null && t.qty != null);
        data.step_down_transformers = (data.step_down_transformers || []).filter(t => t.kva != null && t.qty != null);

        return data;
    }).post(url, {
        onSuccess: () => {
            form.reset();
            form.attachments = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'T&D Work updated successfully!' : 'T&D Work created successfully!');
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

// Re-init when editing a different item or when action changes
watch(
    () => props.tAndDWork,
    (newVal) => {
        if (newVal) {
            isEditMode.value = true;

            // start clean (keeps methods like .post(), etc.)
            form.reset();

            // assign values field-by-field
            const next = {
                projectable_id: props.mhpSiteId,
                projectable_type: 'mhp_site', // use morph alias if you keep this field
                name: newVal.name ?? '',
                date_of_initiation: newVal.date_of_initiation ?? null,
                step_up_transformers:
                    (newVal.step_up_transformers?.length ? newVal.step_up_transformers : [{ kva: null, qty: null }]),
                step_down_transformers:
                    (newVal.step_down_transformers?.length ? newVal.step_down_transformers : [{ kva: null, qty: null }]),
                ht_poles_quantity: newVal.ht_poles_quantity ?? '',
                lt_poles_quantity: newVal.lt_poles_quantity ?? '',
                ht_conductor_length_km: newVal.ht_conductor_length_km ?? '',
                ht_conductor_type: newVal.ht_conductor_type ?? '',
                lt_conductor_length_km: newVal.lt_conductor_length_km ?? '',
                lt_conductor_type: newVal.lt_conductor_type ?? '',
                scope_of_work: newVal.scope_of_work ?? '',
                remarks: newVal.remarks ?? '',
                estimated_cost: newVal.estimated_cost ?? null,
                completion_date: newVal.completion_date ?? null,
                
                advertisement_date: newVal.advertisement_date ?? null,
                pre_bid_meeting_date: newVal.pre_bid_meeting_date ?? null,
                technical_bid_opening_date: newVal.technical_bid_opening_date ?? null,
                financial_bid_opening_date: newVal.financial_bid_opening_date ?? null,
                contract_award_date: newVal.contract_award_date ?? null,
                contractor_amount: newVal.contractor_amount ?? null,

                financial_progress_percent: newVal.financial_progress_percent ?? null,
                amount_disbursed: newVal.amount_disbursed ?? null,
                amount_remaining: newVal.amount_remaining ?? null,
                physical_progress_percent: newVal.physical_progress_percent ?? null,
                progress_description: newVal.progress_description ?? '',

                attachments: [],
                attachments_to_delete: [],
            };

            Object.entries(next).forEach(([k, v]) => (form[k] = v));
            existingAttachments.value = newVal.attachments_frontend ?? [];
        } else {
            isEditMode.value = false;
            form.reset();
            form.projectable_id = props.mhpSiteId;
            form.projectable_type = 'mhp_site';
            form.step_up_transformers = [{ kva: null, qty: null }];
            form.step_down_transformers = [{ kva: null, qty: null }];
            existingAttachments.value = [];
        }
    },
    { immediate: true }
);

</script>


<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <input type="hidden" v-model="form.projectable_id" />
        <input type="hidden" v-model="form.projectable_type" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup id="name" label="Work Name / Title" :error="form.errors.name">
                <TextInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.name }"
                />
            </InputGroup>

            <InputGroup id="date_of_initiation" label="Date of Initiation" :error="form.errors.date_of_initiation">
                <DatePicker
                    id="date_of_initiation"
                    v-model="form.date_of_initiation"
                    :class="{ 'border-red-500': form.errors.date_of_initiation }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <InputGroup id="completion_date" label="Date of Completion" :error="form.errors.completion_date">
                <DatePicker
                    id="completion_date"
                    v-model="form.completion_date"
                    :class="{ 'border-red-500': form.errors.completion_date }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <InputGroup id="estimated_cost" label="Estimated Cost" :error="form.errors.estimated_cost">
                <TextInput
                    id="estimated_cost"
                    v-model="form.estimated_cost"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.estimated_cost }"
                />
            </InputGroup>

            <InputGroup
                id="ht_poles_quantity"
                label="HT Poles Quantity"
                help="HT means High Tension — the number of poles carrying the high-voltage transmission line."
                :error="form.errors.ht_poles_quantity"
            >
                <TextInput
                    id="ht_poles_quantity"
                    v-model="form.ht_poles_quantity"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.ht_poles_quantity }"
                />
            </InputGroup>

            <InputGroup
                id="lt_poles_quantity"
                label="LT Poles Quantity"
                help="LT means Low Tension — the number of poles carrying the low-voltage distribution line."
                :error="form.errors.lt_poles_quantity"
            >
                <TextInput
                    id="lt_poles_quantity"
                    v-model="form.lt_poles_quantity"
                    type="number"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.lt_poles_quantity }"
                />
            </InputGroup>

            <InputGroup
                id="ht_conductor_length_km"
                label="HT Conductor Length (KM)"
                help="HT means High Tension — length of the high-voltage transmission conductor."
                :error="form.errors.ht_conductor_length_km"
            >
                <TextInput
                    id="ht_conductor_length_km"
                    v-model="form.ht_conductor_length_km"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.ht_conductor_length_km }"
                />
            </InputGroup>

            <InputGroup
                id="ht_conductor_type"
                label="HT Conductor Type"
                help="HT means High Tension — the type/spec of conductor used on the high-voltage line."
                :error="form.errors.ht_conductor_type"
            >
                <TextInput
                    id="ht_conductor_type"
                    v-model="form.ht_conductor_type"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.ht_conductor_type }"
                />
            </InputGroup>

            <InputGroup
                id="lt_conductor_length_km"
                label="LT Conductor Length (KM)"
                help="LT means Low Tension — length of the low-voltage distribution conductor."
                :error="form.errors.lt_conductor_length_km"
            >
                <TextInput
                    id="lt_conductor_length_km"
                    v-model="form.lt_conductor_length_km"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.lt_conductor_length_km }"
                />
            </InputGroup>

            <InputGroup
                id="lt_conductor_type"
                label="LT Conductor Type"
                help="LT means Low Tension — the type/spec of conductor used on the low-voltage line."
                :error="form.errors.lt_conductor_type"
            >
                <TextInput
                    id="lt_conductor_type"
                    v-model="form.lt_conductor_type"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.lt_conductor_type }"
                />
            </InputGroup>
        </div>

        <div class="mt-6 border p-4 rounded-lg bg-paper-50">
            <h3 class="text-lg font-medium text-ink-900 mb-4 flex items-center justify-between">
                Step-Up Transformers
                <PrimaryButton type="button" @click="addTransformer('step_up')" class="ml-4 px-3 py-1 text-sm">
                    + Add
                </PrimaryButton>
            </h3>
            <div v-for="(transformer, index) in form.step_up_transformers" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <InputGroup :id="`step_up_kva_${index}`" label="KVA" :error="form.errors[`step_up_transformers.${index}.kva`]">
                    <TextInput
                        :id="`step_up_kva_${index}`"
                        v-model="transformer.kva"
                        type="number"
                        min="0"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors[`step_up_transformers.${index}.kva`] }"
                    />
                </InputGroup>
                <InputGroup :id="`step_up_qty_${index}`" label="Quantity" :error="form.errors[`step_up_transformers.${index}.qty`]">
                    <TextInput
                        :id="`step_up_qty_${index}`"
                        v-model="transformer.qty"
                        type="number"
                        min="0"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors[`step_up_transformers.${index}.qty`] }"
                    />
                </InputGroup>
                <div class="flex items-end">
                    <DangerButton type="button" @click="removeTransformer('step_up', index)" class="px-3 py-2 text-sm">
                        Remove
                    </DangerButton>
                </div>
            </div>
            <InputError class="mt-2" :message="form.errors.step_up_transformers" />
        </div>

        <div class="mt-6 border p-4 rounded-lg bg-paper-50">
            <h3 class="text-lg font-medium text-ink-900 mb-4 flex items-center justify-between">
                Step-Down Transformers
                <PrimaryButton type="button" @click="addTransformer('step_down')" class="ml-4 px-3 py-1 text-sm">
                    + Add
                </PrimaryButton>
            </h3>
            <div v-for="(transformer, index) in form.step_down_transformers" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <InputGroup :id="`step_down_kva_${index}`" label="KVA" :error="form.errors[`step_down_transformers.${index}.kva`]">
                    <TextInput
                        :id="`step_down_kva_${index}`"
                        v-model="transformer.kva"
                        type="number"
                        min="0"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors[`step_down_transformers.${index}.kva`] }"
                    />
                </InputGroup>
                <InputGroup :id="`step_down_qty_${index}`" label="Quantity" :error="form.errors[`step_down_transformers.${index}.qty`]">
                    <TextInput
                        :id="`step_down_qty_${index}`"
                        v-model="transformer.qty"
                        type="number"
                        min="0"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors[`step_down_transformers.${index}.qty`] }"
                    />
                </InputGroup>
                <div class="flex items-end">
                    <DangerButton type="button" @click="removeTransformer('step_down', index)" class="px-3 py-2 text-sm">
                        Remove
                    </DangerButton>
                </div>
            </div>
            <InputError class="mt-2" :message="form.errors.step_down_transformers" />
        </div>


        <InputGroup id="scope_of_work" label="Scope of Work" class="mt-6" :error="form.errors.scope_of_work">
            <TextArea
                id="scope_of_work"
                v-model="form.scope_of_work"
                class="mt-1 block w-full"
                :class="{ 'border-red-500': form.errors.scope_of_work }"
            />
        </InputGroup>

        <InputGroup id="remarks" label="Remarks" class="mt-6" :error="form.errors.remarks">
            <TextArea
                id="remarks"
                v-model="form.remarks"
                class="mt-1 block w-full"
                :class="{ 'border-red-500': form.errors.remarks }"
            />
        </InputGroup>

        <!-- Procurement Milestones -->
        <div class="mt-6 border p-4 rounded-lg bg-paper-50">
            <h3 class="text-lg font-medium text-ink-900 mb-4">Procurement Milestones</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup id="advertisement_date" label="Advertisement in Newspaper" :error="form.errors.advertisement_date">
                    <DatePicker id="advertisement_date" v-model="form.advertisement_date" />
                </InputGroup>
                <InputGroup id="pre_bid_meeting_date" label="Pre-Bid Meeting" :error="form.errors.pre_bid_meeting_date">
                    <DatePicker id="pre_bid_meeting_date" v-model="form.pre_bid_meeting_date" />
                </InputGroup>
                <InputGroup id="technical_bid_opening_date" label="Technical Bid Opening" :error="form.errors.technical_bid_opening_date">
                    <DatePicker id="technical_bid_opening_date" v-model="form.technical_bid_opening_date" />
                </InputGroup>
                <InputGroup id="financial_bid_opening_date" label="Financial Bid Opening" :error="form.errors.financial_bid_opening_date">
                    <DatePicker id="financial_bid_opening_date" v-model="form.financial_bid_opening_date" />
                </InputGroup>
                <InputGroup id="contract_award_date" label="Contractor Agreement & Work Order" :error="form.errors.contract_award_date">
                    <DatePicker id="contract_award_date" v-model="form.contract_award_date" />
                </InputGroup>
                <InputGroup id="contractor_amount" label="Cost Per Bid (PKR)" :error="form.errors.contractor_amount">
                    <TextInput id="contractor_amount" v-model="form.contractor_amount" type="number" step="0.01" class="mt-1 block w-full" />
                </InputGroup>
            </div>
        </div>

        <!-- Detailed Progress -->
        <div class="mt-6 border p-4 rounded-lg bg-paper-50">
            <h3 class="text-lg font-medium text-ink-900 mb-4">Physical & Financial Progress</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup id="financial_progress_percent" label="Financial Progress (%)" :error="form.errors.financial_progress_percent">
                    <TextInput id="financial_progress_percent" v-model="form.financial_progress_percent" type="number" step="0.01" class="mt-1 block w-full" />
                </InputGroup>
                <InputGroup id="amount_disbursed" label="Amount Disbursed (PKR)" :error="form.errors.amount_disbursed">
                    <TextInput id="amount_disbursed" v-model="form.amount_disbursed" type="number" step="0.01" class="mt-1 block w-full" />
                </InputGroup>
                <InputGroup id="amount_remaining" label="Remaining Amount (PKR)" :error="form.errors.amount_remaining">
                    <TextInput id="amount_remaining" v-model="form.amount_remaining" type="number" step="0.01" class="mt-1 block w-full" />
                </InputGroup>
                <InputGroup id="physical_progress_percent" label="Physical Progress (%)" :error="form.errors.physical_progress_percent">
                    <TextInput id="physical_progress_percent" v-model="form.physical_progress_percent" type="number" step="0.01" class="mt-1 block w-full" />
                </InputGroup>
                <InputGroup id="progress_description" label="Progress Description" class="md:col-span-2" :error="form.errors.progress_description">
                    <TextArea
                        id="progress_description"
                        v-model="form.progress_description"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.progress_description }"
                    />
                </InputGroup>
            </div>
        </div>

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
                {{ isEditMode ? 'Update T&D Work' : 'Add T&D Work' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* Scoped styles specific to this form, if any */
</style>
