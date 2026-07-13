<script setup>
import { useForm } from '@inertiajs/vue3';
import { watch, ref, computed } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputGroup from '@/Components/FormComponents/InputGroup.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputError from '@/Components/InputError.vue';
import Checkbox from "@/Components/Checkbox.vue";
import AttachmentUploader from "@/Components/AttachmentComponent/AttachmentUploader.vue";
import DatePicker from '@/Components/DatePicker.vue';
import { formatCurrency, formatDecimal } from '@/Utils/formatters';

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

// --- Stepper Navigation Configuration ---
const currentStep = ref(0);
const tabs = [
    { id: 'mechanical', name: 'Mechanical Specs', icon: 'settings' },
    { id: 'electrical', name: 'Electrical & SCADA', icon: 'electric_meter' },
    { id: 'procurement', name: 'Procurement & Timelines', icon: 'gavel' },
    { id: 'progress', name: 'Progress & Files', icon: 'analytics' },
];

const activeTab = computed(() => tabs[currentStep.value].id);

const goToStep = (index) => {
    if (index >= 0 && index < tabs.length) {
        currentStep.value = index;
    }
};

const nextStep = () => {
    if (currentStep.value < tabs.length - 1) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
};

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

    attachments: [],
    attachments_to_delete: [],
});

watch(() => props.emeInfo, (newEmeInfo) => {
    if (newEmeInfo) {
        form.defaults({
            ...newEmeInfo,
            scada_system: newEmeInfo.scada_system === 1,
        });
        form.reset();
        existingAttachments.value = newEmeInfo.attachments_frontend ?? [];
    } else {
        form.reset();
        existingAttachments.value = [];
    }
}, { immediate: true });

const handleFiles = (files) => {
    form.attachments = files.map(fileItem => fileItem.file);
};

const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

const submit = () => {
    const url = props.emeInfo?.id
        ? route('mhp.sites.eme-info.update', { site: props.mhpSite.id, eme_info: props.emeInfo.id })
        : route('mhp.sites.eme-info.store', props.mhpSite.id);

    if (props.emeInfo?.id) {
        form.transform((data) => ({
            ...data,
            _method: 'put',
        }));
    }

    form.post(url, {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            emit('success', props.emeInfo?.id ? 'EME Profile updated successfully!' : 'EME Profile created successfully!');
        },
        onError: (errors) => {
            console.error('Form submission errors:', errors);
        }
    });
};
</script>

