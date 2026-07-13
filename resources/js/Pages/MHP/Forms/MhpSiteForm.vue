<script setup>
import { reactive, watch, ref, onMounted, computed } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputLabel from '@/Components/InputLabel.vue';
import InputGroup from '@/Components/FormComponents/InputGroup.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import { formatCurrency, formatDecimal } from '@/Utils/formatters';

const props = defineProps({
    site: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['success', 'cancel']);
const page = usePage();

// --- Mode Detection ---
const formMode = computed(() => props.site ? 'edit' : 'create');
const isCreateMode = computed(() => formMode.value === 'create');
const isEditMode = computed(() => formMode.value === 'edit');

// --- Wizard / Tab Configuration ---
const currentStep = ref(0);

const createTabs = [
    { id: 'general', name: 'General Info', icon: 'info' },
    { id: 'estimates', name: 'Initial Estimates', icon: 'payments' },
    { id: 'completion_remarks', name: 'Remarks & Files', icon: 'description' },
];

const editTabs = [
    { id: 'general', name: 'General Info', icon: 'info' },
    { id: 'design_technical', name: 'Design & Capacity', icon: 'bolt' },
    { id: 'physical_components', name: 'Physical Specs', icon: 'construction' },
    { id: 'financial_demographics', name: 'Finances & Timeline', icon: 'calendar_month' },
    { id: 'completion_remarks', name: 'Remarks & Files', icon: 'description' },
];

const activeTabsList = computed(() => isCreateMode.value ? createTabs : editTabs);
const activeTab = computed(() => activeTabsList.value[currentStep.value].id);

const goToStep = (index) => {
    if (index >= 0 && index < activeTabsList.value.length) {
        currentStep.value = index;
    }
};

const nextStep = () => {
    if (currentStep.value < activeTabsList.value.length - 1) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
};

// Options for select inputs
const gridStatusOptions = ['On-Grid', 'Off-Grid', 'Partially on-Grid'];
const siteStatusOptions = ['New', 'Rehabilitation', 'Upgradation'];
const accessibleOptions = ['Yes', 'No'];

const existingAttachments = ref([]);

function getInitialFormData(site) {
    return {
        cbo_id: site ? site.cbo_id : null,
        month_year_establishment: site ? site.month_year_establishment : null,
        established_by: site ? site.established_by : '',
        population: site ? site.population : null,
        grid_status: site ? site.grid_status : 'Off-Grid',
        status: site ? site.status : 'New',

        intake_details: site ? site.intake_details : '',
        settling_basin_details: site ? site.settling_basin_details : '',
        approach_culvert_details: site ? site.approach_culvert_details : '',
        headrace_channel_details: site ? site.headrace_channel_details : '',
        aqueduct_details: site ? site.aqueduct_details : '',
        tailrace_details: site ? site.tailrace_details : '',
        spillway_details: site ? site.spillway_details : '',
        retaining_walls_details: site ? site.retaining_walls_details : '',

        management_committee_date: site ? site.management_committee_date : null,
        opm_shared_date: site ? site.opm_shared_date : null,
        opm_review_meeting_date: site ? site.opm_review_meeting_date : null,
        ta_eu_comments_date: site ? site.ta_eu_comments_date : null,
        eu_approval_meeting_date: site ? site.eu_approval_meeting_date : null,
        
        social_assessment_date: site ? site.social_assessment_date : null,
        opm_visit_date: site ? site.opm_visit_date : null,
        layout_initiation_date: site ? site.layout_initiation_date : null,
        ground_breaking_date: site ? site.ground_breaking_date : null,
        civil_works_cost: site ? site.civil_works_cost : null,

        civil_advertisement_date: site ? site.civil_advertisement_date : null,
        civil_pre_bid_meeting_date: site ? site.civil_pre_bid_meeting_date : null,
        civil_technical_bid_opening_date: site ? site.civil_technical_bid_opening_date : null,
        civil_financial_bid_opening_date: site ? site.civil_financial_bid_opening_date : null,
        civil_contract_award_date: site ? site.civil_contract_award_date : null,
        civil_contractor_amount: site ? site.civil_contractor_amount : null,

        civil_work_initiation_date: site ? site.civil_work_initiation_date : null,
        civil_financial_progress_percent: site ? site.civil_financial_progress_percent : null,
        civil_amount_disbursed: site ? site.civil_amount_disbursed : null,
        civil_amount_remaining: site ? site.civil_amount_remaining : null,
        civil_physical_progress_percent: site ? site.civil_physical_progress_percent : null,
        civil_progress_description: site ? site.civil_progress_description : '',
        civil_completion_date: site ? site.civil_completion_date : null,

        existing_capacity_kw: site ? site.existing_capacity_kw : null,
        planned_capacity_kw: site ? site.planned_capacity_kw : null,
        proposed_capacity_kw: site ? site.proposed_capacity_kw : null,
        head_ft: site ? site.head_ft : null,
        design_net_head: site ? site.design_net_head : null,
        design_discharge_cusecs: site ? site.design_discharge_cusecs : null,
        observed_discharge: site ? site.observed_discharge : null,
        channel_length_km: site ? site.channel_length_km : null,
        tl_ht_km: site ? site.tl_ht_km : null,
        tl_lt_km: site ? site.tl_lt_km : null,
        length_ft: site ? site.length_ft : null,
        bottom_width_ft: site ? site.bottom_width_ft : null,
        design_depth_ft: site ? site.design_depth_ft : null,
        freeboard_ft: site ? site.freeboard_ft : null,
        velocity_ft_per_sec: site ? site.velocity_ft_per_sec : null,
        turbine_type: site ? site.turbine_type : '',
        alternator_type: site ? site.alternator_type : '',
        accessible: site ? site.accessible : '',
        domestic_units: site ? site.domestic_units : null,
        commercial_units: site ? site.commercial_units : null,
        estimated_cost: site ? site.estimated_cost : null,
        per_kw_cost: site ? site.per_kw_cost : null,
        total_hh: site ? site.total_hh : null,
        avg_hh_size: site ? site.avg_hh_size : null,
        cost_per_capita: site ? site.cost_per_capita : null,
        tentative_completion_date: site ? site.tentative_completion_date : null,
        financial_initiation_date: site ? site.financial_initiation_date : null,
        physical_completion_date: site ? site.physical_completion_date : null,
        remarks: site ? site.remarks : '',
        attachments: [],
        attachments_to_delete: [],
    };
}

const form = useForm(getInitialFormData(props.site));

watch(() => props.site, (newSite) => {
    form.defaults(getInitialFormData(newSite));
    form.reset();
    existingAttachments.value = newSite ? newSite.attachments_frontend : [];
    form.clearErrors();
}, { immediate: true });

// --- Computed Calculated Fields ---
const computedPerKwCost = computed(() => {
    const cost = Number(form.estimated_cost || 0);
    const capacity = Number(form.planned_capacity_kw || form.proposed_capacity_kw || 0);
    return capacity > 0 ? cost / capacity : 0;
});

const computedAvgHhSize = computed(() => {
    const population = Number(form.population || 0);
    const households = Number(form.total_hh || 0);
    return households > 0 ? population / households : 0;
});

const computedCostPerCapita = computed(() => {
    const cost = Number(form.estimated_cost || 0);
    const population = Number(form.population || 0);
    return population > 0 ? cost / population : 0;
});

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    // Save computed values to database columns for compatibility
    form.per_kw_cost = computedPerKwCost.value;
    form.avg_hh_size = computedAvgHhSize.value;
    form.cost_per_capita = computedCostPerCapita.value;

    const url = isEditMode.value
        ? route('mhp.sites.update', props.site.id)
        : route('mhp.sites.store');

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
            emit('success', isEditMode.value ? 'MHP Site updated successfully!' : 'MHP Site created successfully!');
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
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        
        <!-- Step Stepper Progress Bar -->
        <div class="border-b border-ink-200 pb-3 bg-paper-50 px-5 pt-3 rounded-t-xl">
            <nav class="flex flex-wrap justify-between items-center gap-3">
                <button
                    v-for="(tab, index) in activeTabsList"
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
                    Step {{ index + 1 }}: {{ tab.name }}
                </button>
            </nav>
        </div>

        <!-- Scrollable content fields grouped into clean cards -->
        <div class="px-5 py-1 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            
            <!-- Step 1: General Information -->
            <div v-if="activeTab === 'general'" class="space-y-4">
                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">info</span>
                        Core MHP Site Registry
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputGroup id="cbo_id" label="Associated CBO" :required="true" :error="form.errors.cbo_id">
                            <SearchableCboSelect
                                id="cbo_id"
                                v-model="form.cbo_id"
                                :initial-cbo-object="site ? site.cbo : null"
                                :class="{ 'border-red-500': form.errors.cbo_id }"
                                class="mt-0.5"
                            />
                        </InputGroup>

                        <InputGroup id="month_year_establishment" label="Month & Year of Establishment" :error="form.errors.month_year_establishment">
                            <DatePicker
                                id="month_year_establishment"
                                v-model="form.month_year_establishment"
                                :class="{ 'border-red-500': form.errors.month_year_establishment }"
                                placeholder="Select Date"
                                class="mt-0.5"
                            />
                        </InputGroup>

                        <InputGroup v-if="form.status !== 'New'" id="established_by" label="Established By" :error="form.errors.established_by">
                            <TextInput
                                id="established_by"
                                v-model="form.established_by"
                                type="text"
                                class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm"
                                :class="{ 'border-red-500': form.errors.established_by }"
                            />
                        </InputGroup>

                        <InputGroup id="population" label="Population Served" :error="form.errors.population">
                            <TextInput
                                id="population"
                                v-model="form.population"
                                type="number"
                                class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm"
                                :class="{ 'border-red-500': form.errors.population }"
                            />
                        </InputGroup>

                        <InputGroup id="grid_status" label="Grid Connection Status" :required="true" :error="form.errors.grid_status">
                            <SelectInput
                                id="grid_status"
                                v-model="form.grid_status"
                                :options="gridStatusOptions"
                                class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm"
                                :class="{ 'border-red-500': form.errors.grid_status }"
                            />
                        </InputGroup>

                        <InputGroup id="status" label="Project Status Type" :required="true" :error="form.errors.status">
                            <SelectInput
                                id="status"
                                v-model="form.status"
                                :options="siteStatusOptions"
                                class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm"
                                :class="{ 'border-red-500': form.errors.status }"
                            />
                        </InputGroup>
                    </div>
                </div>
            </div>

            <!-- Create Mode Tab 2: Initial Estimates -->
            <div v-if="activeTab === 'estimates'" class="space-y-4">
                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">payments</span>
                        Estimates & Capacities
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InputGroup id="planned_capacity_kw" label="Planned Capacity (KW)" :error="form.errors.planned_capacity_kw">
                            <TextInput id="planned_capacity_kw" v-model="form.planned_capacity_kw" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="existing_capacity_kw" label="Existing Capacity (KW)" :error="form.errors.existing_capacity_kw">
                            <TextInput id="existing_capacity_kw" v-model="form.existing_capacity_kw" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="proposed_capacity_kw" label="Proposed Capacity (KW)" :error="form.errors.proposed_capacity_kw">
                            <TextInput id="proposed_capacity_kw" v-model="form.proposed_capacity_kw" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="estimated_cost" label="Estimated Cost (PKR)" :error="form.errors.estimated_cost">
                            <TextInput id="estimated_cost" v-model="form.estimated_cost" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="total_hh" label="Total Households (HH)" :error="form.errors.total_hh">
                            <TextInput id="total_hh" v-model="form.total_hh" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="domestic_units" label="Domestic Connections" :error="form.errors.domestic_units">
                            <TextInput id="domestic_units" v-model="form.domestic_units" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="commercial_units" label="Commercial Connections" :error="form.errors.commercial_units">
                            <TextInput id="commercial_units" v-model="form.commercial_units" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                    </div>
                </div>

                <!-- Automated Calculations Grid -->
                <div class="bg-emerald-50/40 border border-emerald-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">analytics</span>
                        Automated Metrics (Derived)
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <InputLabel value="Calculated Per KW Cost" class="text-xs font-semibold text-emerald-700" />
                            <div class="mt-0.5 block w-full rounded-lg bg-surface border border-emerald-200 py-1.5 px-2.5 text-sm font-semibold text-emerald-900 shadow-sm">
                                {{ formatCurrency(computedPerKwCost) }} / KW
                            </div>
                        </div>
                        <div>
                            <InputLabel value="Calculated Avg Household Size" class="text-xs font-semibold text-emerald-700" />
                            <div class="mt-0.5 block w-full rounded-lg bg-surface border border-emerald-200 py-1.5 px-2.5 text-sm font-semibold text-emerald-900 shadow-sm">
                                {{ formatDecimal(computedAvgHhSize) }} Persons
                            </div>
                        </div>
                        <div>
                            <InputLabel value="Calculated Cost Per Capita" class="text-xs font-semibold text-emerald-700" />
                            <div class="mt-0.5 block w-full rounded-lg bg-surface border border-emerald-200 py-1.5 px-2.5 text-sm font-semibold text-emerald-900 shadow-sm">
                                {{ formatCurrency(computedCostPerCapita) }} / Person
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Edit Mode: Design & Capacity Specs (Step 2) -->
            <div v-if="activeTab === 'design_technical' && isEditMode" class="space-y-4">
                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">bolt</span>
                        Technical Specifications & Discharge
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InputGroup id="planned_capacity_kw" label="Planned Capacity (KW)" :error="form.errors.planned_capacity_kw">
                            <TextInput id="planned_capacity_kw" v-model="form.planned_capacity_kw" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="existing_capacity_kw" label="Existing Capacity (KW)" :error="form.errors.existing_capacity_kw">
                            <TextInput id="existing_capacity_kw" v-model="form.existing_capacity_kw" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="proposed_capacity_kw" label="Proposed Capacity (KW)" :error="form.errors.proposed_capacity_kw">
                            <TextInput id="proposed_capacity_kw" v-model="form.proposed_capacity_kw" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup
                            id="head_ft"
                            label="Water Drop (Head FT)"
                            help="Total vertical drop height of water in Feet."
                            :error="form.errors.head_ft"
                        >
                            <TextInput id="head_ft" v-model="form.head_ft" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="design_net_head" label="Design Net Head (FT)" :error="form.errors.design_net_head">
                            <TextInput id="design_net_head" v-model="form.design_net_head" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup
                            id="design_discharge_cusecs"
                            label="Flow Rate (Discharge)"
                            help="Calculated in Cubic Feet per Second (Cusecs)."
                            :error="form.errors.design_discharge_cusecs"
                        >
                            <TextInput id="design_discharge_cusecs" v-model="form.design_discharge_cusecs" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="observed_discharge" label="Observed Discharge" :error="form.errors.observed_discharge">
                            <TextInput id="observed_discharge" v-model="form.observed_discharge" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="channel_length_km" label="Channel Length (KM)" :error="form.errors.channel_length_km">
                            <TextInput id="channel_length_km" v-model="form.channel_length_km" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup
                            id="tl_ht_km"
                            label="TL HT (KM)"
                            help="TL HT means Transmission Line High-Tension length — the length of the high-voltage transmission line in kilometres."
                            :error="form.errors.tl_ht_km"
                        >
                            <TextInput id="tl_ht_km" v-model="form.tl_ht_km" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup
                            id="tl_lt_km"
                            label="TL LT (KM)"
                            help="TL LT means Transmission Line Low-Tension length — the length of the low-voltage transmission line in kilometres."
                            :error="form.errors.tl_lt_km"
                        >
                            <TextInput id="tl_lt_km" v-model="form.tl_lt_km" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="turbine_type" label="Turbine Type" :error="form.errors.turbine_type">
                            <TextInput id="turbine_type" v-model="form.turbine_type" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="alternator_type" label="Alternator Type" :error="form.errors.alternator_type">
                            <TextInput id="alternator_type" v-model="form.alternator_type" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="accessible" label="Site Accessibility" :error="form.errors.accessible">
                            <SelectInput id="accessible" v-model="form.accessible" :options="accessibleOptions" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                    </div>
                </div>

                <!-- Channel Dimensions -->
                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">straighten</span>
                        Channel Dimension Parameters
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <InputGroup id="length_ft" label="Length (FT)" :error="form.errors.length_ft">
                            <TextInput id="length_ft" v-model="form.length_ft" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="bottom_width_ft" label="Bottom Width (FT)" :error="form.errors.bottom_width_ft">
                            <TextInput id="bottom_width_ft" v-model="form.bottom_width_ft" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="design_depth_ft" label="Design Depth (FT)" :error="form.errors.design_depth_ft">
                            <TextInput id="design_depth_ft" v-model="form.design_depth_ft" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="freeboard_ft" label="Freeboard (FT)" :error="form.errors.freeboard_ft">
                            <TextInput id="freeboard_ft" v-model="form.freeboard_ft" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="velocity_ft_per_sec" label="Velocity (FT/sec)" :error="form.errors.velocity_ft_per_sec">
                            <TextInput id="velocity_ft_per_sec" v-model="form.velocity_ft_per_sec" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                    </div>
                </div>
            </div>

            <!-- Edit Mode: Physical components (Step 3) -->
            <div v-if="activeTab === 'physical_components' && isEditMode" class="space-y-4">
                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">home_repair_service</span>
                        Intake & Channel Layout
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup id="intake_details" label="Intake Structure Details" :error="form.errors.intake_details">
                            <TextArea id="intake_details" v-model="form.intake_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                        </InputGroup>
                        <InputGroup id="settling_basin_details" label="Settling Basin Details" :error="form.errors.settling_basin_details">
                            <TextArea id="settling_basin_details" v-model="form.settling_basin_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                        </InputGroup>
                        <InputGroup id="approach_culvert_details" label="Approach Culvert Details" :error="form.errors.approach_culvert_details">
                            <TextArea id="approach_culvert_details" v-model="form.approach_culvert_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                        </InputGroup>
                        <InputGroup id="headrace_channel_details" label="Headrace Channel Details" :error="form.errors.headrace_channel_details">
                            <TextArea id="headrace_channel_details" v-model="form.headrace_channel_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                        </InputGroup>
                    </div>
                </div>

                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">water_damage</span>
                        Outflow & Retaining Components
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup id="aqueduct_details" label="Aqueduct & Crossing Details" :error="form.errors.aqueduct_details">
                            <TextArea id="aqueduct_details" v-model="form.aqueduct_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                        </InputGroup>
                        <InputGroup id="tailrace_details" label="Tailrace Channel Details" :error="form.errors.tailrace_details">
                            <TextArea id="tailrace_details" v-model="form.tailrace_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                        </InputGroup>
                        <InputGroup id="spillway_details" label="Spillway Details" :error="form.errors.spillway_details">
                            <TextArea id="spillway_details" v-model="form.spillway_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                        </InputGroup>
                        <InputGroup id="retaining_walls_details" label="Retaining Walls Details" :error="form.errors.retaining_walls_details">
                            <TextArea id="retaining_walls_details" v-model="form.retaining_walls_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                        </InputGroup>
                    </div>
                </div>
            </div>

            <!-- Edit Mode: Finances & Timeline Specs (Step 4) -->
            <div v-if="activeTab === 'financial_demographics' && isEditMode" class="space-y-4">
                <!-- Finances & Timelines -->
                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">monetization_on</span>
                        Budgets & Key Execution Dates
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <InputGroup id="estimated_cost" label="Estimated Cost (PKR)" :error="form.errors.estimated_cost">
                            <TextInput id="estimated_cost" v-model="form.estimated_cost" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="total_hh" label="Total Households (HH)" :error="form.errors.total_hh">
                            <TextInput id="total_hh" v-model="form.total_hh" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="domestic_units" label="Domestic Connections" :error="form.errors.domestic_units">
                            <TextInput id="domestic_units" v-model="form.domestic_units" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="commercial_units" label="Commercial Connections" :error="form.errors.commercial_units">
                            <TextInput id="commercial_units" v-model="form.commercial_units" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="tentative_completion_date" label="Tentative Completion" :error="form.errors.tentative_completion_date">
                            <DatePicker id="tentative_completion_date" v-model="form.tentative_completion_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="financial_initiation_date" label="Financial Initiation Date" :error="form.errors.financial_initiation_date">
                            <DatePicker id="financial_initiation_date" v-model="form.financial_initiation_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="physical_completion_date" label="Physical Completion Date" :error="form.errors.physical_completion_date">
                            <DatePicker id="physical_completion_date" v-model="form.physical_completion_date" class="mt-0.5" />
                        </InputGroup>
                    </div>
                </div>

                <!-- Derived metrics -->
                <div class="bg-emerald-50/40 border border-emerald-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">analytics</span>
                        Automated Metrics (Derived)
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <InputLabel value="Calculated Per KW Cost" class="text-xs font-semibold text-emerald-700" />
                            <div class="mt-0.5 block w-full rounded-lg bg-surface border border-emerald-200 py-1.5 px-2.5 text-sm font-semibold text-emerald-900 shadow-sm">
                                {{ formatCurrency(computedPerKwCost) }} / KW
                            </div>
                        </div>
                        <div>
                            <InputLabel value="Calculated Avg Household Size" class="text-xs font-semibold text-emerald-700" />
                            <div class="mt-0.5 block w-full rounded-lg bg-surface border border-emerald-200 py-1.5 px-2.5 text-sm font-semibold text-emerald-900 shadow-sm">
                                {{ formatDecimal(computedAvgHhSize) }} Persons
                            </div>
                        </div>
                        <div>
                            <InputLabel value="Calculated Cost Per Capita" class="text-xs font-semibold text-emerald-700" />
                            <div class="mt-0.5 block w-full rounded-lg bg-surface border border-emerald-200 py-1.5 px-2.5 text-sm font-semibold text-emerald-900 shadow-sm">
                                {{ formatCurrency(computedCostPerCapita) }} / Person
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Approval Milestones -->
                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">task_alt</span>
                        Approval Milestones
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InputGroup id="management_committee_date" label="Management Committee" :error="form.errors.management_committee_date">
                            <DatePicker id="management_committee_date" v-model="form.management_committee_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup
                            id="opm_shared_date"
                            label="OPM Shared Date"
                            help="OPM means Office of the Prime Minister — the date this site's information was shared with the OPM."
                            :error="form.errors.opm_shared_date"
                        >
                            <DatePicker id="opm_shared_date" v-model="form.opm_shared_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup
                            id="opm_review_meeting_date"
                            label="OPM Review Meeting"
                            help="OPM means Office of the Prime Minister — the date of the OPM's review meeting for this site."
                            :error="form.errors.opm_review_meeting_date"
                        >
                            <DatePicker id="opm_review_meeting_date" v-model="form.opm_review_meeting_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup
                            id="ta_eu_comments_date"
                            label="TA EU Comments Date"
                            help="TA EU means Technical Assistance / European Union — the date the TA/EU team's comments on this site were received."
                            :error="form.errors.ta_eu_comments_date"
                        >
                            <DatePicker id="ta_eu_comments_date" v-model="form.ta_eu_comments_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="eu_approval_meeting_date" label="EU Approval Meeting" :error="form.errors.eu_approval_meeting_date">
                            <DatePicker id="eu_approval_meeting_date" v-model="form.eu_approval_meeting_date" class="mt-0.5" />
                        </InputGroup>
                    </div>
                </div>

                <!-- Civil Procurement -->
                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">gavel</span>
                        Civil Procurement & Contracting
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InputGroup id="social_assessment_date" label="Social Assessment Date" :error="form.errors.social_assessment_date">
                            <DatePicker id="social_assessment_date" v-model="form.social_assessment_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup
                            id="opm_visit_date"
                            label="OPM Visit Date"
                            help="OPM means Office of the Prime Minister — the date of the OPM's site visit."
                            :error="form.errors.opm_visit_date"
                        >
                            <DatePicker id="opm_visit_date" v-model="form.opm_visit_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="layout_initiation_date" label="Layout Initiation Date" :error="form.errors.layout_initiation_date">
                            <DatePicker id="layout_initiation_date" v-model="form.layout_initiation_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="ground_breaking_date" label="Ground Breaking Date" :error="form.errors.ground_breaking_date">
                            <DatePicker id="ground_breaking_date" v-model="form.ground_breaking_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="civil_works_cost" label="Civil Works Cost (PKR)" :error="form.errors.civil_works_cost">
                            <TextInput id="civil_works_cost" v-model="form.civil_works_cost" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="civil_advertisement_date" label="Civil Advertisement Date" :error="form.errors.civil_advertisement_date">
                            <DatePicker id="civil_advertisement_date" v-model="form.civil_advertisement_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="civil_pre_bid_meeting_date" label="Pre-Bid Meeting Date" :error="form.errors.civil_pre_bid_meeting_date">
                            <DatePicker id="civil_pre_bid_meeting_date" v-model="form.civil_pre_bid_meeting_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="civil_technical_bid_opening_date" label="Technical Bid Opening" :error="form.errors.civil_technical_bid_opening_date">
                            <DatePicker id="civil_technical_bid_opening_date" v-model="form.civil_technical_bid_opening_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="civil_financial_bid_opening_date" label="Financial Bid Opening" :error="form.errors.civil_financial_bid_opening_date">
                            <DatePicker id="civil_financial_bid_opening_date" v-model="form.civil_financial_bid_opening_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="civil_contract_award_date" label="Contract Award Date" :error="form.errors.civil_contract_award_date">
                            <DatePicker id="civil_contract_award_date" v-model="form.civil_contract_award_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="civil_contractor_amount" label="Contractor Amount (PKR)" :error="form.errors.civil_contractor_amount">
                            <TextInput id="civil_contractor_amount" v-model="form.civil_contractor_amount" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                    </div>
                </div>

                <!-- Civil Works Progress -->
                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">running_with_errors</span>
                        Civil Works Progress Logs
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InputGroup id="civil_work_initiation_date" label="Civil Work Initiation" :error="form.errors.civil_work_initiation_date">
                            <DatePicker id="civil_work_initiation_date" v-model="form.civil_work_initiation_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="civil_completion_date" label="Physical Work Completion" :error="form.errors.civil_completion_date">
                            <DatePicker id="civil_completion_date" v-model="form.civil_completion_date" class="mt-0.5" />
                        </InputGroup>
                        <InputGroup id="civil_financial_progress_percent" label="Financial Progress (%)" :error="form.errors.civil_financial_progress_percent">
                            <TextInput id="civil_financial_progress_percent" v-model="form.civil_financial_progress_percent" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="civil_amount_disbursed" label="Amount Disbursed (PKR)" :error="form.errors.civil_amount_disbursed">
                            <TextInput id="civil_amount_disbursed" v-model="form.civil_amount_disbursed" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="civil_amount_remaining" label="Remaining Amount (PKR)" :error="form.errors.civil_amount_remaining">
                            <TextInput id="civil_amount_remaining" v-model="form.civil_amount_remaining" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="civil_physical_progress_percent" label="Physical Progress (%)" :error="form.errors.civil_physical_progress_percent">
                            <TextInput id="civil_physical_progress_percent" v-model="form.civil_physical_progress_percent" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                        </InputGroup>
                        <InputGroup id="civil_progress_description" label="Progress Description Details" class="col-span-2 md:col-span-4" :error="form.errors.civil_progress_description">
                            <TextArea id="civil_progress_description" v-model="form.civil_progress_description" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                        </InputGroup>
                    </div>
                </div>
            </div>

            <!-- Step 5 (Create Step 3): Remarks & Files -->
            <div v-if="activeTab === 'completion_remarks'" class="space-y-4">
                <div class="bg-paper-50 border border-ink-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">attachment</span>
                        Attachments & Executive Summary Remarks
                    </h4>
                    <div class="space-y-4">
                        <InputGroup id="remarks" label="Executive / Summary Remarks" :error="form.errors.remarks">
                            <WysiwygEditor
                                id="remarks"
                                v-model="form.remarks"
                                :class="{ 'border-red-500': form.errors.remarks }"
                                :height="150"
                            />
                        </InputGroup>

                        <InputGroup label="Upload Attachment Documents" :error="form.errors.attachments">
                            <AttachmentUploader
                                v-model="form.attachments"
                                :existing-attachments="existingAttachments"
                                @remove-existing="handleAttachmentsToDelete"
                                :error-message="form.errors.attachments"
                            />
                        </InputGroup>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footnote Navigation Actions -->
        <div class="px-5 py-3 bg-paper-50 border-t border-ink-200 rounded-b-xl flex justify-between items-center shrink-0">
            <div>
                <button
                    type="button"
                    @click="handleCancel"
                    class="inline-flex items-center px-3.5 py-1.5 bg-paper-200 border border-transparent rounded-lg font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-300 focus:bg-paper-300 active:bg-paper-400 focus:outline-none transition"
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
                    class="inline-flex items-center px-3.5 py-1.5 bg-surface border border-ink-300 rounded-lg font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-50 focus:outline-none transition shadow-sm"
                >
                    <span class="material-symbols-outlined text-[12px] mr-1">arrow_back</span>
                    Back
                </button>

                <!-- Next Button -->
                <button
                    v-if="currentStep < activeTabsList.length - 1"
                    type="button"
                    @click="nextStep"
                    class="inline-flex items-center px-3.5 py-1.5 bg-emerald-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 active:bg-emerald-800 focus:outline-none transition shadow-sm"
                >
                    Next
                    <span class="material-symbols-outlined text-[12px] ml-1">arrow_forward</span>
                </button>

                <!-- Submit Button -->
                <PrimaryButton 
                    v-if="currentStep === activeTabsList.length - 1"
                    :class="['bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm rounded-lg px-3.5 py-1.5 text-xs', { 'opacity-25': form.processing }]" 
                    :disabled="form.processing"
                >
                    {{ isEditMode ? 'Update Site' : 'Create Site' }}
                </PrimaryButton>
            </div>
        </div>
    </form>
</template>

<style scoped>
/* Responsive details inputs */
input, select, textarea {
    @apply focus:ring-emerald-500 focus:border-emerald-500;
}
</style>
