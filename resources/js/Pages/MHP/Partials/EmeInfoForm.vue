<script setup>
import { useForm } from '@inertiajs/vue3';
import { watch, ref } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputError from '@/Components/InputError.vue';
import Checkbox from "@/Components/Checkbox.vue";
import AttachmentUploader from "@/Components/AttachmentComponent/AttachmentUploader.vue";
import DatePicker from '@/Components/DatePicker.vue';

const props = defineProps({
    mhpSite: {
        type: Object,
        required: true,
    },
    emeInfo: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['success', 'cancel']);

// **Reactive state for handling attachments**
const existingAttachments = ref([]);
const attachmentsToDelete = ref([]);

const form = useForm({
    turbine_capacity_kw: props.emeInfo?.turbine_capacity_kw ?? '',
    turbine_type: props.emeInfo?.turbine_type ?? '',
    turbine_no: props.emeInfo?.turbine_no ?? '',
    governor_type: props.emeInfo?.governor_type ?? '',
    governor_no: props.emeInfo?.governor_no ?? '',
    generator_alternator_capacity: props.emeInfo?.generator_alternator_capacity ?? '',
    stepup_transformer_capacity: props.emeInfo?.stepup_transformer_capacity ?? '',
    no_of_step_up_transformers: props.emeInfo?.no_of_step_up_transformers ?? '',
    scada_system: props.emeInfo?.scada_system === 1,
    scada_system_model: props.emeInfo?.scada_system_model ?? '',
    station_generator_capacity: props.emeInfo?.station_generator_capacity ?? '',
    penstock_pipe: props.emeInfo?.penstock_pipe ?? '',
    no_of_penstock_pipe: props.emeInfo?.no_of_penstock_pipe ?? '',
    estimated_cost: props.emeInfo?.estimated_cost ?? '',
    initiation_date: props.emeInfo?.initiation_date ?? null,
    completion_date: props.emeInfo?.completion_date ?? null,
    
    // Procurement
    advertisement_date: props.emeInfo?.advertisement_date ?? null,
    pre_bid_meeting_date: props.emeInfo?.pre_bid_meeting_date ?? null,
    technical_bid_opening_date: props.emeInfo?.technical_bid_opening_date ?? null,
    financial_bid_opening_date: props.emeInfo?.financial_bid_opening_date ?? null,
    contract_award_date: props.emeInfo?.contract_award_date ?? null,
    contractor_amount: props.emeInfo?.contractor_amount ?? null,

    // Progress
    financial_progress_percent: props.emeInfo?.financial_progress_percent ?? null,
    amount_disbursed: props.emeInfo?.amount_disbursed ?? null,
    amount_remaining: props.emeInfo?.amount_remaining ?? null,
    physical_progress_percent: props.emeInfo?.physical_progress_percent ?? null,
    progress_description: props.emeInfo?.progress_description ?? '',

    attachments: [], // Array for new file uploads
    attachments_to_delete: [], // Array for IDs of attachments to be deleted
});

// **Watch for existing emeInfo and populate the form and attachments**
watch(() => props.emeInfo, (newEmeInfo) => {
    if (newEmeInfo) {
        form.defaults({
            ...newEmeInfo,
            scada_system: newEmeInfo.scada_system === 1, // Ensure boolean value
        });
        form.reset();

        // Populate existing attachments from the emeInfo object
        if (newEmeInfo.attachments_frontend) {
            existingAttachments.value = newEmeInfo.attachments_frontend;
        }
    } else {
        form.reset();
        existingAttachments.value = [];
    }
}, { immediate: true });

/**
 * Handles the 'update-files' event from the AttachmentUploader component.
 * It updates the form's 'attachments' array with new files to be uploaded.
 * @param {Array} files An array of file objects provided by the uploader.
 */
const handleFiles = (files) => {
    form.attachments = files.map(fileItem => fileItem.file);
};

/**
 * Handles the 'delete-existing' event from the AttachmentUploader.
 * It updates the form's 'attachments_to_delete' array with the IDs of files
 * to be removed from the server.
 * @param {Array} ids An array of IDs of the attachments to be deleted.
 */
const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

const submit = () => {
    const url = props.emeInfo?.id
        ? route('mhp.sites.eme-info.update', { site: props.mhpSite.id, eme_info: props.emeInfo.id })
        : route('mhp.sites.eme-info.store', props.mhpSite.id);

    // Add the PUT method for updates
    if (props.emeInfo?.id) {
        form.transform((data) => ({
            ...data,
            _method: 'put',
        }));
    }

    form.post(url, {
        preserveScroll: true,
        // forceFormData is crucial for sending files via POST/PUT requests
        forceFormData: true,
        onSuccess: () => {
            emit('success');
        },
    });
};
</script>

<template>
    <form @submit.prevent="submit" class="p-6 bg-white rounded-lg shadow-md space-y-8">
        <h3 class="text-xl font-semibold border-b pb-4 mb-6">E&M Profile</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <InputLabel for="turbine_capacity_kw" value="Turbine Capacity (KW)" />
                <TextInput id="turbine_capacity_kw" v-model="form.turbine_capacity_kw" type="number" step="0.01" class="mt-1 block w-full" />
                <InputError :message="form.errors.turbine_capacity_kw" class="mt-2" />
            </div>
            <div>
                <InputLabel for="turbine_type" value="Turbine Type" />
                <TextInput id="turbine_type" v-model="form.turbine_type" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.turbine_type" class="mt-2" />
            </div>
            <div>
                <InputLabel for="turbine_no" value="Turbine No" />
                <TextInput id="turbine_no" v-model="form.turbine_no" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.turbine_no" class="mt-2" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <InputLabel for="governor_type" value="Governor Type" />
                <TextInput id="governor_type" v-model="form.governor_type" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.governor_type" class="mt-2" />
            </div>
            <div>
                <InputLabel for="governor_no" value="Governor No" />
                <TextInput id="governor_no" v-model="form.governor_no" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.governor_no" class="mt-2" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <InputLabel for="generator_alternator_capacity" value="Generator/Alternator Capacity" />
                <TextInput id="generator_alternator_capacity" v-model="form.generator_alternator_capacity" type="number" step="0.01" class="mt-1 block w-full" />
                <InputError :message="form.errors.generator_alternator_capacity" class="mt-2" />
            </div>
            <div>
                <InputLabel for="stepup_transformer_capacity" value="Step-up Transformer Capacity" />
                <TextInput id="stepup_transformer_capacity" v-model="form.stepup_transformer_capacity" type="number" step="0.01" class="mt-1 block w-full" />
                <InputError :message="form.errors.stepup_transformer_capacity" class="mt-2" />
            </div>
            <div>
                <InputLabel for="no_of_step_up_transformers" value="No. of Step-up Transformers" />
                <TextInput id="no_of_step_up_transformers" v-model="form.no_of_step_up_transformers" type="number" class="mt-1 block w-full" />
                <InputError :message="form.errors.no_of_step_up_transformers" class="mt-2" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div class="flex items-center gap-4 pt-6">
                <Checkbox id="scada_system" v-model:checked="form.scada_system" />
                <InputLabel for="scada_system" value="SCADA System?" />
                <InputError :message="form.errors.scada_system" class="mt-2" />
            </div>
            <div v-if="form.scada_system">
                <InputLabel for="scada_system_model" value="SCADA System Model" />
                <TextInput id="scada_system_model" v-model="form.scada_system_model" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.scada_system_model" class="mt-2" />
            </div>
            <div>
                <InputLabel for="station_generator_capacity" value="Station Generator Capacity" />
                <TextInput id="station_generator_capacity" v-model="form.station_generator_capacity" type="number" step="0.01" class="mt-1 block w-full" />
                <InputError :message="form.errors.station_generator_capacity" class="mt-2" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <InputLabel for="penstock_pipe" value="Penstock Pipe" />
                <TextInput id="penstock_pipe" v-model="form.penstock_pipe" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.penstock_pipe" class="mt-2" />
            </div>
            <div>
                <InputLabel for="no_of_penstock_pipe" value="No. of Penstock Pipes" />
                <TextInput id="no_of_penstock_pipe" v-model="form.no_of_penstock_pipe" type="number" class="mt-1 block w-full" />
                <InputError :message="form.errors.no_of_penstock_pipe" class="mt-2" />
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6 mt-6">
            <div>
                <InputLabel for="estimated_cost" value="Estimated Cost" />
                <TextInput id="estimated_cost" v-model="form.estimated_cost" type="number" step="0.01" class="mt-1 block w-full" />
                <InputError :message="form.errors.estimated_cost" class="mt-2" />
            </div>
            <div>
                <InputLabel for="initiation_date" value="Date of EME Work Initiation" />
                <DatePicker
                    id="initiation_date"
                    v-model="form.initiation_date"
                    class="mt-1 block w-full"
                />
                <InputError :message="form.errors.initiation_date" class="mt-2" />
            </div>
            <div>
                <InputLabel for="completion_date" value="Date of EME Work Completion" />
                <DatePicker
                    id="completion_date"
                    v-model="form.completion_date"
                    class="mt-1 block w-full"
                />
                <InputError :message="form.errors.completion_date" class="mt-2" />
            </div>
            </div>


        <!-- Procurement Milestones -->
        <div class="mt-6 border p-4 rounded-lg bg-gray-50">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Procurement Milestones</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <InputLabel for="advertisement_date" value="Advertisement in Newspaper" />
                    <DatePicker id="advertisement_date" v-model="form.advertisement_date" />
                    <InputError class="mt-2" :message="form.errors.advertisement_date" />
                </div>
                 <div>
                    <InputLabel for="pre_bid_meeting_date" value="Pre-Bid Meeting" />
                    <DatePicker id="pre_bid_meeting_date" v-model="form.pre_bid_meeting_date" />
                    <InputError class="mt-2" :message="form.errors.pre_bid_meeting_date" />
                </div>
                 <div>
                    <InputLabel for="technical_bid_opening_date" value="Technical Bid Opening" />
                    <DatePicker id="technical_bid_opening_date" v-model="form.technical_bid_opening_date" />
                    <InputError class="mt-2" :message="form.errors.technical_bid_opening_date" />
                </div>
                 <div>
                    <InputLabel for="financial_bid_opening_date" value="Financial Bid Opening" />
                    <DatePicker id="financial_bid_opening_date" v-model="form.financial_bid_opening_date" />
                    <InputError class="mt-2" :message="form.errors.financial_bid_opening_date" />
                </div>
                 <div>
                    <InputLabel for="contract_award_date" value="Contractor Agreement & Work Order" />
                    <DatePicker id="contract_award_date" v-model="form.contract_award_date" />
                    <InputError class="mt-2" :message="form.errors.contract_award_date" />
                </div>
                 <div>
                    <InputLabel for="contractor_amount" value="Cost Per Bid (PKR)" />
                    <TextInput id="contractor_amount" v-model="form.contractor_amount" type="number" step="0.01" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.contractor_amount" />
                </div>
            </div>
        </div>

        <!-- Detailed Progress -->
        <div class="mt-6 border p-4 rounded-lg bg-gray-50">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Physical & Financial Progress</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <InputLabel for="financial_progress_percent" value="Financial Progress (%)" />
                    <TextInput id="financial_progress_percent" v-model="form.financial_progress_percent" type="number" step="0.01" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.financial_progress_percent" />
                </div>
                <div>
                    <InputLabel for="amount_disbursed" value="Amount Disbursed (PKR)" />
                    <TextInput id="amount_disbursed" v-model="form.amount_disbursed" type="number" step="0.01" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.amount_disbursed" />
                </div>
                <div>
                    <InputLabel for="amount_remaining" value="Remaining Amount (PKR)" />
                    <TextInput id="amount_remaining" v-model="form.amount_remaining" type="number" step="0.01" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.amount_remaining" />
                </div>
                <div>
                    <InputLabel for="physical_progress_percent" value="Physical Progress (%)" />
                    <TextInput id="physical_progress_percent" v-model="form.physical_progress_percent" type="number" step="0.01" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.physical_progress_percent" />
                </div>
                <div class="md:col-span-2">
                    <InputLabel for="progress_description" value="Progress Description" />
                    <TextArea
                        id="progress_description"
                        v-model="form.progress_description"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.progress_description }"
                    />
                    <InputError class="mt-2" :message="form.errors.progress_description" />
                </div>
            </div>
        </div>

        <div class="mt-6">
            <InputLabel value="Attachments" />
            <AttachmentUploader
                @update-files="handleFiles"
                :existing-attachments="existingAttachments"
                @remove-existing="handleAttachmentsToDelete"
                :error-message="form.errors.attachments"
            />
            <InputError class="mt-2" :message="form.errors.attachments" />
        </div>
        <div class="flex items-center justify-end mt-6 space-x-4">
            <button type="button" @click="$emit('cancel')" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Save E&M Profile
            </PrimaryButton>
        </div>
    </form>
</template>
