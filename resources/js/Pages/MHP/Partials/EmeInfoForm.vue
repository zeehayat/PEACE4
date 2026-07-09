<script setup>
import { useForm } from '@inertiajs/vue3';
import { watch, ref, computed } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
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
                        <div>
                            <InputLabel for="turbine_capacity_kw" value="Turbine Capacity (KW)" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="turbine_capacity_kw" v-model="form.turbine_capacity_kw" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.turbine_capacity_kw" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="turbine_type" value="Turbine Type" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="turbine_type" v-model="form.turbine_type" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.turbine_type" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="turbine_no" value="Turbine Serial No" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="turbine_no" v-model="form.turbine_no" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.turbine_no" class="mt-0.5 text-xs" />
                        </div>
                    </div>
                </div>

                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">tune</span>
                        Governor & Penstock Configuration
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel for="governor_type" value="Governor Type" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="governor_type" v-model="form.governor_type" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.governor_type" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="governor_no" value="Governor Serial No" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="governor_no" v-model="form.governor_no" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.governor_no" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="penstock_pipe" value="Penstock Pipe Details" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="penstock_pipe" v-model="form.penstock_pipe" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.penstock_pipe" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="no_of_penstock_pipe" value="No. of Penstock Pipes" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="no_of_penstock_pipe" v-model="form.no_of_penstock_pipe" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.no_of_penstock_pipe" class="mt-0.5 text-xs" />
                        </div>
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
                        <div>
                            <InputLabel for="generator_alternator_capacity" value="Alternator Capacity (KVA)" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="generator_alternator_capacity" v-model="form.generator_alternator_capacity" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.generator_alternator_capacity" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="stepup_transformer_capacity" value="Step-up Capacity (KVA)" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="stepup_transformer_capacity" v-model="form.stepup_transformer_capacity" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.stepup_transformer_capacity" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="no_of_step_up_transformers" value="No. of Step-up Transformers" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="no_of_step_up_transformers" v-model="form.no_of_step_up_transformers" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.no_of_step_up_transformers" class="mt-0.5 text-xs" />
                        </div>
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
                        <div v-if="form.scada_system">
                            <InputLabel for="scada_system_model" value="SCADA System Model" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="scada_system_model" v-model="form.scada_system_model" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.scada_system_model" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="station_generator_capacity" value="Station Gen Capacity (KW)" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="station_generator_capacity" v-model="form.station_generator_capacity" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.station_generator_capacity" class="mt-0.5 text-xs" />
                        </div>
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
                        <div>
                            <InputLabel for="estimated_cost" value="Estimated Cost (PKR)" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="estimated_cost" v-model="form.estimated_cost" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.estimated_cost" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="initiation_date" value="EME Initiation Date" class="text-xs font-semibold text-ink-600" />
                            <DatePicker id="initiation_date" v-model="form.initiation_date" class="mt-0.5" />
                            <InputError :message="form.errors.initiation_date" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="completion_date" value="EME Completion Date" class="text-xs font-semibold text-ink-600" />
                            <DatePicker id="completion_date" v-model="form.completion_date" class="mt-0.5" />
                            <InputError :message="form.errors.completion_date" class="mt-0.5 text-xs" />
                        </div>
                    </div>
                </div>

                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">gavel</span>
                        Procurement Milestones
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <InputLabel for="advertisement_date" value="Advertisement in Newspaper" class="text-xs font-semibold text-ink-600" />
                            <DatePicker id="advertisement_date" v-model="form.advertisement_date" class="mt-0.5" />
                            <InputError :message="form.errors.advertisement_date" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="pre_bid_meeting_date" value="Pre-Bid Meeting Date" class="text-xs font-semibold text-ink-600" />
                            <DatePicker id="pre_bid_meeting_date" v-model="form.pre_bid_meeting_date" class="mt-0.5" />
                            <InputError :message="form.errors.pre_bid_meeting_date" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="technical_bid_opening_date" value="Technical Bid Opening" class="text-xs font-semibold text-ink-600" />
                            <DatePicker id="technical_bid_opening_date" v-model="form.technical_bid_opening_date" class="mt-0.5" />
                            <InputError :message="form.errors.technical_bid_opening_date" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="financial_bid_opening_date" value="Financial Bid Opening" class="text-xs font-semibold text-ink-600" />
                            <DatePicker id="financial_bid_opening_date" v-model="form.financial_bid_opening_date" class="mt-0.5" />
                            <InputError :message="form.errors.financial_bid_opening_date" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="contract_award_date" value="Contract Award Date" class="text-xs font-semibold text-ink-600" />
                            <DatePicker id="contract_award_date" v-model="form.contract_award_date" class="mt-0.5" />
                            <InputError :message="form.errors.contract_award_date" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="contractor_amount" value="Awarded Bid Amount (PKR)" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="contractor_amount" v-model="form.contractor_amount" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.contractor_amount" class="mt-0.5 text-xs" />
                        </div>
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
                        <div>
                            <InputLabel for="physical_progress_percent" value="Physical Progress (%)" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="physical_progress_percent" v-model="form.physical_progress_percent" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.physical_progress_percent" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="financial_progress_percent" value="Financial Progress (%)" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="financial_progress_percent" v-model="form.financial_progress_percent" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.financial_progress_percent" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="amount_disbursed" value="Amount Disbursed (PKR)" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="amount_disbursed" v-model="form.amount_disbursed" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.amount_disbursed" class="mt-0.5 text-xs" />
                        </div>
                        <div>
                            <InputLabel for="amount_remaining" value="Amount Remaining (PKR)" class="text-xs font-semibold text-ink-600" />
                            <TextInput id="amount_remaining" v-model="form.amount_remaining" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError :message="form.errors.amount_remaining" class="mt-0.5 text-xs" />
                        </div>
                        <div class="col-span-2 md:col-span-4">
                            <InputLabel for="progress_description" value="Progress Description Details" class="text-xs font-semibold text-ink-600" />
                            <TextArea id="progress_description" v-model="form.progress_description" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                            <InputError :message="form.errors.progress_description" class="mt-0.5 text-xs" />
                        </div>
                    </div>
                </div>

                <div class="bg-surface border border-ink-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">attachment</span>
                        EME Documents & Attachments
                    </h4>
                    <div class="space-y-4">
                        <AttachmentUploader
                            @update-files="handleFiles"
                            :existing-attachments="existingAttachments"
                            @remove-existing="handleAttachmentsToDelete"
                            :error-message="form.errors.attachments"
                        />
                        <InputError :message="form.errors.attachments" class="mt-0.5 text-xs" />
                    </div>
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
