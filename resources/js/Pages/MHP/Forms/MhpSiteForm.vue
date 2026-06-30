<script setup>
import { reactive, watch, ref, onMounted, computed } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';

const props = defineProps({
    site: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['success', 'cancel']);
const page = usePage();

// --- Wizard / Tab Configuration ---
const currentStep = ref(0);
const tabs = [
    { id: 'general', name: 'General Info', icon: 'info' },
    { id: 'design_technical', name: 'Design & Capacity', icon: 'bolt' },
    { id: 'physical_components', name: 'Physical Specs', icon: 'construction' },
    { id: 'financial_demographics', name: 'Finances & Timeline', icon: 'calendar_month' },
    { id: 'completion_remarks', name: 'Remarks & Files', icon: 'description' },
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

// Options for select inputs
const gridStatusOptions = ['On-Grid', 'Off-Grid', 'Partially on-Grid'];
const siteStatusOptions = ['New', 'Rehabilitation', 'Upgradation'];
const accessibleOptions = ['Yes', 'No'];

const isEditMode = ref(!!props.site);
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
    isEditMode.value = !!newSite;
    form.defaults(getInitialFormData(newSite));
    form.reset();
    existingAttachments.value = newSite ? newSite.attachments_frontend : [];
    form.clearErrors();
}, { immediate: true });

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
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
        <div class="border-b border-gray-200 pb-3 bg-gray-50 px-5 pt-3 rounded-t-xl">
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
                                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100'
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
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">info</span>
                        Core MHP Site Registry
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <InputLabel for="cbo_id" value="Associated CBO" class="text-xs font-semibold text-gray-600" />
                            <SearchableCboSelect
                                id="cbo_id"
                                v-model="form.cbo_id"
                                :initial-cbo-object="site ? site.cbo : null"
                                :class="{ 'border-red-500': form.errors.cbo_id }"
                                class="mt-0.5"
                            />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.cbo_id" />
                        </div>

                        <div>
                            <InputLabel for="month_year_establishment" value="Month & Year of Establishment" class="text-xs font-semibold text-gray-600" />
                            <DatePicker
                                id="month_year_establishment"
                                v-model="form.month_year_establishment"
                                :class="{ 'border-red-500': form.errors.month_year_establishment }"
                                placeholder="Select Date"
                                class="mt-0.5"
                            />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.month_year_establishment" />
                        </div>

                        <div v-if="form.status !== 'New'">
                            <InputLabel for="established_by" value="Established By" class="text-xs font-semibold text-gray-600" />
                            <TextInput
                                id="established_by"
                                v-model="form.established_by"
                                type="text"
                                class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm"
                                :class="{ 'border-red-500': form.errors.established_by }"
                            />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.established_by" />
                        </div>

                        <div>
                            <InputLabel for="population" value="Population Served" class="text-xs font-semibold text-gray-600" />
                            <TextInput
                                id="population"
                                v-model="form.population"
                                type="number"
                                class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm"
                                :class="{ 'border-red-500': form.errors.population }"
                            />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.population" />
                        </div>

                        <div>
                            <InputLabel for="grid_status" value="Grid Connection Status" class="text-xs font-semibold text-gray-600" />
                            <SelectInput
                                id="grid_status"
                                v-model="form.grid_status"
                                :options="gridStatusOptions"
                                class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm"
                                :class="{ 'border-red-500': form.errors.grid_status }"
                            />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.grid_status" />
                        </div>

                        <div>
                            <InputLabel for="status" value="Project Status Type" class="text-xs font-semibold text-gray-600" />
                            <SelectInput
                                id="status"
                                v-model="form.status"
                                :options="siteStatusOptions"
                                class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm"
                                :class="{ 'border-red-500': form.errors.status }"
                            />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.status" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 2: Design & Capacity -->
            <div v-if="activeTab === 'design_technical'" class="space-y-4">
                <!-- Capacity Specs -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">bolt</span>
                        Technical Specifications & Discharge
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <InputLabel for="planned_capacity_kw" value="Planned Capacity (KW)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="planned_capacity_kw" v-model="form.planned_capacity_kw" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.planned_capacity_kw" />
                        </div>
                        <div>
                            <InputLabel for="existing_capacity_kw" value="Existing Capacity (KW)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="existing_capacity_kw" v-model="form.existing_capacity_kw" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.existing_capacity_kw" />
                        </div>
                        <div>
                            <InputLabel for="proposed_capacity_kw" value="Proposed Capacity (KW)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="proposed_capacity_kw" v-model="form.proposed_capacity_kw" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.proposed_capacity_kw" />
                        </div>
                        <div>
                            <div class="flex items-center gap-1">
                                <InputLabel for="head_ft" value="Water Drop (Head FT)" class="text-xs font-semibold text-gray-600" />
                                <span class="material-symbols-outlined text-[10px] text-gray-400 cursor-help" title="Total vertical drop height of water in Feet.">info</span>
                            </div>
                            <TextInput id="head_ft" v-model="form.head_ft" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.head_ft" />
                        </div>
                        <div>
                            <InputLabel for="design_net_head" value="Design Net Head (FT)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="design_net_head" v-model="form.design_net_head" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.design_net_head" />
                        </div>
                        <div>
                            <div class="flex items-center gap-1">
                                <InputLabel for="design_discharge_cusecs" value="Flow Rate (Discharge)" class="text-xs font-semibold text-gray-600" />
                                <span class="material-symbols-outlined text-[10px] text-gray-400 cursor-help" title="Calculated in Cubic Feet per Second (Cusecs).">info</span>
                            </div>
                            <TextInput id="design_discharge_cusecs" v-model="form.design_discharge_cusecs" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.design_discharge_cusecs" />
                        </div>
                        <div>
                            <InputLabel for="observed_discharge" value="Observed Discharge" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="observed_discharge" v-model="form.observed_discharge" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.observed_discharge" />
                        </div>
                        <div>
                            <InputLabel for="channel_length_km" value="Channel Length (KM)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="channel_length_km" v-model="form.channel_length_km" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.channel_length_km" />
                        </div>
                        <div>
                            <InputLabel for="tl_ht_km" value="TL HT (KM)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="tl_ht_km" v-model="form.tl_ht_km" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.tl_ht_km" />
                        </div>
                        <div>
                            <InputLabel for="tl_lt_km" value="TL LT (KM)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="tl_lt_km" v-model="form.tl_lt_km" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.tl_lt_km" />
                        </div>
                        <div>
                            <InputLabel for="turbine_type" value="Turbine Type" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="turbine_type" v-model="form.turbine_type" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.turbine_type" />
                        </div>
                        <div>
                            <InputLabel for="alternator_type" value="Alternator Type" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="alternator_type" v-model="form.alternator_type" type="text" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.alternator_type" />
                        </div>
                        <div>
                            <InputLabel for="accessible" value="Site Accessibility" class="text-xs font-semibold text-gray-600" />
                            <SelectInput id="accessible" v-model="form.accessible" :options="accessibleOptions" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.accessible" />
                        </div>
                    </div>
                </div>

                <!-- Channel Dimensions -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">straighten</span>
                        Channel Dimension Parameters
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                            <InputLabel for="length_ft" value="Length (FT)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="length_ft" v-model="form.length_ft" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.length_ft" />
                        </div>
                        <div>
                            <InputLabel for="bottom_width_ft" value="Bottom Width (FT)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="bottom_width_ft" v-model="form.bottom_width_ft" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.bottom_width_ft" />
                        </div>
                        <div>
                            <InputLabel for="design_depth_ft" value="Design Depth (FT)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="design_depth_ft" v-model="form.design_depth_ft" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.design_depth_ft" />
                        </div>
                        <div>
                            <InputLabel for="freeboard_ft" value="Freeboard (FT)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="freeboard_ft" v-model="form.freeboard_ft" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.freeboard_ft" />
                        </div>
                        <div>
                            <InputLabel for="velocity_ft_per_sec" value="Velocity (FT/sec)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="velocity_ft_per_sec" v-model="form.velocity_ft_per_sec" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.velocity_ft_per_sec" />
                        </div>
                    </div>
                </div>

                <!-- Demographics -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">group</span>
                        Demographic Coverage
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <InputLabel for="domestic_units" value="Domestic Units" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="domestic_units" v-model="form.domestic_units" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.domestic_units" />
                        </div>
                        <div>
                            <InputLabel for="commercial_units" value="Commercial Units" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="commercial_units" v-model="form.commercial_units" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.commercial_units" />
                        </div>
                        <div>
                            <InputLabel for="total_hh" value="Total Households (HH)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="total_hh" v-model="form.total_hh" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.total_hh" />
                        </div>
                        <div>
                            <InputLabel for="avg_hh_size" value="Average HH Size" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="avg_hh_size" v-model="form.avg_hh_size" type="number" step="0.1" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.avg_hh_size" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 3: Physical Components -->
            <div v-if="activeTab === 'physical_components'" class="space-y-4">
                <!-- Civil Infrastructure Details -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">home_repair_service</span>
                        Intake & Channel Layout
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel for="intake_details" value="Intake Structure Details" class="text-xs font-semibold text-gray-600" />
                            <TextArea id="intake_details" v-model="form.intake_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.intake_details" />
                        </div>
                        <div>
                            <InputLabel for="settling_basin_details" value="Settling Basin Details" class="text-xs font-semibold text-gray-600" />
                            <TextArea id="settling_basin_details" v-model="form.settling_basin_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.settling_basin_details" />
                        </div>
                        <div>
                            <InputLabel for="approach_culvert_details" value="Approach Culvert Details" class="text-xs font-semibold text-gray-600" />
                            <TextArea id="approach_culvert_details" v-model="form.approach_culvert_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.approach_culvert_details" />
                        </div>
                        <div>
                            <InputLabel for="headrace_channel_details" value="Headrace Channel Details" class="text-xs font-semibold text-gray-600" />
                            <TextArea id="headrace_channel_details" v-model="form.headrace_channel_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.headrace_channel_details" />
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">water_damage</span>
                        Outflow & Retaining Components
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel for="aqueduct_details" value="Aqueduct & Crossing Details" class="text-xs font-semibold text-gray-600" />
                            <TextArea id="aqueduct_details" v-model="form.aqueduct_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.aqueduct_details" />
                        </div>
                        <div>
                            <InputLabel for="tailrace_details" value="Tailrace Channel Details" class="text-xs font-semibold text-gray-600" />
                            <TextArea id="tailrace_details" v-model="form.tailrace_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.tailrace_details" />
                        </div>
                        <div>
                            <InputLabel for="spillway_details" value="Spillway Details" class="text-xs font-semibold text-gray-600" />
                            <TextArea id="spillway_details" v-model="form.spillway_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.spillway_details" />
                        </div>
                        <div>
                            <InputLabel for="retaining_walls_details" value="Retaining Walls Details" class="text-xs font-semibold text-gray-600" />
                            <TextArea id="retaining_walls_details" v-model="form.retaining_walls_details" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.retaining_walls_details" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 4: Finances & Timeline -->
            <div v-if="activeTab === 'financial_demographics'" class="space-y-4">
                <!-- Finances & Timelines -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">monetization_on</span>
                        Budgets & Key Execution Dates
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <InputLabel for="estimated_cost" value="Estimated Cost (PKR)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="estimated_cost" v-model="form.estimated_cost" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.estimated_cost" />
                        </div>
                        <div>
                            <InputLabel for="per_kw_cost" value="Per KW Cost (PKR)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="per_kw_cost" v-model="form.per_kw_cost" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.per_kw_cost" />
                        </div>
                        <div>
                            <InputLabel for="cost_per_capita" value="Cost Per Capita (PKR)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="cost_per_capita" v-model="form.cost_per_capita" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.cost_per_capita" />
                        </div>
                        <div>
                            <InputLabel for="tentative_completion_date" value="Tentative Completion" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="tentative_completion_date" v-model="form.tentative_completion_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.tentative_completion_date" />
                        </div>
                        <div>
                            <InputLabel for="financial_initiation_date" value="Financial Initiation Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="financial_initiation_date" v-model="form.financial_initiation_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.financial_initiation_date" />
                        </div>
                        <div>
                            <InputLabel for="physical_completion_date" value="Physical Completion Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="physical_completion_date" v-model="form.physical_completion_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.physical_completion_date" />
                        </div>
                    </div>
                </div>

                <!-- Approval Milestones -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">task_alt</span>
                        Approval Milestones
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <InputLabel for="management_committee_date" value="Management Committee" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="management_committee_date" v-model="form.management_committee_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.management_committee_date" />
                        </div>
                        <div>
                            <InputLabel for="opm_shared_date" value="OPM Shared Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="opm_shared_date" v-model="form.opm_shared_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.opm_shared_date" />
                        </div>
                        <div>
                            <InputLabel for="opm_review_meeting_date" value="OPM Review Meeting" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="opm_review_meeting_date" v-model="form.opm_review_meeting_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.opm_review_meeting_date" />
                        </div>
                        <div>
                            <InputLabel for="ta_eu_comments_date" value="TA EU Comments Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="ta_eu_comments_date" v-model="form.ta_eu_comments_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.ta_eu_comments_date" />
                        </div>
                        <div>
                            <InputLabel for="eu_approval_meeting_date" value="EU Approval Meeting" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="eu_approval_meeting_date" v-model="form.eu_approval_meeting_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.eu_approval_meeting_date" />
                        </div>
                    </div>
                </div>

                <!-- Civil Procurement -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">gavel</span>
                        Civil Procurement & Contracting
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <InputLabel for="social_assessment_date" value="Social Assessment Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="social_assessment_date" v-model="form.social_assessment_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.social_assessment_date" />
                        </div>
                        <div>
                            <InputLabel for="opm_visit_date" value="OPM Visit Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="opm_visit_date" v-model="form.opm_visit_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.opm_visit_date" />
                        </div>
                        <div>
                            <InputLabel for="layout_initiation_date" value="Layout Initiation Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="layout_initiation_date" v-model="form.layout_initiation_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.layout_initiation_date" />
                        </div>
                        <div>
                            <InputLabel for="ground_breaking_date" value="Ground Breaking Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="ground_breaking_date" v-model="form.ground_breaking_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.ground_breaking_date" />
                        </div>
                        <div>
                            <InputLabel for="civil_works_cost" value="Civil Works Cost (PKR)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="civil_works_cost" v-model="form.civil_works_cost" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_works_cost" />
                        </div>
                        <div>
                            <InputLabel for="civil_advertisement_date" value="Civil Advertisement Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="civil_advertisement_date" v-model="form.civil_advertisement_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_advertisement_date" />
                        </div>
                        <div>
                            <InputLabel for="civil_pre_bid_meeting_date" value="Pre-Bid Meeting Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="civil_pre_bid_meeting_date" v-model="form.civil_pre_bid_meeting_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_pre_bid_meeting_date" />
                        </div>
                        <div>
                            <InputLabel for="civil_technical_bid_opening_date" value="Technical Bid Opening" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="civil_technical_bid_opening_date" v-model="form.civil_technical_bid_opening_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_technical_bid_opening_date" />
                        </div>
                        <div>
                            <InputLabel for="civil_financial_bid_opening_date" value="Financial Bid Opening" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="civil_financial_bid_opening_date" v-model="form.civil_financial_bid_opening_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_financial_bid_opening_date" />
                        </div>
                        <div>
                            <InputLabel for="civil_contract_award_date" value="Contract Award Date" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="civil_contract_award_date" v-model="form.civil_contract_award_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_contract_award_date" />
                        </div>
                        <div>
                            <InputLabel for="civil_contractor_amount" value="Contractor Amount (PKR)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="civil_contractor_amount" v-model="form.civil_contractor_amount" type="number" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_contractor_amount" />
                        </div>
                    </div>
                </div>

                <!-- Civil Works Progress -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">running_with_errors</span>
                        Civil Works Progress Logs
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <InputLabel for="civil_work_initiation_date" value="Civil Work Initiation" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="civil_work_initiation_date" v-model="form.civil_work_initiation_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_work_initiation_date" />
                        </div>
                        <div>
                            <InputLabel for="civil_completion_date" value="Physical Work Completion" class="text-xs font-semibold text-gray-600" />
                            <DatePicker id="civil_completion_date" v-model="form.civil_completion_date" class="mt-0.5" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_completion_date" />
                        </div>
                        <div>
                            <InputLabel for="civil_financial_progress_percent" value="Financial Progress (%)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="civil_financial_progress_percent" v-model="form.civil_financial_progress_percent" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_financial_progress_percent" />
                        </div>
                        <div>
                            <InputLabel for="civil_amount_disbursed" value="Amount Disbursed (PKR)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="civil_amount_disbursed" v-model="form.civil_amount_disbursed" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_amount_disbursed" />
                        </div>
                        <div>
                            <InputLabel for="civil_amount_remaining" value="Remaining Amount (PKR)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="civil_amount_remaining" v-model="form.civil_amount_remaining" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_amount_remaining" />
                        </div>
                        <div>
                            <InputLabel for="civil_physical_progress_percent" value="Physical Progress (%)" class="text-xs font-semibold text-gray-600" />
                            <TextInput id="civil_physical_progress_percent" v-model="form.civil_physical_progress_percent" type="number" step="0.01" class="mt-0.5 block w-full rounded-lg py-1 px-2.5 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_physical_progress_percent" />
                        </div>
                        <div class="col-span-2 md:col-span-4">
                            <InputLabel for="civil_progress_description" value="Progress Description Details" class="text-xs font-semibold text-gray-600" />
                            <TextArea id="civil_progress_description" v-model="form.civil_progress_description" rows="2" class="mt-0.5 block w-full rounded-lg py-1 px-2 text-sm" />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.civil_progress_description" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 5: Remarks & Files -->
            <div v-if="activeTab === 'completion_remarks'" class="space-y-4">
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                    <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">attachment</span>
                        Attachments & Executive Summary Remarks
                    </h4>
                    <div class="space-y-4">
                        <div>
                            <InputLabel for="remarks" value="Executive / Summary Remarks" class="text-xs font-semibold text-gray-600" />
                            <WysiwygEditor
                                id="remarks"
                                v-model="form.remarks"
                                :class="{ 'border-red-500': form.errors.remarks }"
                                :height="150"
                            />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.remarks" />
                        </div>

                        <div>
                            <InputLabel value="Upload Attachment Documents" class="text-xs font-semibold text-gray-600 mb-1" />
                            <AttachmentUploader
                                v-model="form.attachments"
                                :existing-attachments="existingAttachments"
                                @remove-existing="handleAttachmentsToDelete"
                                :error-message="form.errors.attachments"
                            />
                            <InputError class="mt-0.5 text-xs" :message="form.errors.attachments" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footnote Navigation Actions -->
        <div class="px-5 py-3 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-between items-center shrink-0">
            <div>
                <button
                    type="button"
                    @click="handleCancel"
                    class="inline-flex items-center px-3.5 py-1.5 bg-gray-200 border border-transparent rounded-lg font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none transition"
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
                    class="inline-flex items-center px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-50 focus:outline-none transition shadow-sm"
                >
                    <span class="material-symbols-outlined text-[12px] mr-1">arrow_back</span>
                    Back
                </button>

                <!-- Next Button -->
                <button
                    v-if="currentStep < tabs.length - 1"
                    type="button"
                    @click="nextStep"
                    class="inline-flex items-center px-3.5 py-1.5 bg-emerald-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 active:bg-emerald-800 focus:outline-none transition shadow-sm"
                >
                    Next
                    <span class="material-symbols-outlined text-[12px] ml-1">arrow_forward</span>
                </button>

                <!-- Submit Button -->
                <PrimaryButton 
                    v-if="currentStep === tabs.length - 1"
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
