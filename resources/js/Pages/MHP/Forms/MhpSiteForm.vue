<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue'; // Ensure TextArea is imported
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue'; // Assuming WysiwygEditor is now TipTap based


const props = defineProps({
    site: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
});

const emit = defineEmits(['success', 'cancel']);

const page = usePage();

// --- Tab State ---
const activeTab = ref('general'); // Default active tab

const tabs = [
    { id: 'general', name: 'General Info' },
    { id: 'design_technical', name: 'Design & Technical' },
    { id: 'physical_components', name: 'Physical Components' },
    { id: 'financial_demographics', name: 'Financials & Demographics' },
    { id: 'completion_remarks', name: 'Completion & Remarks' },
];

// Options for select inputs
const gridStatusOptions = ['On-Grid', 'Off-Grid', 'Partially on-Grid'];
const siteStatusOptions = ['New', 'Rehabilitation', 'Upgradation'];
const accessibleOptions = ['Yes', 'No'];

const isEditMode = ref(!!props.site);
const existingAttachments = ref([]); // Initialized as empty array, filled by watcher

// Function to get the initial data for the form based on a site object or null
function getInitialFormData(site) {
    return {
        cbo_id: site ? site.cbo_id : null,
        month_year_establishment: site ? site.month_year_establishment : null,
        established_by: site ? site.established_by : '',
        population: site ? site.population : null,
        grid_status: site ? site.grid_status : 'Off-Grid',
        status: site ? site.status : 'New',

        // --- ADDING MISSING FIELDS TO INITIAL FORM DATA ---
        intake_details: site ? site.intake_details : '',
        settling_basin_details: site ? site.settling_basin_details : '',
        approach_culvert_details: site ? site.approach_culvert_details : '',
        headrace_channel_details: site ? site.headrace_channel_details : '',
        aqueduct_details: site ? site.aqueduct_details : '',
        tailrace_details: site ? site.tailrace_details : '',
        spillway_details: site ? site.spillway_details : '',
        retaining_walls_details: site ? site.retaining_walls_details : '',
        // --- END ADDING MISSING FIELDS ---

        // Civil Procurement - OLD
        opm_visit_date: site ? site.opm_visit_date : null,
        layout_initiation_date: site ? site.layout_initiation_date : null,
        ground_breaking_date: site ? site.ground_breaking_date : null,
        civil_works_cost: site ? site.civil_works_cost : null,

        // Civil Procurement - NEW Detailed
        civil_advertisement_date: site ? site.civil_advertisement_date : null,
        civil_pre_bid_meeting_date: site ? site.civil_pre_bid_meeting_date : null,
        civil_technical_bid_opening_date: site ? site.civil_technical_bid_opening_date : null,
        civil_financial_bid_opening_date: site ? site.civil_financial_bid_opening_date : null,
        civil_contract_award_date: site ? site.civil_contract_award_date : null,

        // Civil Progress - Detailed
        civil_work_initiation_date: site ? site.civil_work_initiation_date : null,
        civil_financial_progress_percent: site ? site.civil_financial_progress_percent : null,
        civil_amount_disbursed: site ? site.civil_amount_disbursed : null,
        civil_amount_remaining: site ? site.civil_amount_remaining : null,
        civil_physical_progress_percent: site ? site.civil_physical_progress_percent : null,
        civil_progress_description: site ? site.civil_progress_description : '',
        civil_completion_date: site ? site.civil_completion_date : null,

        existing_capacity_kw: site ? site.existing_capacity_kw : null,
        planned_capacity_kw: site ? site.planned_capacity_kw : null,
        proposed_capacity_kw: site ? site.proposed_capacity_kw : null, // ADDED
        head_ft: site ? site.head_ft : null,
        design_net_head: site ? site.design_net_head : null, // ADDED
        design_discharge_cusecs: site ? site.design_discharge_cusecs : null,
        observed_discharge: site ? site.observed_discharge : null, // ADDED
        channel_length_km: site ? site.channel_length_km : null,
        tl_ht_km: site ? site.tl_ht_km : null,
        tl_lt_km: site ? site.tl_lt_km : null,
        length_ft: site ? site.length_ft : null, // ADDED
        bottom_width_ft: site ? site.bottom_width_ft : null, // ADDED
        design_depth_ft: site ? site.design_depth_ft : null, // ADDED
        freeboard_ft: site ? site.freeboard_ft : null, // ADDED
        velocity_ft_per_sec: site ? site.velocity_ft_per_sec : null, // ADDED
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

// Initialize form using a function to ensure it's always a useForm instance
const form = useForm(getInitialFormData(props.site));

// Watch for prop.site changes to update the form
watch(() => props.site, (newSite) => {


    isEditMode.value = !!newSite;

    form.defaults(getInitialFormData(newSite));
    form.reset();

    existingAttachments.value = newSite ? newSite.attachments_frontend : [];

    form.clearErrors();

}, { immediate: true });

onMounted(() => {

});

const handleAttachmentsToDelete = (id) => {
    console.log('--- MhpSiteForm: handleAttachmentsToDelete called ---');
    console.log('Deleting attachment ID:', id);
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
            console.log('--- MhpSiteForm: Submission Success ---');
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'MHP Site updated successfully!' : 'MHP Site created successfully!');
        },
        onError: (errors) => {
            console.error('--- MhpSiteForm: Submission Error ---');
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    console.log('--- MhpSiteForm: Cancel triggered ---');
    form.reset();
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                        activeTab === tab.id
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                    ]"
                    :aria-current="activeTab === tab.id ? 'page' : undefined"
                    type="button"
                >
                    {{ tab.name }}
                </button>
            </nav>
        </div>

        <!-- Tab Content -->
        <div class="mt-6">
            <!-- Tab 1: General Information -->
            <div v-if="activeTab === 'general'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- CBO -->
                <div>
                    <InputLabel for="cbo_id" value="CBO" />
                    <SearchableCboSelect
                        id="cbo_id"
                        v-model="form.cbo_id"
                        :initial-cbo-object="site ? site.cbo : null"
                        :class="{ 'border-red-500': form.errors.cbo_id }"
                    />
                    <InputError class="mt-2" :message="form.errors.cbo_id" />
                </div>

                <!-- Month & Year of Establishment -->
                <div>
                    <InputLabel for="month_year_establishment" value="Month & Year of Establishment" />
                    <DatePicker
                        id="month_year_establishment"
                        v-model="form.month_year_establishment"
                        :class="{ 'border-red-500': form.errors.month_year_establishment }"
                        placeholder="Select Date"
                    />
                    <InputError class="mt-2" :message="form.errors.month_year_establishment" />
                </div>

                <!-- Established By -->
                <div v-if="siteStatusOptions!=='New'">
                    <InputLabel for="established_by" value="Established By" />
                    <TextInput
                        id="established_by"
                        v-model="form.established_by"
                        type="text"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.established_by }"
                    />
                    <InputError class="mt-2" :message="form.errors.established_by" />
                </div>

                <!-- Population -->
                <div>
                    <InputLabel for="population" value="Population" />
                    <TextInput
                        id="population"
                        v-model="form.population"
                        type="number"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.population }"
                    />
                    <InputError class="mt-2" :message="form.errors.population" />
                </div>

                <!-- Grid Status -->
                <div>
                    <InputLabel for="grid_status" value="Grid Status" />
                    <SelectInput
                        id="grid_status"
                        v-model="form.grid_status"
                        :options="gridStatusOptions"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.grid_status }"
                    />
                    <InputError class="mt-2" :message="form.errors.grid_status" />
                </div>

                <!-- Status -->
                <div>
                    <InputLabel for="status" value="Status" />
                    <SelectInput
                        id="status"
                        v-model="form.status"
                        :options="siteStatusOptions"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.status }"
                    />
                    <InputError class="mt-2" :message="form.errors.status" />
                </div>
            </div>

            <!-- Tab 2: Design & Technical Specs -->
            <div v-if="activeTab === 'design_technical'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Existing Capacity (KW) -->
                <div v-if="siteStatusOptions!=='New'">
                    <InputLabel for="existing_capacity_kw" value="Existing Capacity (KW)" />
                    <TextInput
                        id="existing_capacity_kw"
                        v-model="form.existing_capacity_kw"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.existing_capacity_kw }"
                    />
                    <InputError class="mt-2" :message="form.errors.existing_capacity_kw" />
                </div>
                <!-- Planned Capacity (KW) -->
                <div>
                    <InputLabel for="planned_capacity_kw" value="Planned Capacity (KW)" />
                    <TextInput
                        id="planned_capacity_kw"
                        v-model="form.planned_capacity_kw"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.planned_capacity_kw }"
                    />
                    <InputError class="mt-2" :message="form.errors.planned_capacity_kw" />
                </div>
                <!-- Proposed Capacity (KW) -->
                <div>
                    <InputLabel for="proposed_capacity_kw" value="Proposed Capacity (KW)" />
                    <TextInput
                        id="proposed_capacity_kw"
                        v-model="form.proposed_capacity_kw"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.proposed_capacity_kw }"
                    />
                    <InputError class="mt-2" :message="form.errors.proposed_capacity_kw" />
                </div>
                <!-- Gross Head (FT) -->
                <div>
                    <InputLabel for="head_ft" value="Gross Head (FT)" />
                    <TextInput
                        id="head_ft"
                        v-model="form.head_ft"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.head_ft }"
                    />
                    <InputError class="mt-2" :message="form.errors.head_ft" />
                </div>
                <!-- Design Net Head (FT) -->
                <div>
                    <InputLabel for="design_net_head" value="Design Net Head (FT)" />
                    <TextInput
                        id="design_net_head"
                        v-model="form.design_net_head"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.design_net_head }"
                    />
                    <InputError class="mt-2" :message="form.errors.design_net_head" />
                </div>
                <!-- Design Discharge (Cusecs) -->
                <div>
                    <InputLabel for="design_discharge_cusecs" value="Design Discharge (Cusecs)" />
                    <TextInput
                        id="design_discharge_cusecs"
                        v-model="form.design_discharge_cusecs"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.design_discharge_cusecs }"
                    />
                    <InputError class="mt-2" :message="form.errors.design_discharge_cusecs" />
                </div>
                <!-- Observed Discharge (Cusecs) -->
                <div>
                    <InputLabel for="observed_discharge" value="Observed Discharge (Cusecs)" />
                    <TextInput
                        id="observed_discharge"
                        v-model="form.observed_discharge"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.observed_discharge }"
                    />
                    <InputError class="mt-2" :message="form.errors.observed_discharge" />
                </div>
                <!-- Turbine Type -->
                <div>
                    <InputLabel for="turbine_type" value="Turbine Type" />
                    <TextInput
                        id="turbine_type"
                        v-model="form.turbine_type"
                        type="text"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.turbine_type }"
                    />
                    <InputError class="mt-2" :message="form.errors.turbine_type" />
                </div>
                <!-- Alternator Type -->
                <div>
                    <InputLabel for="alternator_type" value="Alternator Type" />
                    <TextInput
                        id="alternator_type"
                        v-model="form.alternator_type"
                        type="text"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.alternator_type }"
                    />
                    <InputError class="mt-2" :message="form.errors.alternator_type" />
                </div>
                <!-- Accessible -->
                <div>
                    <InputLabel for="accessible" value="Working Area Accessibility" />
                    <SelectInput
                        id="accessible"
                        v-model="form.accessible"
                        :options="accessibleOptions"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.accessible }"
                    />
                    <InputError class="mt-2" :message="form.errors.accessible" />
                </div>
            </div>

            <!-- Tab 3: Physical Components -->
            <div v-if="activeTab === 'physical_components'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Channel Length (KM) -->
                <div>
                    <InputLabel for="channel_length_km" value="Length of Channel (KM)" />
                    <TextInput
                        id="channel_length_km"
                        v-model="form.channel_length_km"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.channel_length_km }"
                    />
                    <InputError class="mt-2" :message="form.errors.channel_length_km" />
                </div>
                <!-- Length (FT) -->
                <div>
                    <InputLabel for="length_ft" value="Length (FT)" />
                    <TextInput
                        id="length_ft"
                        v-model="form.length_ft"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.length_ft }"
                    />
                    <InputError class="mt-2" :message="form.errors.length_ft" />
                </div>
                <!-- Bottom Width (FT) -->
                <div>
                    <InputLabel for="bottom_width_ft" value="Bottom Width (FT)" />
                    <TextInput
                        id="bottom_width_ft"
                        v-model="form.bottom_width_ft"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.bottom_width_ft }"
                    />
                    <InputError class="mt-2" :message="form.errors.bottom_width_ft" />
                </div>
                <!-- Design Depth (FT) -->
                <div>
                    <InputLabel for="design_depth_ft" value="Design Depth (FT)" />
                    <TextInput
                        id="design_depth_ft"
                        v-model="form.design_depth_ft"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.design_depth_ft }"
                    />
                    <InputError class="mt-2" :message="form.errors.design_depth_ft" />
                </div>
                <!-- Freeboard (FT) -->
                <div>
                    <InputLabel for="freeboard_ft" value="Freeboard (FT)" />
                    <TextInput
                        id="freeboard_ft"
                        v-model="form.freeboard_ft"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.freeboard_ft }"
                    />
                    <InputError class="mt-2" :message="form.errors.freeboard_ft" />
                </div>
                <!-- Velocity (FT/S) -->
                <div>
                    <InputLabel for="velocity_ft_per_sec" value="Velocity (FT/S)" />
                    <TextInput
                        id="velocity_ft_per_sec"
                        v-model="form.velocity_ft_per_sec"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.velocity_ft_per_sec }"
                    />
                    <InputError class="mt-2" :message="form.errors.velocity_ft_per_sec" />
                </div>
                <!-- Intake Details -->
                <div class="md:col-span-2">
                    <InputLabel for="intake_details" value="Intake Details" />
                    <TextArea
                        id="intake_details"
                        v-model="form.intake_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.intake_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.intake_details" />
                </div>
                <!-- Settling Basin Details -->
                <div class="md:col-span-2">
                    <InputLabel for="settling_basin_details" value="Settling Basin Details" />
                    <TextArea
                        id="settling_basin_details"
                        v-model="form.settling_basin_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.settling_basin_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.settling_basin_details" />
                </div>
                <!-- Approach Culvert Details -->
                <div class="md:col-span-2">
                    <InputLabel for="approach_culvert_details" value="Approach Culvert Details" />
                    <TextArea
                        id="approach_culvert_details"
                        v-model="form.approach_culvert_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.approach_culvert_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.approach_culvert_details" />
                </div>
                <!-- Headrace Channel Details -->
                <div class="md:col-span-2">
                    <InputLabel for="headrace_channel_details" value="Headrace Channel Details" />
                    <TextArea
                        id="headrace_channel_details"
                        v-model="form.headrace_channel_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.headrace_channel_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.headrace_channel_details" />
                </div>
                <!-- Aqueduct Details -->
                <div class="md:col-span-2">
                    <InputLabel for="aqueduct_details" value="Aqueduct Details" />
                    <TextArea
                        id="aqueduct_details"
                        v-model="form.aqueduct_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.aqueduct_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.aqueduct_details" />
                </div>
                <!-- Tailrace Details -->
                <div class="md:col-span-2">
                    <InputLabel for="tailrace_details" value="Tailrace Details" />
                    <TextArea
                        id="tailrace_details"
                        v-model="form.tailrace_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.tailrace_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.tailrace_details" />
                </div>
                <!-- Spillway Details -->
                <div class="md:col-span-2">
                    <InputLabel for="spillway_details" value="Spillway Details" />
                    <TextArea
                        id="spillway_details"
                        v-model="form.spillway_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.spillway_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.spillway_details" />
                </div>
                <!-- Retaining Walls Details -->
                <div class="md:col-span-2">
                    <InputLabel for="retaining_walls_details" value="Retaining Walls Details" />
                    <TextArea
                        id="retaining_walls_details"
                        v-model="form.retaining_walls_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.retaining_walls_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.retaining_walls_details" />
                </div>
            </div>

            <!-- Tab 4: Financial & Demographics -->
            <div v-if="activeTab === 'financial_demographics'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Domestic Units -->
                <div>
                    <InputLabel for="domestic_units" value="Domestic Units" />
                    <TextInput
                        id="domestic_units"
                        v-model="form.domestic_units"
                        type="number"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.domestic_units }"
                    />
                    <InputError class="mt-2" :message="form.errors.domestic_units" />
                </div>

                <!-- Commercial Units -->
                <div>
                    <InputLabel for="commercial_units" value="Commercial Units" />
                    <TextInput
                        id="commercial_units"
                        v-model="form.commercial_units"
                        type="number"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.commercial_units }"
                    />
                    <InputError class="mt-2" :message="form.errors.commercial_units" />
                </div>

                <!-- Estimated Cost -->
                <div>
                    <InputLabel for="estimated_cost" value="Estimated Cost" />
                    <TextInput
                        id="estimated_cost"
                        v-model="form.estimated_cost"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.estimated_cost }"
                    />
                    <InputError class="mt-2" :message="form.errors.estimated_cost" />
                </div>

                <!-- Civil Works Cost -->
                <div>
                    <InputLabel for="civil_works_cost" value="Civil Works Cost" />
                    <TextInput
                        id="civil_works_cost"
                        v-model="form.civil_works_cost"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.civil_works_cost }"
                    />
                    <InputError class="mt-2" :message="form.errors.civil_works_cost" />
                </div>

                <!-- Per KW Cost -->
                <div>
                    <InputLabel for="per_kw_cost" value="Per KW Cost" />
                    <TextInput
                        id="per_kw_cost"
                        v-model="form.per_kw_cost"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.per_kw_cost }"
                    />
                    <InputError class="mt-2" :message="form.errors.per_kw_cost" />
                </div>

                <!-- Total Households (HH) -->
                <div>
                    <InputLabel for="total_hh" value="Total Households (HH)" />
                    <TextInput
                        id="total_hh"
                        v-model="form.total_hh"
                        type="number"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.total_hh }"
                    />
                    <InputError class="mt-2" :message="form.errors.total_hh" />
                </div>

                <!-- Average HH Size -->
                <div>
                    <InputLabel for="avg_hh_size" value="Average HH Size" />
                    <TextInput
                        id="avg_hh_size"
                        v-model="form.avg_hh_size"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.avg_hh_size }"
                    />
                    <InputError class="mt-2" :message="form.errors.avg_hh_size" />
                </div>

                <!-- Cost Per Capita -->
                <div>
                    <InputLabel for="cost_per_capita" value="Cost Per Capita" />
                    <TextInput
                        id="cost_per_capita"
                        v-model="form.cost_per_capita"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.cost_per_capita }"
                    />
                    <InputError class="mt-2" :message="form.errors.cost_per_capita" />
                </div>
            </div>

            <!-- Tab 5: Completion Dates & Remarks -->
            <div v-if="activeTab === 'completion_remarks'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Tentative Completion Date -->
                <div>
                    <InputLabel for="tentative_completion_date" value="Tentative Completion Date" />
                    <DatePicker
                        id="tentative_completion_date"
                        v-model="form.tentative_completion_date"
                        :class="{ 'border-red-500': form.errors.tentative_completion_date }"
                        placeholder="Select Date"
                    />
                    <InputError class="mt-2" :message="form.errors.tentative_completion_date" />
                </div>

                <!-- Financial Initiation Date -->
                <div>
                    <InputLabel for="financial_initiation_date" value="Financial Initiation Date" />
                    <DatePicker
                        id="financial_initiation_date"
                        v-model="form.financial_initiation_date"
                        :class="{ 'border-red-500': form.errors.financial_initiation_date }"
                        placeholder="Select Date"
                    />
                    <InputError class="mt-2" :message="form.errors.financial_initiation_date" />
                </div>

                <!-- Physical Completion Date -->
                <div>
                    <InputLabel for="physical_completion_date" value="Physical Completion Date" />
                    <DatePicker
                        id="physical_completion_date"
                        v-model="form.physical_completion_date"
                        :class="{ 'border-red-500': form.errors.physical_completion_date }"
                        placeholder="Select Date"
                    />
                    <InputError class="mt-2" :message="form.errors.physical_completion_date" />
                </div>

                <!-- OPM Visit Date -->
                <div>
                    <InputLabel for="opm_visit_date" value="OPM Visit to Site Date" />
                    <DatePicker
                        id="opm_visit_date"
                        v-model="form.opm_visit_date"
                        :class="{ 'border-red-500': form.errors.opm_visit_date }"
                        placeholder="Select Date"
                    />
                    <InputError class="mt-2" :message="form.errors.opm_visit_date" />
                </div>

                <!-- Layout Initiation Date -->
                <div>
                    <InputLabel for="layout_initiation_date" value="Date of Layout Initiation" />
                    <DatePicker
                        id="layout_initiation_date"
                        v-model="form.layout_initiation_date"
                        :class="{ 'border-red-500': form.errors.layout_initiation_date }"
                        placeholder="Select Date"
                    />
                    <InputError class="mt-2" :message="form.errors.layout_initiation_date" />
                </div>

                <!-- Ground Breaking Ceremony Date -->
                <div>
                    <InputLabel for="ground_breaking_date" value="Ground Breaking Ceremony Date" />
                    <DatePicker
                        id="ground_breaking_date"
                        v-model="form.ground_breaking_date"
                        :class="{ 'border-red-500': form.errors.ground_breaking_date }"
                        placeholder="Select Date"
                    />
                    <InputError class="mt-2" :message="form.errors.ground_breaking_date" />
                </div>
                
                <!-- NEW SECTION: Civil Works Procurement Milestones -->
                <div class="md:col-span-2 mt-6 mb-2 border-b pb-2">
                    <h3 class="text-lg font-medium text-gray-900">Civil Works Procurement Milestones</h3>
                </div>

                <div>
                    <InputLabel for="civil_advertisement_date" value="Advertisement in Newspaper" />
                    <DatePicker id="civil_advertisement_date" v-model="form.civil_advertisement_date" />
                    <InputError class="mt-2" :message="form.errors.civil_advertisement_date" />
                </div>
                <div>
                    <InputLabel for="civil_pre_bid_meeting_date" value="Pre-Bid Meeting" />
                    <DatePicker id="civil_pre_bid_meeting_date" v-model="form.civil_pre_bid_meeting_date" />
                    <InputError class="mt-2" :message="form.errors.civil_pre_bid_meeting_date" />
                </div>
                <div>
                    <InputLabel for="civil_technical_bid_opening_date" value="Technical Bid Opening" />
                    <DatePicker id="civil_technical_bid_opening_date" v-model="form.civil_technical_bid_opening_date" />
                    <InputError class="mt-2" :message="form.errors.civil_technical_bid_opening_date" />
                </div>
                <div>
                    <InputLabel for="civil_financial_bid_opening_date" value="Financial Bid Opening" />
                    <DatePicker id="civil_financial_bid_opening_date" v-model="form.civil_financial_bid_opening_date" />
                    <InputError class="mt-2" :message="form.errors.civil_financial_bid_opening_date" />
                </div>
                 <div>
                    <InputLabel for="civil_contract_award_date" value="Contractor Agreement & Work Order" />
                    <DatePicker id="civil_contract_award_date" v-model="form.civil_contract_award_date" />
                    <InputError class="mt-2" :message="form.errors.civil_contract_award_date" />
                </div>

                <!-- NEW SECTION: Physical Progress Civil -->
                <div class="md:col-span-2 mt-6 mb-2 border-b pb-2">
                    <h3 class="text-lg font-medium text-gray-900">Civil Works Physical & Financial Progress</h3>
                </div>

                <div>
                    <InputLabel for="civil_work_initiation_date" value="Date of Civil Work Initiation" />
                    <DatePicker id="civil_work_initiation_date" v-model="form.civil_work_initiation_date" />
                    <InputError class="mt-2" :message="form.errors.civil_work_initiation_date" />
                </div>
                 <div>
                    <InputLabel for="civil_completion_date" value="Date of Physical Work completion" />
                    <DatePicker id="civil_completion_date" v-model="form.civil_completion_date" />
                    <InputError class="mt-2" :message="form.errors.civil_completion_date" />
                </div>
                <div>
                    <InputLabel for="civil_financial_progress_percent" value="Financial Progress (%)" />
                    <TextInput id="civil_financial_progress_percent" v-model="form.civil_financial_progress_percent" type="number" step="0.01" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.civil_financial_progress_percent" />
                </div>
                <div>
                    <InputLabel for="civil_amount_disbursed" value="Amount Disbursed (PKR)" />
                    <TextInput id="civil_amount_disbursed" v-model="form.civil_amount_disbursed" type="number" step="0.01" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.civil_amount_disbursed" />
                </div>
                <div>
                    <InputLabel for="civil_amount_remaining" value="Remaining Amount (PKR)" />
                    <TextInput id="civil_amount_remaining" v-model="form.civil_amount_remaining" type="number" step="0.01" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.civil_amount_remaining" />
                </div>
                <div>
                    <InputLabel for="civil_physical_progress_percent" value="Physical Progress (%)" />
                    <TextInput id="civil_physical_progress_percent" v-model="form.civil_physical_progress_percent" type="number" step="0.01" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.civil_physical_progress_percent" />
                </div>

                <!-- Progress Description -->
                <div class="md:col-span-2">
                    <InputLabel for="civil_progress_description" value="Progress Description" />
                    <TextArea
                        id="civil_progress_description"
                        v-model="form.civil_progress_description"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.civil_progress_description }"
                    />
                    <InputError class="mt-2" :message="form.errors.civil_progress_description" />
                </div>

                <!-- Remarks (WYSIWYG Editor) -->
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

                <!-- Attachments Section -->
                <div class="md:col-span-2">
                    <InputLabel value="Attachments" />
                    <AttachmentUploader
                        v-model="form.attachments"
                        :existing-attachments="existingAttachments"
                        @remove-existing="handleAttachmentsToDelete"
                        :error-message="form.errors.attachments"
                    />
                    <InputError class="mt-2" :message="form.errors.attachments" />
                </div>
            </div>
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
                {{ isEditMode ? 'Update Site' : 'Create Site' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>