<template>
    <div class="space-y-4">
        <!-- Tab Navigation Stepper -->
        <div class="border-b border-ink-200 pb-3 bg-paper-50 px-5 py-3 rounded-xl border">
            <nav class="flex flex-wrap justify-between items-center gap-3">
                <button
                    v-for="(tab, index) in tabs"
                    :key="tab.id"
                    @click="goToStep(index)"
                    class="flex items-center gap-1.5 py-1.5 px-2.5 text-xs font-semibold rounded-lg transition focus:outline-none"
                    :class="[
                        currentStep === index
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : currentStep > index
                                ? 'bg-emerald-50 text-emerald-800'
                                : 'bg-surface text-ink-500 border border-ink-200 hover:bg-paper-100'
                    ]"
                    type="button"
                >
                    <span class="material-symbols-outlined text-[15px] shrink-0">
                        {{ currentStep > index ? 'check_circle' : tab.icon }}
                    </span>
                    {{ tab.name }}
                </button>
            </nav>
        </div>

        <!-- Tab Panel Content Container -->
        <div class="space-y-4 pr-1">
            
            <!-- Step 1: Mechanical Specs -->
            <div v-if="activeTab === 'mechanical'" class="space-y-4">
                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">settings</span>
                        Turbine Parameters
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputGroup id="turbine_capacity_kw" label="Turbine Capacity (KW)" :error="form.errors.turbine_capacity_kw">
                            <TextInput id="turbine_capacity_kw" v-model="form.turbine_capacity_kw" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="turbine_type" label="Turbine Type" :error="form.errors.turbine_type">
                            <TextInput id="turbine_type" v-model="form.turbine_type" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="turbine_no" label="Turbine Serial No" :error="form.errors.turbine_no">
                            <TextInput id="turbine_no" v-model="form.turbine_no" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                    </div>
                </div>

                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">tune</span>
                        Governor & Penstock Configuration
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup id="governor_type" label="Governor Type" :error="form.errors.governor_type">
                            <TextInput id="governor_type" v-model="form.governor_type" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="governor_no" label="Governor Serial No" :error="form.errors.governor_no">
                            <TextInput id="governor_no" v-model="form.governor_no" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup
                            id="penstock_pipe"
                            label="Penstock Pipe Details"
                            help="The penstock is the pressurized pipe that carries water from the intake/forebay down to the turbine."
                            :error="form.errors.penstock_pipe"
                        >
                            <TextInput id="penstock_pipe" v-model="form.penstock_pipe" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="no_of_penstock_pipe" label="No. of Penstock Pipes" :error="form.errors.no_of_penstock_pipe">
                            <TextInput id="no_of_penstock_pipe" v-model="form.no_of_penstock_pipe" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                    </div>
                </div>
            </div>

            <!-- Step 2: Electrical & SCADA -->
            <div v-if="activeTab === 'electrical'" class="space-y-4">
                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">bolt</span>
                        Generator & Transformer Capacities
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputGroup id="generator_alternator_capacity" label="Alternator Capacity (KVA)" :error="form.errors.generator_alternator_capacity">
                            <TextInput id="generator_alternator_capacity" v-model="form.generator_alternator_capacity" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="stepup_transformer_capacity" label="Step-up Capacity (KVA)" :error="form.errors.stepup_transformer_capacity">
                            <TextInput id="stepup_transformer_capacity" v-model="form.stepup_transformer_capacity" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="no_of_step_up_transformers" label="No. of Step-up Transformers" :error="form.errors.no_of_step_up_transformers">
                            <TextInput id="no_of_step_up_transformers" v-model="form.no_of_step_up_transformers" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                    </div>
                </div>

                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">developer_board</span>
                        SCADA Control & Station Gen
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div class="flex items-center gap-3 pt-4">
                            <Checkbox id="scada_system" v-model:checked="form.scada_system" />
                            <InputLabel for="scada_system" value="SCADA System Installed?" class="text-xs font-semibold text-ink-600" />
                            <InputError :message="form.errors.scada_system" class="mt-0.5 text-xs" />
                        </div>
                        <InputGroup v-if="form.scada_system" id="scada_system_model" label="SCADA System Model" :error="form.errors.scada_system_model">
                            <TextInput id="scada_system_model" v-model="form.scada_system_model" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="station_generator_capacity" label="Station Gen Capacity (KW)" :error="form.errors.station_generator_capacity">
                            <TextInput id="station_generator_capacity" v-model="form.station_generator_capacity" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                    </div>
                </div>
            </div>

            <!-- Step 3: Procurement & Timelines -->
            <div v-if="activeTab === 'procurement'" class="space-y-4">
                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">calendar_month</span>
                        Timeline & EME Cost Estimates
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputGroup id="estimated_cost" label="Estimated Cost (PKR)" :error="form.errors.estimated_cost">
                            <TextInput id="estimated_cost" v-model="form.estimated_cost" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="initiation_date" label="EME Initiation Date" :error="form.errors.initiation_date">
                            <DatePicker id="initiation_date" v-model="form.initiation_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="completion_date" label="EME Completion Date" :error="form.errors.completion_date">
                            <DatePicker id="completion_date" v-model="form.completion_date" class="mt-0.5" />
                        </InputGroup>
                    </div>
                </div>

                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">gavel</span>
                        Procurement Milestones
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <InputGroup id="advertisement_date" label="Advertisement in Newspaper" :error="form.errors.advertisement_date">
                            <DatePicker id="advertisement_date" v-model="form.advertisement_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="pre_bid_meeting_date" label="Pre-Bid Meeting Date" :error="form.errors.pre_bid_meeting_date">
                            <DatePicker id="pre_bid_meeting_date" v-model="form.pre_bid_meeting_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="technical_bid_opening_date" label="Technical Bid Opening" :error="form.errors.technical_bid_opening_date">
                            <DatePicker id="technical_bid_opening_date" v-model="form.technical_bid_opening_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="financial_bid_opening_date" label="Financial Bid Opening" :error="form.errors.financial_bid_opening_date">
                            <DatePicker id="financial_bid_opening_date" v-model="form.financial_bid_opening_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="contract_award_date" label="Contract Award Date" :error="form.errors.contract_award_date">
                            <DatePicker id="contract_award_date" v-model="form.contract_award_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="contractor_amount" label="Awarded Bid Amount (PKR)" :error="form.errors.contractor_amount">
                            <TextInput id="contractor_amount" v-model="form.contractor_amount" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                    </div>
                </div>
            </div>

            <!-- Step 4: Progress & Attachments -->
            <div v-if="activeTab === 'progress'" class="space-y-4">
                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">payments</span>
                        Physical & Financial Progress Logs
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InputGroup id="physical_progress_percent" label="Physical Progress (%)" :error="form.errors.physical_progress_percent">
                            <TextInput id="physical_progress_percent" v-model="form.physical_progress_percent" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="financial_progress_percent" label="Financial Progress (%)" :error="form.errors.financial_progress_percent">
                            <TextInput id="financial_progress_percent" v-model="form.financial_progress_percent" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="amount_disbursed" label="Amount Disbursed (PKR)" :error="form.errors.amount_disbursed">
                            <TextInput id="amount_disbursed" v-model="form.amount_disbursed" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="amount_remaining" label="Amount Remaining (PKR)" :error="form.errors.amount_remaining">
                            <TextInput id="amount_remaining" v-model="form.amount_remaining" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="progress_description" label="Progress Description Details" class="col-span-2 md:col-span-4" :error="form.errors.progress_description">
                            <TextArea id="progress_description" v-model="form.progress_description" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                        </InputGroup>
                    </div>
                </div>

                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">attachment</span>
                        EME Documents & Attachments
                    </h4>
                    <InputGroup label="Attachments" :error="form.errors.attachments">
                        <AttachmentUploader
                            @update-files="handleFiles"
                            :existing-attachments="existingAttachments"
                            @remove-existing="handleAttachmentsToDelete"
                            :error-message="form.errors.attachments"
                        />
                    </InputGroup>
                </div>
            </div>
        </div>

        <!-- Wizard Navigation Actions Footnote -->
        <div class="pt-4 border-t border-ink-200 flex justify-between items-center bg-paper-50/50 p-4 rounded-xl border">
            <div>
                <button
                    type="button"
                    @click="emit('cancel')"
                    class="inline-flex items-center px-3.5 py-1.5 bg-paper-200 border border-transparent rounded-lg font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-300 transition"
                >
                    Cancel
                </button>
            </div>
            
            <div class="flex items-center gap-2">
                <!-- Back Button -->
                <button
                    v-if="currentStep > 0"
                    type="button"
                    @click="prevStep"
                    class="inline-flex items-center px-3.5 py-1.5 bg-surface border border-ink-300 rounded-lg font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-50 transition shadow-sm"
                >
                    <span class="material-symbols-outlined text-[12px] mr-1">arrow_back</span>
                    Back
                </button>

                <!-- Next Button -->
                <button
                    v-if="currentStep < tabs.length - 1"
                    type="button"
                    @click="nextStep"
                    class="inline-flex items-center px-3.5 py-1.5 bg-emerald-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 transition shadow-sm"
                >
                    Next
                    <span class="material-symbols-outlined text-[12px] ml-1">arrow_forward</span>
                </button>

                <!-- Submit Button -->
                <PrimaryButton 
                    v-if="currentStep === tabs.length - 1"
                    :class="['bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm rounded-lg px-3.5 py-1.5 text-xs', { 'opacity-25': form.processing }]" 
                    :disabled="form.processing"
                    @click="submit"
                >
                    Save EME Profile
                </PrimaryButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
input, select, textarea {
    @apply focus:ring-emerald-500 focus:border-emerald-500;
}
</style>
